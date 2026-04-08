'use client';

import React from 'react';
import Link from 'next/link';
import { Typography, Divider, List, Button, Card } from 'antd';
import { LANDING_COPY } from '@/constants/landing';
import { useLandingLocale } from '@/contexts/LandingLocaleContext';
import { LandingLanguageToggle } from './LandingLanguageToggle';
import { LandingGalleryGrid } from './LandingGalleryGrid';

const { Title, Paragraph, Text } = Typography;

const PAGE_MAX_WIDTH = 1120;
const HERO_PAD_TOP = 72;
const HERO_PAD_BOTTOM = 56;
const SECTION_GAP = 56;
const HEADER_PAD_X = 20;
const FOOTER_PAD_Y = 32;
const STAFF_LINK_OPACITY = 0.55;

const HERO_WRAP_STYLE: React.CSSProperties = {
  padding: `${HERO_PAD_TOP}px ${HEADER_PAD_X}px ${HERO_PAD_BOTTOM}px`,
  background:
    'radial-gradient(1200px 600px at 20% -10%, rgba(124, 58, 237, 0.14), transparent 60%), radial-gradient(800px 500px at 90% 0%, rgba(14, 165, 233, 0.12), transparent 55%), linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
};

const INNER_STYLE: React.CSSProperties = {
  maxWidth: PAGE_MAX_WIDTH,
  margin: '0 auto',
};

const HEADER_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 16,
  flexWrap: 'wrap',
};

const SECTION_STYLE: React.CSSProperties = {
  padding: `${SECTION_GAP}px ${HEADER_PAD_X}px`,
};

const FOOTER_STYLE: React.CSSProperties = {
  padding: `${FOOTER_PAD_Y}px ${HEADER_PAD_X}px`,
  borderTop: '1px solid rgba(0,0,0,0.06)',
  background: '#fafafa',
};

export function LandingPage() {
  const { locale } = useLandingLocale();
  const t = LANDING_COPY[locale];

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#1a1a1a' }}>
      <header style={HERO_WRAP_STYLE}>
        <div style={INNER_STYLE}>
          <div style={HEADER_ROW_STYLE}>
            <div>
              <Text style={{ fontSize: 12, letterSpacing: 0.12, textTransform: 'uppercase' }}>
                {t.brand}
              </Text>
              <Title level={1} style={{ marginTop: 8, marginBottom: 0, maxWidth: 780, fontWeight: 700 }}>
                {t.heroTitle}
              </Title>
              <Paragraph style={{ marginTop: 16, marginBottom: 0, fontSize: 18, maxWidth: 720 }}>
                {t.heroSubtitle}
              </Paragraph>
            </div>
            <LandingLanguageToggle />
          </div>
        </div>
      </header>

      <main>
        <section style={SECTION_STYLE}>
          <div style={INNER_STYLE}>
            <Title level={2} style={{ marginTop: 0 }}>
              {t.galleryTitle}
            </Title>
            <Paragraph type="secondary" style={{ marginTop: 4, maxWidth: 720 }}>
              {t.gallerySubtitle}
            </Paragraph>
            <div style={{ marginTop: 24 }}>
              <LandingGalleryGrid locale={locale} />
            </div>
          </div>
        </section>

        <section style={{ ...SECTION_STYLE, paddingTop: 8 }}>
          <div style={INNER_STYLE}>
            <Divider style={{ margin: '8px 0 32px' }} />
            <Title level={2} style={{ marginTop: 0 }}>
              {t.aboutTitle}
            </Title>
            <Paragraph style={{ fontSize: 17, marginBottom: 12 }}>{t.aboutLead}</Paragraph>
            <Paragraph type="secondary">{t.aboutP1}</Paragraph>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              {t.aboutP2}
            </Paragraph>

            <Card size="small" style={{ marginTop: 28, borderRadius: 12 }}>
              <Title level={4} style={{ marginTop: 0 }}>
                {t.amenitiesTitle}
              </Title>
              <List
                size="small"
                dataSource={[...t.amenities]}
                renderItem={(text) => (
                  <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Text>{text}</Text>
                  </List.Item>
                )}
              />
            </Card>

            <Card
              size="small"
              style={{ marginTop: 24, borderRadius: 12, background: 'linear-gradient(135deg, #f5f3ff 0%, #ecfeff 100%)' }}
            >
              <Title level={4} style={{ marginTop: 0 }}>
                {t.ctaTitle}
              </Title>
              <Paragraph style={{ marginBottom: 16 }}>{t.ctaSubtitle}</Paragraph>
              <Button type="primary" href="mailto:stay@example.com">
                {locale === 'vi' ? 'Gửi email' : 'Email us'}
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <footer style={FOOTER_STYLE}>
        <div style={{ ...INNER_STYLE, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <Text type="secondary">{t.brand} · {new Date().getFullYear()}</Text>
          <Link href="/" style={{ fontSize: 14, opacity: STAFF_LINK_OPACITY }}>
            {t.staffLink}
          </Link>
        </div>
      </footer>
    </div>
  );
}
