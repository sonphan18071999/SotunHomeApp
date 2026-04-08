'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  LANDING_LOCALE_DEFAULT,
  type LandingLocale,
} from '@/constants/landing';

interface LandingLocaleContextValue {
  locale: LandingLocale;
  setLocale: (next: LandingLocale) => void;
}

const LandingLocaleContext = createContext<LandingLocaleContextValue | null>(null);

function isLandingLocale(value: string): value is LandingLocale {
  return value === 'en' || value === 'vi';
}

export function LandingLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LandingLocale>(LANDING_LOCALE_DEFAULT);

  useEffect(() => {
    document.documentElement.lang = locale === 'vi' ? 'vi' : 'en';
  }, [locale]);

  const setLocale = useCallback((next: LandingLocale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem('sotun-landing-locale', next);
    } catch {
      /* ignore quota / private mode */
    }
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('sotun-landing-locale');
      if (stored != null && isLandingLocale(stored)) {
        setLocaleState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LandingLocaleContext.Provider value={value}>{children}</LandingLocaleContext.Provider>;
}

export function useLandingLocale(): LandingLocaleContextValue {
  const ctx = useContext(LandingLocaleContext);
  if (ctx == null) {
    throw new Error('useLandingLocale must be used within LandingLocaleProvider');
  }
  return ctx;
}
