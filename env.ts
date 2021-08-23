/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),

  // Database
  PG_HOST: Env.schema.string({ format: 'host' }),
  PG_PORT: Env.schema.number(),
  PG_USER: Env.schema.string(),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_DB_NAME: Env.schema.string(),

  // Mail
  SMTP_HOST: Env.schema.string({ format: 'host' }),
  SMTP_PORT: Env.schema.number(),
  SMTP_USERNAME: Env.schema.string(),
  SMTP_PASSWORD: Env.schema.string(),

  // Views
  CACHE_VIEWS: Env.schema.boolean(),

  // Terros
  CONTACT_EMAIL: Env.schema.string({ format: 'email' }),
  TARGET_EMAIL: Env.schema.string({ format: 'email' }),
  CONTACT_NAME: Env.schema.string(),
  FRONT_URL: Env.schema.string(),

  // Stripe
  STRIPE_KEY: Env.schema.string.optional(),
  STRIPE_SECRET: Env.schema.string.optional(),

  // Mailjet
  MAILJET_KEY: Env.schema.string.optional(),
  MAILJET_SECRET: Env.schema.string.optional(),
})
