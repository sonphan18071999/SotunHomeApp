'use client';

import React from 'react';
import { LandingLocaleProvider } from '@/contexts/LandingLocaleContext';
import { LandingPage } from '@/components/landing/LandingPage';

export default function VisitPage() {
  return (
    <LandingLocaleProvider>
      <LandingPage />
    </LandingLocaleProvider>
  );
}
