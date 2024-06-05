import { z } from 'zod';

export const TVDBQueryResponseSchema = z.object({
  status: z.string(),
  data: z.array(
    z.object({
      objectID: z.string(),
      aliases: z.array(z.string()).optional(),
      country: z.string(),
      director: z.string().optional(),
      extended_title: z.string().optional(),
      genres: z.array(z.string()).optional(),
      studios: z.array(z.string()).optional(),
      id: z.string(),
      image_url: z.string(),
      name: z.string(),
      first_air_time: z.string().optional(),
      overview: z.string().optional(),
      primary_language: z.string(),
      primary_type: z.string(),
      status: z.string(),
      type: z.string(),
      tvdb_id: z.string(),
      year: z.string().optional(),
      slug: z.string(),
      overviews: z
        .object({
          eng: z.string().optional(),
        })
        .optional(),
      remote_ids: z.array(z.object({ id: z.string(), type: z.number(), sourceName: z.string() })),
      thumbnail: z.string().optional(),
    }),
  ),
  links: z.object({
    prev: z.union([z.literal(null), z.string()]),
    self: z.union([z.literal(null), z.string()]),
    next: z.union([z.literal(null), z.string()]),
    total_items: z.number(),
    page_size: z.number(),
  }),
});
