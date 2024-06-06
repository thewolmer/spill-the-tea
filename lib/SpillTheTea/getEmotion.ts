'use server';
import { emotionResponseSchema, emotionResponseType } from '@/types/Responses/getEmotion';

import { Post } from '../helper';

export async function getEmotion(text: string, model: string): Promise<emotionResponseType | null> {
  try {
    const res = await Post(
      '/emotion',
      {
        test_subject: text,
        model,
      },
      {
        tags: ['emotion'],
        revalidate: 0,
      },
    );
    const json = await res.json();
    const response = emotionResponseSchema.safeParse(json);
    if (response.success) {
      return response.data;
    } else {
      console.error(response.error);
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
