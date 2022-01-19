/* eslint-disable security/detect-object-injection */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { parse } from 'pg-connection-string'
import {
  EnvironmentModule,
  EnvironmentService,
} from '@collection-nest/environment'

export interface IConfig {
  databaseUrl?: string
  synchronize?: boolean
  autoLoadEntities?: boolean
  migrations?: string[]
}

@Module({})
export class DatabaseModule {
  static register(config?: IConfig) {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [EnvironmentModule],
          inject: [EnvironmentService],
          useFactory: (environmentService: EnvironmentService) => {
            // TODO: validate DATABASE_URL

            const databaseUrl =
              config?.databaseUrl ??
              environmentService.get<string>('DATABASE_URL')
            const postgresUrl = parse(databaseUrl!)

            return {
              type: 'postgres',
              host: postgresUrl.host!,
              port: Number(postgresUrl.port),
              username: postgresUrl.user,
              password: postgresUrl.password,
              database: postgresUrl.database!,
              synchronize: config?.synchronize ?? true,
              autoLoadEntities: config?.autoLoadEntities ?? true,
              migrations: config?.migrations ?? undefined,
            }
          },
        }),
      ],
      controllers: [],
      providers: [],
    }
  }
}
