import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getMovies } from '@/lib/theTVDB/getMovies';

export const maxDuration = 30;

const searchParamsSchema = z.object({
  mood: z.string().trim(),
  genre: z.string().trim().optional(),
  year: z.string().trim().optional(),
  model: z.union([z.literal('flash'), z.literal('pro')]).optional(),
  country: z.string().trim().optional(),
});

export async function GET(req: NextRequest) {
  const mood = req.nextUrl.searchParams.get('mood') || undefined;
  const genre = req.nextUrl.searchParams.get('genre') || undefined;
  const year = req.nextUrl.searchParams.get('year') || undefined;
  const model = req.nextUrl.searchParams.get('model') || 'flash';
  const country = req.nextUrl.searchParams.get('country') || undefined;

  const searchParams = searchParamsSchema.safeParse({
    mood,
    genre,
    year,
    model,
    country,
  });

  if (!searchParams.success) {
    let errMsg = '';
    searchParams.error.errors.forEach((error) => {
      errMsg += error.path[0] + ' : ' + error.message + '. ';
    });
    return NextResponse.json({ error: errMsg, message: 'Required search parameter is missing', status: 400 });
  }

  const prompt = `As an movie critic you have to suggest me a list of 10 movies based on my mood, genre, and year. You have to return the list of movies in JSON format. The JSON format should be an array of objects with the following schema:
  [
    {
      title: string,
    },
    {
      title: string,
    }
  ]

  The search parameters are:  mood: ${searchParams.data.mood}, genre: ${genre ? searchParams.data.genre : 'Whatever suits my mood'}, year: ${year ? searchParams.data.year : 'after 2000'},  ${country ? `country: ${searchParams.data.country}` : ''})

  Json:
  `;

  const { object } = await generateObject({
    model: google(model === 'flash' ? 'models/gemini-1.5-flash-latest' : 'models/gemini-1.5-pro-latest'),
    mode: 'json',
    prompt,
    schema: z
      .object({
        title: z.string(),
      })
      .array(),
  });

  const movies = await getMovies({
    names: object,
    year: searchParams.data.year,
    genre: searchParams.data.genre,
    country: searchParams.data.country,
  });

  return NextResponse.json({ data: movies, ai: object, status: 200 });
}
