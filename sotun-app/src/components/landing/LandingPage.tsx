'use client';

import React, { useRef } from 'react';
import { LANDING_HOMES } from '@/constants/landing';
import { useLandingLocale } from '@/contexts/LandingLocaleContext';
import { useLandingEntranceScroll } from '@/hooks/useLandingEntranceScroll';
import { LandingHero } from './LandingHero';
import { LandingHomeShowcase } from './LandingHomeShowcase';
import { LandingSiteFooter } from './LandingSiteFooter';

const PAGE_SHELL_STYLE: React.CSSProperties = {
  minHeight: '100vh',
  background: '#fff',
  color: '#1a1a1a',
};

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { locale } = useLandingLocale();

  useLandingEntranceScroll(rootRef, locale);

  return (
    <div ref={rootRef} style={PAGE_SHELL_STYLE}>
      <LandingHero />
      <main>
        {LANDING_HOMES.map((home) => (
          <LandingHomeShowcase key={home.id} home={home} locale={locale} />
        ))}
      </main>
      <LandingSiteFooter />
    </div>
  );
}
