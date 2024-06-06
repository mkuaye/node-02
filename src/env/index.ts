import 'dotenv/config'
import {z} from 'zod'


const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
    APP_SECRET: z.string(),
    APP_API_URL: z.string(),
    APP_WEB_URL: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
})


const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error("⚠ Invalid env variables", _env.error.format())

    throw new Error("Invalid environment variables")
}

export const env = _env.data