import dotenv from 'dotenv'

dotenv.config()
export const config={
    "PORT":process.env.PORT || 3001,
    "DB_URL":process.env.DATABASE_URL || 'sa',
    "URL":process.env.URL || '',
    "CORS":process.env.CORS_ALLOWED_ORIGINS
}