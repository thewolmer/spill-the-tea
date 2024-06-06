import { z } from 'zod';

export const EmotionDataSchema = z.object({
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
});

export type EmotionData = z.infer<typeof EmotionDataSchema>;
