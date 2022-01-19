import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

const envFilePath = {
  production: '.env.production',
  development: '.env.development',
}

const NODE_ENV = process.env.NODE_ENV as keyof typeof envFilePath

export interface IConfig {
  envFilePath?: string
  validationSchema?: any
}

@Module({})
export class EnvironmentModule {
  static register(config?: IConfig) {
    return {
      module: EnvironmentModule,
      imports: [
        ConfigModule.forRoot({ envFilePath: envFilePath[NODE_ENV], ...config }),
      ],
      providers: [],
      exports: [],
    }
  }
}
