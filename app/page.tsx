import { Image } from '@/components/Image';
import { cn } from '@/lib/utils';

import { ResultsSection } from './components/ResultsSection';
import { TextForm } from './components/TextForm';

const emojis = [
  {
    name: 'love',
    width: '20',
    left: '15vw',
    top: '15dvh',
    blur: '2px',
    rotate: '-12',
  },
  {
    name: 'sadness',
    width: '20',
    right: '15vw',
    top: '15dvh',
    rotate: '12',
    blur: '2px',
  },
  {
    name: 'joy',
    width: '24',
    right: '20vw',
    top: '50dvh',
    rotate: '12',
    blur: '2px',
  },
  {
    name: 'surprise',
    width: '24',
    left: '20vw',
    top: '40dvh',
    rotate: '-12',
    blur: '2px',
  },
  {
    name: 'anticipation',
    width: '24',
    left: '30vw',
    top: '20dvh',
    rotate: '-12',
    blur: '2px',
  },
  {
    name: 'lust',
    width: '20',
    right: '5vw',
    top: '60dvh',
    rotate: '-12',
    blur: '2px',
  },
  {
    name: 'fear',
    width: '18',
    left: '5vw',
    top: '60dvh',
    rotate: '-12',
    blur: '2px',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center">
        {emojis.map((emoji) => (
          <Image
            key={emoji.name}
            src={`/assets/emojis/${emoji.name}.png`}
            alt="icon"
            width={100}
            height={100}
            className={cn(
              'absolute',
              emoji.left && `left-[${emoji.left}]`,
              emoji.right && `right-[${emoji.right}]`,
              emoji.top && `top-[${emoji.top}]`,
              emoji.rotate && `rotate-[${emoji.rotate}]`,
              emoji.blur && `blur-[${emoji.blur}]`,
              emoji.width && `w-[${emoji.width}]`,
            )}
          />
        ))}

        <div className="flex w-full flex-col items-center justify-center gap-3">
          <div className="text-center">
            <h1 className="text-balance text-center text-3xl font-black">Analyze Emotions from Text & Tweets</h1>
            <h2 className="font-bold text-muted-foreground">AI powered emotion analyser</h2>
          </div>
          <TextForm />
        </div>
      </section>
      <ResultsSection />
    </main>
  );
}
