export const config = {
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  groqApiKey: process.env.GROQ_API_KEY!,
  port: process.env.PORT || 3000
}