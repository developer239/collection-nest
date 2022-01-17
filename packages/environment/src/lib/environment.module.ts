import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvironmentService } from './environment.service'

export interface IConfig {
  envFilePath: string
  validationSchema?: any
}

@Module({})
export class EnvironmentModule {
  static register({ envFilePath, validationSchema }: IConfig) {
    return {
      module: EnvironmentModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath,
          validationSchema,
        }),
      ],
      providers: [EnvironmentService],
      exports: [EnvironmentService],
    }
  }
}
