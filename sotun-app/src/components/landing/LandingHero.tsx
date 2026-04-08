'use client';

import React from 'react';
import { Typography } from 'antd';
import { LANDING_COPY } from '@/constants/landing';
import { useLandingLocale } from '@/contexts/LandingLocaleContext';
import { LandingLanguageToggle } from './LandingLanguageToggle';
import {
  LANDING_HEADER_ROW_STYLE,
  LANDING_HERO_WRAP_STYLE,
  LANDING_INNER_STYLE,
} from './landingLayoutTokens';

const { Title, Paragraph, Text } = Typography;

export function LandingHero() {
  const { locale } = useLandingLocale();
  const t = LANDING_COPY[locale];

  return (
    <header style={LANDING_HERO_WRAP_STYLE}>
      <div style={LANDING_INNER_STYLE}>
        <div style={LANDING_HEADER_ROW_STYLE}>
          <div>
            <Text style={{ fontSize: 12, letterSpacing: 0.12, textTransform: 'uppercase' }}>{t.brand}</Text>
            <Title level={1} style={{ marginTop: 8, marginBottom: 0, maxWidth: 780, fontWeight: 700 }}>
              {t.heroTitle}
            </Title>
            <Paragraph style={{ marginTop: 16, marginBottom: 0, fontSize: 18, maxWidth: 780 }}>
              {t.heroSubtitle}
            </Paragraph>
          </div>
          <LandingLanguageToggle />
        </div>
      </div>
    </header>
  );
}
