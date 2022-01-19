import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvironmentService } from './environment.service'

const filePath = {
  production: '.env.production',
  development: '.env.development',
}

const NODE_ENV = process.env.NODE_ENV as keyof typeof filePath

export interface IConfig {
  envFilePath: string
  validationSchema?: any
}

@Module({})
export class EnvironmentModule {
  static register(config?: IConfig) {
    return {
      module: EnvironmentModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: config?.envFilePath ?? filePath[NODE_ENV],
          validationSchema: config?.validationSchema ?? undefined,
        }),
      ],
      providers: [EnvironmentService],
      exports: [EnvironmentService],
    }
  }
}
