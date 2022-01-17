import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { EnvironmentService } from 'environment/lib/environment.service'

const NODE_ENV = process.env.NODE_ENV as keyof typeof envFilePath

// TODO: make configurable
const envFilePath = {
  production: '.env.production',
  development: '.env.development',
  test: '../../../.env.test', // this is because of NX
  ci: '.env.ci',
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePath[NODE_ENV],
      // TODO: make configurable
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
