/* eslint-disable security/detect-object-injection */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { parse } from 'pg-connection-string'
import { ConfigModule, ConfigService } from '@nestjs/config'

export interface IConfig {
  synchronize?: boolean
  autoLoadEntities?: boolean
  migrations?: string[]
}

@Module({})
export class DatabaseModule {
  static register({
    synchronize = true,
    autoLoadEntities = true,
    migrations = undefined,
  }: IConfig) {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            try {
              const databaseUrl = configService.get<string>('DATABASE_URL')
              const postgresUrl = parse(databaseUrl!)

              return {
                type: 'postgres',
                host: postgresUrl.host!,
                port: Number(postgresUrl.port),
                username: postgresUrl.user,
                password: postgresUrl.password,
                database: postgresUrl.database!,
                synchronize,
                autoLoadEntities,
                migrations,
              }
            } catch (validationError) {
              throw validationError
            }
          },
        }),
      ],
      controllers: [],
      providers: [],
    }
  }
}
