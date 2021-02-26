import { Module } from '@nestjs/common'
import { EnvironmentModule } from '@collection-nest/environment'
import { WelcomeController } from 'auth/welcome.controller'

@Module({
  imports: [EnvironmentModule],
  controllers: [WelcomeController],
  providers: [],
})
export class WelcomeModule {}
