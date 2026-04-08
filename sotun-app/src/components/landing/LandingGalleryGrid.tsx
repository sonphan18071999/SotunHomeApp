'use client';

import React from 'react';
import { Image } from 'antd';
import { LANDING_GALLERY_IMAGES, type LandingLocale } from '@/constants/landing';

export type LandingGalleryImage = { readonly src: string; readonly alt: Readonly<Record<LandingLocale, string>> };

const GRID_MIN = 240;
const GRID_GAP = 14;
const IMAGE_HEIGHT = 220;

interface LandingGalleryGridProps {
  locale: LandingLocale;
  images?: readonly LandingGalleryImage[];
}

export function LandingGalleryGrid({ locale, images }: LandingGalleryGridProps) {
  const items = images ?? LANDING_GALLERY_IMAGES;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${GRID_MIN}px, 1fr))`,
        gap: GRID_GAP,
      }}
    >
      {items.map((item) => (
        <Image
          key={item.src}
          src={item.src}
          alt={item.alt[locale]}
          style={{
            width: '100%',
            height: IMAGE_HEIGHT,
            objectFit: 'cover',
            borderRadius: 10,
            display: 'block',
          }}
          preview={{
            mask: locale === 'vi' ? 'Xem' : 'View',
          }}
        />
      ))}
    </div>
  );
}
