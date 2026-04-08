'use client';

import React, { useMemo } from 'react';
import { Segmented } from 'antd';
import { LANDING_COPY, LANDING_LOCALE_EN, LANDING_LOCALE_VI, type LandingLocale } from '@/constants/landing';
import { useLandingLocale } from '@/contexts/LandingLocaleContext';

const SEGMENTED_EN_LABEL = 'English';
const SEGMENTED_VI_LABEL = 'Tiếng Việt';

export function LandingLanguageToggle() {
  const { locale, setLocale } = useLandingLocale();

  const label = useMemo(() => LANDING_COPY[locale].languageLabel, [locale]);

  const options = useMemo(
    () => [
      { label: SEGMENTED_EN_LABEL, value: LANDING_LOCALE_EN },
      { label: SEGMENTED_VI_LABEL, value: LANDING_LOCALE_VI },
    ],
    []
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, letterSpacing: 0.04, textTransform: 'uppercase', opacity: 0.65 }}>
        {label}
      </span>
      <Segmented<LandingLocale> size="small" value={locale} onChange={setLocale} options={options} />
    </div>
  );
}
