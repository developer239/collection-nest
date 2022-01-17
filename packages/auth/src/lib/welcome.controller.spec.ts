import { TestingModule, Test } from '@nestjs/testing'
import { WelcomeController } from './welcome.controller'
import { WelcomeModule } from './welcome.module'

describe('[controller] HelloController', () => {
  let welcomeController: WelcomeController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [WelcomeModule],
    }).compile()

    welcomeController = app
      .createNestApplication()
      .get<WelcomeController>(WelcomeController)
  })

  it('should return "Hello World!"', () => {
    expect(welcomeController.getHello()).toBe('Hello World!')
  })
})
