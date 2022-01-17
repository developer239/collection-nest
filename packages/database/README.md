# @nest-collection/database

Wrapper around `@nestjs/typeorm` so that we can setup database easily. In the future the module can be more generic and
include other ORMs as well.

**This module is dependent on `@collection-nest/environment`.**

## Install

```
yarn install @nest-collection/database pg pg-connection-string @types/pg-connection-string typeorm
```

## Example

```typescript
const nodeEnvToPath = {
  production: '.env.production',
  development: '.env.development',
}

const NODE_ENV = process.env.NODE_ENV as keyof typeof nodeEnvToPath

// Optional
const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  PORT: Joi.number().default(3000),
})

const envFilePath = nodeEnvToPath[NODE_ENV]

DatabaseModule.register({
  environmentConfig: {
    envFilePath,
    validationSchema,
  },
})
```
