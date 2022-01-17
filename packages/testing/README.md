# @nest-collection/testing

Testing helper for your Nest.js project.

## Install

```
yarn install @nest-collection/testing
```

## Example

```typescript
let testingEntityService: TestingEntityService
let databaseService: TestingDatabaseService

beforeAll(async () => {
  const app: TestingModule = await bootstrap({
    imports: [SomeModuleToTest],
  })

  databaseService = app.get<TestingDatabaseService>(TestingDatabaseService)
  testingEntityService = app.get<TestingEntityService>(TestingEntityService)
})

afterEach(async () => {
  await databaseService.clearDb()
})

// ...
```
