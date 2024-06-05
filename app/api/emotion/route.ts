/* eslint-disable @typescript-eslint/no-unused-vars */
import { parse } from 'path';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

export const maxDuration = 30;

const EmotionReqBodySchema = z.object({
  test_subject: z.string().min(1, { message: 'test_subject must be at least 1 character long' }),
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

  const prompt = `As an AI with a deep understanding of human emotions, your task is to analyze text input and rate it on a scale of 0 to 1 in various emotional categories such as anger, anticipation, confusion, disgust, fear, gratitude, guilt, joy, love, lust, optimism, pride, relief, sadness, shame, surprise, and trust. Your ultimate goal is to provide an overall emotional assessment for the text.

  Here's the format for the result you should generate in JSON:
  
  z.object({
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
      trust: z.number(),
    }),
    result: z.object({
      emotion: z.string(),
      intensity: z.number(),
    }),
  }),
  
  Remember to carefully evaluate the text and assign appropriate values for each emotion category between a scale of 0 to 1 before determining the highest intensity emotion as the top one, put the top emotion and its intensity in result.emotion as shown in the example below.
  
  For a textual example, if a passage exudes slight happiness, mild excitement, and a tinge of sadness, the intensity could look like this:
  
    {
      "emotions": {
        "anger": 0,
        "anticipation": 0.1,
        "confusion": 0,
        "disgust": 0,
        "fear": 0,
        "gratitude": 0.0,
        "guilt": 0,
        "joy": 0.1,
        "love": 0.6,
        "lust": 0.1,
        "optimism": 0,
        "pride": 0.2,
        "relief": 0.1,
        "sadness": 0,
        "shame": 0,
        "surprise": 0,
        "trust": 0.2,
      },
      "result": {
        "emotion": "love",
        "intensity": 0.5
      }
    }
  
  the text to analyze is: ${parsedBody.data.test_subject}
  `;

  try {
    const { object } = await generateObject({
      model: google('models/gemini-1.5-pro-latest'),
      mode: 'json',
      prompt,
      schema: z.object({
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
          trust: z.number(),
        }),
        result: z.object({
          emotion: z.string(),
          intensity: z.number(),
        }),
      }),
    });
    return NextResponse.json({ data: object, status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected server error.', status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.', status: 405 });
}
