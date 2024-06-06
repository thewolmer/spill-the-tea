'use client';
import { TextQuote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { GeneratingIcon } from '@/components/Icons/GeneratingIcon';
import { Image } from '@/components/Image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useStoreEmotion } from '@/hooks/stores/emotion-store';

import { EmotionBar } from './EmotionBar';

export const ResultsSection = () => {
  const router = useRouter();
  const { isLoading, emotion } = useStoreEmotion();
  if (!isLoading && !emotion) return null;
  router.push('#results', {
    scroll: true,
  });
  if (isLoading)
    return (
      <section id="results" className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-10">
        <Card className="min-h-[60vh] w-full shadow-2xl">
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-[50vh] w-full flex-col items-center justify-center">
            <p>Analyzing text... </p>
            <GeneratingIcon />
          </CardContent>
        </Card>
      </section>
    );

  return (
    <section id="results" className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-10">
      <Card className="min-h-[60vh] w-full shadow-2xl">
        <CardHeader>
          <CardTitle>Result</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          {emotion?.data &&
            Object.keys(emotion.data.emotions)
              // @ts-expect-error keys are strings
              .sort((a, b) => emotion.data.emotions[b] - emotion.data.emotions[a])
              .map((key: string) => (
                <div key={key} className="flex w-full items-center justify-end">
                  <div className="flex w-40 items-center justify-start gap-2">
                    <Image src={`/assets/emojis/${key}.png`} alt={key} width={50} height={50} className="h-6 w-6" />
                    <span className="capitalize">{key}</span>
                  </div>
                  <div className="flex w-full items-center justify-center">
                    {/* @ts-expect-error keys are strings */}
                    <EmotionBar value={emotion.data.emotions[key] * 100} />
                    {/* @ts-expect-error keys are strings */}
                    <div className="w-10 text-end">{emotion.data.emotions[key]}</div>
                  </div>
                </div>
              ))}
        </CardContent>
        <CardFooter className="gap-2">
          <TextQuote />
          <p>{emotion?.raw}</p>
        </CardFooter>
      </Card>
    </section>
  );
};
