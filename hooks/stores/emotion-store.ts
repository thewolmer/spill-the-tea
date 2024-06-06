import { create } from 'zustand';

import { emotionResponseType } from '@/types/Responses/getEmotion';

interface useEmotionStore {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  emotion: emotionResponseType | null | undefined;
  setEmotion: (emotion: emotionResponseType | null | undefined) => void;
}

export const useStoreEmotion = create<useEmotionStore>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  emotion: null,
  setEmotion: (emotion) => set({ emotion }),
}));
