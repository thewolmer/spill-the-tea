import { z } from 'zod';

export const emotionResponseSchema = z.object({
  data: z.object({
    emotions: z.object({
      anger: z.number(),
      anticipation: z.number(),
      confusion: z.number(),
      disgust: z.number(),
      fear: z.number(),
      gratitude: z.number(),
      guilt: z.number(),
      joy: z.number(),
      love: z.number(),
      lust: z.number(),
      optimism: z.number(),
      pride: z.number(),
      relief: z.number(),
      sadness: z.number(),
      shame: z.number(),
      surprise: z.number(),
    }),
    result: z.object({
      emotion: z.string(),
      intensity: z.number(),
    }),
  }),
  raw: z.string(),
  status: z.number(),
  error: z.string().optional(),
});

export type emotionResponseType = z.infer<typeof emotionResponseSchema>;
