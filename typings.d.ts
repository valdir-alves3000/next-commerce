declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_NODE_ENV: "development" | "production"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
    CLERK_SECRET_KEY: string
    CLERK_WEBHOOK_SECRET: string
    POSTGRES_URL: string
    POSTGRES_PRISMA_URL: string
    POSTGRES_URL_NON_POOLING: string
    POSTGRES_USER: string
    POSTGRES_HOST: string
    POSTGRES_PASSWORD: string
    POSTGRES_DATABASE: string
    STRIP_SECRET_KEY: string
    NEXT_PUBLIC_STRIP_PUBLISHABLE_KEY: string
  }
}