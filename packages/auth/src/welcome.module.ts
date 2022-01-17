/* eslint-disable security/detect-object-injection */
import { Module } from '@nestjs/common'
import { EnvironmentModule } from '@collection-nest/environment'
import { WelcomeController } from 'auth/welcome.controller'

const envFilePath = {
  production: '.env.production',
  development: '.env.development',
  test: '.env.test',
  ci: '.env.ci',
}

const NODE_ENV = process.env.NODE_ENV as keyof typeof envFilePath

@Module({
  imports: [
    EnvironmentModule.register({
      envFilePath: envFilePath[NODE_ENV],
    }),
  ],
  controllers: [WelcomeController],
  providers: [],
})
export class WelcomeModule {}
