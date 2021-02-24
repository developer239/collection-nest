import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'

enum environmentEnum {
  development = 'development',
  test = 'test',
  ci = 'ci',
  production = 'production',
}

const getFilePath = (environment: keyof typeof environmentEnum) =>
  `.env.${environment}`

@Module({})
export class EnvironmentModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return {
      module: EnvironmentModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: getFilePath(process.env.NODE_ENV as environmentEnum),
          ...options,
        }),
      ],
    }
  }
}
