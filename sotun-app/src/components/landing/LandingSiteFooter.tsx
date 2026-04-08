'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from 'antd';
import { LANDING_COPY } from '@/constants/landing';
import { useLandingLocale } from '@/contexts/LandingLocaleContext';
import { LANDING_FOOTER_STYLE, LANDING_INNER_STYLE, LANDING_STAFF_LINK_OPACITY } from './landingLayoutTokens';

const { Text } = Typography;

export function LandingSiteFooter() {
  const { locale } = useLandingLocale();
  const t = LANDING_COPY[locale];

  return (
    <footer style={LANDING_FOOTER_STYLE}>
      <div
        style={{
          ...LANDING_INNER_STYLE,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <Text type="secondary">
          {t.brand} · {new Date().getFullYear()}
        </Text>
        <Link href="/" style={{ fontSize: 14, opacity: LANDING_STAFF_LINK_OPACITY }}>
          {t.staffLink}
        </Link>
      </div>
    </footer>
  );
}
