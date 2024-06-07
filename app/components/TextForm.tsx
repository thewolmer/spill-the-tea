'use client';
import { ArrowUp } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useStoreEmotion } from '@/hooks/stores/emotion-store';
import { getEmotion } from '@/lib/SpillTheTea/getEmotion';

export const TextForm = () => {
  const [test_subject, setTest_subject] = useState('');
  const [selected_model, setSelected_model] = useState('flash');
  const { isLoading, setEmotion, setLoading } = useStoreEmotion();

  const onClick = async () => {
    setLoading(true);
    const emotion = await getEmotion(test_subject, selected_model);
    console.log(emotion);
    setEmotion(emotion);
    setLoading(false);
    setTest_subject('');
  };

  return (
    <Card className="w-full max-w-xl bg-card-foreground shadow-2xl">
      <CardContent className="p-2">
        <Textarea
          onChange={(e) => setTest_subject(e.target.value)}
          className="border-none bg-transparent text-background"
          placeholder="Paste your text here"
          rows={1}
        />
      </CardContent>
      <CardFooter className="flex items-end justify-end gap-2 px-4 py-2">
        <Tabs defaultValue="flash" onValueChange={(e) => setSelected_model(e)}>
          <TabsList>
            <TabsTrigger value="flash">⚡Speed</TabsTrigger>
            <TabsTrigger value="pro">✨ Quality</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={onClick} size={'sm'} disabled={test_subject.length < 5 || isLoading}>
          <ArrowUp />
        </Button>
      </CardFooter>
    </Card>
  );
};
