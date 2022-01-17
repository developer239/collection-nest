/* eslint-disable security/detect-object-injection */
import {
  EnvironmentModule,
  EnvironmentService,
  IConfig as IEnvironmentConfig,
} from '@collection-nest/environment'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { parse } from 'pg-connection-string'

export interface IConfig {
  environmentConfig: IEnvironmentConfig
}

@Module({})
export class DatabaseModule {
  static register({ environmentConfig }: IConfig) {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [EnvironmentModule.register(environmentConfig)],
          inject: [EnvironmentService],
          useFactory: (environmentService: EnvironmentService) => {
            const postgresUrl = parse(
              environmentService.get<string>('DATABASE_URL')
            )

            return {
              type: 'postgres',
              host: postgresUrl.host,
              port: Number(postgresUrl.port),
              username: postgresUrl.user,
              password: postgresUrl.password,
              database: postgresUrl.database,
              synchronize: true,
              autoLoadEntities: true,
            } as any // TODO: 🤯 figure out why it suddenly wants aurora types
          },
        }),
      ],
      controllers: [],
      providers: [],
    }
  }
}
