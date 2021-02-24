import { Module } from '@nestjs/common'
import { WelcomeController } from './welcome.controller';

@Module({
  imports: [],
  controllers: [WelcomeController],
  providers: [],
})
export class WelcomeModule {}
