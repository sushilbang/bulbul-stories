export const env = {
    REDIS_HOST: Bun.env.REDIS_HOST!,
    REDIS_PORT: Number(Bun.env.REDIS_PORT),
    REDIS_PASSWORD: Bun.env.REDIS_PASSWORD,
    BULBUL_API_KEY: Bun.env.BULBUL_API_KEY!,
    OPENAI_API_KEY: Bun.env.OPENAI_API_KEY!,
};
