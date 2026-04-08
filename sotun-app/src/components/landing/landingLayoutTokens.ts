import type { CSSProperties } from 'react';

export const LANDING_PAGE_MAX_WIDTH = 1120;
export const LANDING_HEADER_PAD_X = 20;
export const LANDING_SECTION_GAP = 56;
export const LANDING_FOOTER_PAD_Y = 32;
export const LANDING_HERO_PAD_TOP = 72;
export const LANDING_HERO_PAD_BOTTOM = 56;
export const LANDING_STAFF_LINK_OPACITY = 0.55;

export const LANDING_INNER_STYLE: CSSProperties = {
  maxWidth: LANDING_PAGE_MAX_WIDTH,
  margin: '0 auto',
};

export const LANDING_HEADER_ROW_STYLE: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 16,
  flexWrap: 'wrap',
};

export const LANDING_SECTION_STYLE_BASE: CSSProperties = {
  padding: `${LANDING_SECTION_GAP}px ${LANDING_HEADER_PAD_X}px`,
};

export const LANDING_FOOTER_STYLE: CSSProperties = {
  padding: `${LANDING_FOOTER_PAD_Y}px ${LANDING_HEADER_PAD_X}px`,
  borderTop: '1px solid rgba(0,0,0,0.06)',
  background: '#fafafa',
};

export const LANDING_HERO_WRAP_STYLE: CSSProperties = {
  padding: `${LANDING_HERO_PAD_TOP}px ${LANDING_HEADER_PAD_X}px ${LANDING_HERO_PAD_BOTTOM}px`,
  background:
    'radial-gradient(1200px 600px at 20% -10%, rgba(124, 58, 237, 0.14), transparent 60%), radial-gradient(800px 500px at 90% 0%, rgba(14, 165, 233, 0.12), transparent 55%), linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
};
