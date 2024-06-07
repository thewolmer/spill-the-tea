/* eslint-disable @typescript-eslint/no-unused-vars */
import { parse } from 'path';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

import { EmotionDataSchema } from '@/types/Responses/EmotionData';

import { prompt_template } from './prompt';

export const maxDuration = 30;

const EmotionReqBodySchema = z.object({
  test_subject: z.string().min(1, { message: 'test_subject must be at least 1 character long' }),
  model: z.string().optional().default('flash'),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedBody = EmotionReqBodySchema.safeParse(body);

  if (!parsedBody.success) {
    let errorMessage = '';
    parsedBody.error.errors.forEach((error) => {
      errorMessage = errorMessage + error.path[0] + ' : ' + error.message + '. ';
    });
    return NextResponse.json({ error: errorMessage, status: 401 });
  }

  let prompt;
  let rawText;

  const isTweet = parsedBody.data.test_subject.startsWith('https://x.com/');

  if (isTweet) {
    const widget = await fetch(`https://publish.twitter.com/oembed?url=${parsedBody.data.test_subject.trim()}`).then(
      (res) => res.json(),
    );
    rawText = twitterHtmlToRawText(widget.html);
    prompt = `${prompt_template}\n Text to analyze is : ${rawText}`;
  }
  console.log(parsedBody.data.test_subject);

  prompt = `${prompt_template}\n Text to analyze is : ${parsedBody.data.test_subject}`;

  try {
    const { object } = await generateObject({
      model: google(
        parsedBody.data.model === 'pro' ? 'models/gemini-1.5-pro-latest' : 'models/gemini-1.5-flash-latest',
      ),
      mode: 'json',
      prompt,
      schema: z.object({
        emotions: EmotionDataSchema,
        result: z.object({
          emotion: z.string(),
          intensity: z.number(),
        }),
      }),
    });
    return NextResponse.json({ data: object, raw: isTweet ? rawText : parsedBody.data.test_subject, status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected server error.', status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.', status: 405 });
}

const twitterHtmlToRawText = (html: string) => {
  const tweetMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  if (!tweetMatch) {
    return '';
  }

  // eslint-disable-next-line prefer-destructuring
  const tweetContent = tweetMatch[1];

  const rawText = tweetContent.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?[^>]+(>|$)/g, '');

  return rawText.trim();
};
