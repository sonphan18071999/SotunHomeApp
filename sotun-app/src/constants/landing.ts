/** Public landing page locales (end-user facing). */
export type LandingLocale = 'en' | 'vi';

export const LANDING_LOCALE_EN: LandingLocale = 'en';
export const LANDING_LOCALE_VI: LandingLocale = 'vi';

export const LANDING_LOCALE_DEFAULT: LandingLocale = LANDING_LOCALE_EN;

export interface LandingCopy {
  metaDescription: string;
  brand: string;
  heroTitle: string;
  heroSubtitle: string;
  galleryTitle: string;
  gallerySubtitle: string;
  aboutTitle: string;
  aboutLead: string;
  aboutP1: string;
  aboutP2: string;
  amenitiesTitle: string;
  readonly amenities: readonly string[];
  ctaTitle: string;
  ctaSubtitle: string;
  staffLink: string;
  languageLabel: string;
}

export const LANDING_COPY: Readonly<Record<LandingLocale, LandingCopy>> = {
  [LANDING_LOCALE_EN]: {
    metaDescription:
      'Discover our homestay through art, calm spaces, and a warm welcome. Browse the gallery and learn about the place.',
    brand: 'Sotun Stay',
    heroTitle: 'A quiet homestay where art meets rest',
    heroSubtitle:
      'Wander the gallery, slow down in light-filled rooms, and feel at home in a space curated for travelers who love beauty and ease.',
    galleryTitle: 'Art & space',
    gallerySubtitle: 'A small selection of works and corners that define the atmosphere of the house.',
    aboutTitle: 'About this place',
    aboutLead:
      'We renovated a century-old townhouse into a living gallery: local ceramics, prints, and textiles accompany simple, comfortable stays.',
    aboutP1:
      'Mornings begin with pour-over coffee in the courtyard. Afternoons are for sketching, reading, or planning your next stop in the old quarter.',
    aboutP2:
      'Every season we invite a different artist-in-residence; pieces you see today may travel onward tomorrow—come while they are here.',
    amenitiesTitle: 'What guests enjoy',
    amenities: [
      'Curated art throughout shared spaces',
      'Garden-level lounge and reading nook',
      'High-speed Wi‑Fi and workspace corners',
      'Local breakfast recommendations & maps',
    ],
    ctaTitle: 'Plan your stay',
    ctaSubtitle: 'Ask about availability and room types—we reply within a day.',
    staffLink: 'Homestay management',
    languageLabel: 'Language',
  },
  [LANDING_LOCALE_VI]: {
    metaDescription:
      'Khám phá homestay qua nghệ thuật, không gian yên và sự chào đón ấm áp. Xem thư viện ảnh và tìm hiểu về nơi lưu trú.',
    brand: 'Sotun Stay',
    heroTitle: 'Homestay yên tĩnh — nghệ thuật và sự nghỉ ngơi',
    heroSubtitle:
      'Dạo qua không gian triển lãm nhỏ, thả lỏng trong phòng đầy ánh sáng, và cảm như nhà tại nơi dành cho người yêu cái đẹp và sự nhẹ nhàng.',
    galleryTitle: 'Không gian & nghệ thuật',
    gallerySubtitle:
      'Một vài tác phẩm và góc nhỏ gợi lên bầu không khí của ngôi nhà.',
    aboutTitle: 'Về nơi này',
    aboutLead:
      'Chúng tôi cải tạo một dãy phố cổ thành “phòng trưng bày sống”: gốm địa phương, tranh in và dệt may đi cùng phòng ở gọn gàng, thoải mái.',
    aboutP1:
      'Buổi sáng bắt đầu bằng cà phê tại sân trong. Buổi chiều dành để phác họa, đọc sách, hoặc lên kế hoạch cho con phố tiếp theo.',
    aboutP2:
      'Mỗi mùa chúng tôi mời một nghệ sĩ cư trú khác; những tác phẩm bạn thấy hôm nay có thể đi tiếp—hãy ghé khi chúng còn ở đây.',
    amenitiesTitle: 'Điều khách thích',
    amenities: [
      'Nghệ thuật được chọn lọc trong không gian chung',
      'Góc thư giãn và đọc sách tầng trệt',
      'Wi‑Fi tốc độ cao và góc làm việc',
      'Gợi ý bữa sáng địa phương & bản đồ',
    ],
    ctaTitle: 'Đặt lịch lưu trú',
    ctaSubtitle: 'Hỏi phòng trống và loại phòng — chúng tôi phản hồi trong một ngày.',
    staffLink: 'Quản lý homestay',
    languageLabel: 'Ngôn ngữ',
  },
} as const;

const LANDING_ART_GALLERY_WALL =
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80&auto=format&fit=crop';

const LANDING_ART_SCULPTURE =
  'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=900&q=80&auto=format&fit=crop';

const LANDING_ART_ABSTRACT =
  'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=900&q=80&auto=format&fit=crop';

const LANDING_SPACE_LOUNGE =
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=900&q=80&auto=format&fit=crop';

const LANDING_SPACE_ATTIC =
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=80&auto=format&fit=crop';

const LANDING_SPACE_COURTYARD =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop';

/** Curated art-forward imagery (Unsplash). */
export const LANDING_GALLERY_IMAGES: readonly {
  readonly src: string;
  readonly alt: Readonly<Record<LandingLocale, string>>;
}[] = [
  {
    src: LANDING_ART_GALLERY_WALL,
    alt: {
      en: 'Gallery wall with framed modern art',
      vi: 'Tường triển lãm với các khung tranh nghệ thuật hiện đại',
    },
  },
  {
    src: LANDING_ART_SCULPTURE,
    alt: {
      en: 'Sculptural forms and soft daylight',
      vi: 'Tác phẩm điêu khắc và ánh sáng ban ngày nhẹ nhàng',
    },
  },
  {
    src: LANDING_ART_ABSTRACT,
    alt: {
      en: 'Abstract painting detail',
      vi: 'Chi tiết tranh trừu tượng',
    },
  },
  {
    src: LANDING_SPACE_LOUNGE,
    alt: {
      en: 'Lounge seating and warm wood tones',
      vi: 'Khu ghế sofa và tông gỗ ấm',
    },
  },
  {
    src: LANDING_SPACE_ATTIC,
    alt: {
      en: 'Bright bedroom with linen and art',
      vi: 'Phòng ngủ sáng với drap và tranh',
    },
  },
  {
    src: LANDING_SPACE_COURTYARD,
    alt: {
      en: 'Courtyard greenery and architecture',
      vi: 'Sân trong xanh mát và kiến trúc',
    },
  },
] as const;
