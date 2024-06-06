import React from 'react';

import { Toaster } from '@/components/ui/sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <>
    <Toaster richColors position="top-right" />
    {children}
  </>
);
