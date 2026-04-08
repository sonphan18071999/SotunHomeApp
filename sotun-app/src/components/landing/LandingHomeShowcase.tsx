'use client';

import React from 'react';
import { Typography, Divider, List, Button, Card } from 'antd';
import type { LandingHomeDefinition, LandingHomeTheme, LandingLocale } from '@/constants/landing';
import { LandingGalleryGrid } from './LandingGalleryGrid';
import { LANDING_HEADER_PAD_X, LANDING_INNER_STYLE, LANDING_SECTION_GAP } from './landingLayoutTokens';

const { Title, Paragraph, Text } = Typography;

const PERSPECTIVE_PX = 1400;
const SPLIT_MIN_COL = 320;
const SPLIT_GAP = 32;
const WRAP_MIN_COL = 280;
const WRAP_GAP = 24;
const GALLERY_TOP = 28;
const CARD_RADIUS = 12;
const SHADOW_3D = '0 24px 64px rgba(15, 23, 42, 0.18)';

const THEME_SECTION_SURFACE: Readonly<Record<LandingHomeTheme, React.CSSProperties>> = {
  violet: { background: 'linear-gradient(180deg, #f8f7ff 0%, #ffffff 60%)' },
  amber: { background: 'linear-gradient(180deg, #fffbf3 0%, #ffffff 60%)' },
} as const;

const CTA_GRADIENT_VIOLET = 'linear-gradient(135deg, #f5f3ff 0%, #ecfeff 100%)';
const CTA_GRADIENT_AMBER = 'linear-gradient(135deg, #fff7ed 0%, #ecfeff 100%)';

const wrapGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${WRAP_MIN_COL}px, 1fr))`,
  gap: WRAP_GAP,
  marginTop: 12,
};

const splitGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${SPLIT_MIN_COL}px), 1fr))`,
  gap: SPLIT_GAP,
  alignItems: 'start',
  marginTop: 8,
};

export interface LandingHomeShowcaseProps {
  home: LandingHomeDefinition;
  locale: LandingLocale;
}

export function LandingHomeShowcase({ home, locale }: LandingHomeShowcaseProps) {
  const t = home.copy[locale];
  const ctaBackground = home.theme === 'amber' ? CTA_GRADIENT_AMBER : CTA_GRADIENT_VIOLET;

  return (
    <section
      className="landing-scroll-section"
      data-landing-home={home.id}
      style={{
        padding: `${LANDING_SECTION_GAP}px ${LANDING_HEADER_PAD_X}px`,
        ...THEME_SECTION_SURFACE[home.theme],
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <div style={LANDING_INNER_STYLE}>
        <Text className="landing-reveal" style={{ fontSize: 12, letterSpacing: 0.14, textTransform: 'uppercase' }}>
          {t.eyebrow}
        </Text>
        <Title className="landing-reveal" level={2} style={{ marginTop: 8, marginBottom: 0, maxWidth: 840 }}>
          {t.title}
        </Title>
        <Paragraph className="landing-reveal" style={{ marginTop: 12, marginBottom: 0, fontSize: 17, maxWidth: 800 }}>
          {t.tagline}
        </Paragraph>

        <div style={splitGridStyle}>
          <div style={{ perspective: PERSPECTIVE_PX }}>
            <div
              className="landing-3d-stage"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- GSAP targets raw img for parallax */}
              <img
                className="landing-3d-img"
                src={home.hero3d.src}
                alt={home.hero3d.alt[locale]}
                width={1400}
                height={933}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: 16,
                  boxShadow: SHADOW_3D,
                }}
              />
            </div>
          </div>

          <div>
            <Paragraph className="landing-reveal" style={{ fontSize: 17, marginBottom: 12, fontWeight: 500 }}>
              {t.lead}
            </Paragraph>
            <div style={wrapGridStyle}>
              <Paragraph className="landing-reveal" type="secondary" style={{ marginBottom: 0 }}>
                {t.wrapColumnA}
              </Paragraph>
              <Paragraph className="landing-reveal" type="secondary" style={{ marginBottom: 0 }}>
                {t.wrapColumnB}
              </Paragraph>
            </div>
          </div>
        </div>

        <div style={{ marginTop: GALLERY_TOP }}>
          <Title className="landing-reveal" level={3} style={{ marginTop: 16, marginBottom: 0 }}>
            {t.galleryTitle}
          </Title>
          <Paragraph className="landing-reveal" type="secondary" style={{ marginTop: 6, maxWidth: 720 }}>
            {t.gallerySubtitle}
          </Paragraph>
          <div className="landing-reveal" style={{ marginTop: 20 }}>
            <LandingGalleryGrid locale={locale} images={home.gallery} />
          </div>
        </div>

        <div className="landing-reveal" style={{ marginTop: 36 }}>
          <Divider style={{ margin: '0 0 24px' }} />
          <Card size="small" style={{ borderRadius: CARD_RADIUS }}>
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

          <Card size="small" style={{ marginTop: 20, borderRadius: CARD_RADIUS, background: ctaBackground }}>
            <Title level={4} style={{ marginTop: 0 }}>
              {t.ctaTitle}
            </Title>
            <Paragraph style={{ marginBottom: 16 }}>{t.ctaSubtitle}</Paragraph>
            <Button type="primary" href={t.mailtoHref}>
              {t.ctaEmailLabel}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
