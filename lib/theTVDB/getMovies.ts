'use server';

import { z } from 'zod';

import { Get } from './helper';
import { TVDBQueryResponseSchema } from './responseSchema';

const PorpsSchema = z
  .object({
    title: z.string(),
  })
  .array();

interface Props {
  names: z.infer<typeof PorpsSchema>;
  year?: string;
  genre?: string;
  country?: string;
}
export async function getMovies({ names, year, country }: Props) {
  const movies = [];
  for (const name of names) {
    const response = await Get(`/search`, {
      searchParams: { q: name.title, limit: 1, type: 'movie', country, year },
    }).then((res) => res.json());
    const parsedResponse = TVDBQueryResponseSchema.safeParse(response);
    if (parsedResponse.success && parsedResponse.data.data.length > 0) {
      movies.push(parsedResponse.data.data[0]);
    }
    if (!parsedResponse.success) {
      return parsedResponse.error.errors;
    }
  }

  return movies;
}
