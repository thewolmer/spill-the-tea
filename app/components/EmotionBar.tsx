'use client';

import * as React from 'react';

import { Progress } from '@/components/ui/progress';

export function EmotionBar({ value }: { value: number }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return <Progress value={progress} className="w-full" />;
}
