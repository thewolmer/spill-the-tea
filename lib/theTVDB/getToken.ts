'use server';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { env } from '@/env';

import { Post } from './helper';

const LoginResponseSchema = z.object({
  status: z.string(),
  data: z.object({
    token: z.string(),
  }),
});

export async function getToken() {
  const response = await Post(
    '/login',
    {
      apikey: env.THE_TV_DB_API_KEY,
    },
    {
      tags: ['getToken'],
    },
  );

  const parsedResponse = LoginResponseSchema.safeParse(await response.json());
  if (!parsedResponse.success) {
    return {
      success: false,
    };
  }

  cookies().set('movie-token', parsedResponse.data?.data?.token);

  return parsedResponse;
}
