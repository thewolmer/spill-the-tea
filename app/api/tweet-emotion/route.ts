import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is missing', status: 400 });
  }
  const widget = await fetch(`https://publish.twitter.com/oembed?url=${url}`).then((res) => res.json());
  const rawText = twitterHtmlToRawText(widget.html);
  const tweet = {
    url: widget.url,
    raw: rawText,
    author: widget.author_name,
    author_url: widget.author_url,
  };

  const emotion = await fetch(`${env.NEXT_PUBLIC_API_URL}/emotion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test_subject: rawText }),
  }).then((res) => res.json());

  return NextResponse.json({ data: emotion, tweet, status: 200 });
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
