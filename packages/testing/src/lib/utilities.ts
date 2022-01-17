import { DatabaseModule } from '@collection-nest/database'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { Test } from '@nestjs/testing'
import { TestingModule } from './testing.module'

export const bootstrap = async (
  metadata: ModuleMetadata,
  envFilePath = '../../../.env.test'
) => {
  const testingModule = await Test.createTestingModule({
    imports: [
      DatabaseModule.register({
        environmentConfig: { envFilePath },
      }),
      TestingModule,
      ...(metadata.imports ? metadata.imports : []),
    ],
    controllers: [...(metadata?.controllers ?? [])],
    providers: [...(metadata?.providers ?? [])],
    exports: [...(metadata?.exports ?? [])],
  }).compile()

  return testingModule
}
