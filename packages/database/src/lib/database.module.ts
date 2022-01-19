/* eslint-disable security/detect-object-injection */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { parse } from 'pg-connection-string'
import { ConfigModule, ConfigService } from '@nestjs/config'

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
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            // TODO: validate DATABASE_URL

            const databaseUrl =
              config?.databaseUrl ?? configService.get<string>('DATABASE_URL')
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
