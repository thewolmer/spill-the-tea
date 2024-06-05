import z from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().min(1),
  NEXT_PUBLIC_API_URL: z.string().min(1),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  THE_TV_DB_API_KEY: z.string().min(1),
  THE_TV_DB_BEARER_TOKEN: z.string().min(1),
  NEXT_PUBLIC_TVDB_API_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
