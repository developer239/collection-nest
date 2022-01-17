# @nest-collection/environment

Wrapper around `@nestjs/config` so that we can have more control over environment variables and project configuration in
general.

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

EnvironmentModule.register({
  envFilePath,
  validationSchema,
})
```
