import { DatabaseModule } from '@collection-nest/database'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { Test } from '@nestjs/testing'
import { TestingModule } from './testing.module'
import { EnvironmentModule } from '@collection-nest/environment'

export const bootstrap = async (
  metadata: ModuleMetadata,
  envFilePath?: string
) => {
  const testingModule = await Test.createTestingModule({
    imports: [
      EnvironmentModule.register({
        envFilePath,
        NODE_ENV: 'test',
      }),
      DatabaseModule.register(),
      TestingModule,
      ...(metadata.imports ? metadata.imports : []),
    ],
    controllers: [...(metadata?.controllers ?? [])],
    providers: [...(metadata?.providers ?? [])],
    exports: [...(metadata?.exports ?? [])],
  }).compile()

  return testingModule
}
