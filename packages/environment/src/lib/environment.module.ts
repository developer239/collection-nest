import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

const filePath = {
  production: '.env.production',
  development: '.env.development',
  test: '../../../.env.test',
}

export interface IConfig {
  NODE_ENV?: string
  envFilePath?: string
  validationSchema?: any
}

@Module({})
export class EnvironmentModule {
  static register(config?: IConfig) {
    const defaultEnvFilePath = config?.NODE_ENV
      ? filePath[config?.NODE_ENV as keyof typeof filePath]
      : undefined
    const envFilePath = config?.envFilePath ?? defaultEnvFilePath

    // TODO: improve error handling
    if (!envFilePath) {
      throw Error('Invalid .env file path')
    }

    return {
      module: EnvironmentModule,
      imports: [ConfigModule.forRoot({ envFilePath, ...config })],
      providers: [],
      exports: [],
    }
  }
}
