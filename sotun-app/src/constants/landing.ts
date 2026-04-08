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
    heroTitle: 'Step inside two Sotun homes',
    heroSubtitle:
      'Scroll as if you walk through the front door—first Sotun Home 01, then cross the lane to Sotun Home 02. Each house shares the same calm layout, with its own art, light, and story.',
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
    heroTitle: 'Bước vào hai ngôi nhà Sotun',
    heroSubtitle:
      'Cuộn chậm như đang bước qua cửa—trước tiên Sotun Home 01, rồi sang Sotun Home 02. Hai nhà cùng bố cục yên ả, mỗi nơi một bộ tranh, ánh sáng và câu chuyện riêng.',
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

/** Homestay categories on the public landing (same layout, different media & copy). */
export type LandingHomeId = 'sotun-home-01' | 'sotun-home-02';

export type LandingHomeTheme = 'violet' | 'amber';

export interface LandingHomeCopy {
  eyebrow: string;
  title: string;
  tagline: string;
  lead: string;
  wrapColumnA: string;
  wrapColumnB: string;
  galleryTitle: string;
  gallerySubtitle: string;
  amenitiesTitle: string;
  readonly amenities: readonly string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaEmailLabel: string;
  mailtoHref: string;
}

export interface LandingHomeDefinition {
  readonly id: LandingHomeId;
  readonly label: string;
  readonly theme: LandingHomeTheme;
  /** Wide hero frame — angled interior / architecture reads well in 3D-style motion. */
  readonly hero3d: { readonly src: string; readonly alt: Readonly<Record<LandingLocale, string>> };
  readonly gallery: readonly { readonly src: string; readonly alt: Readonly<Record<LandingLocale, string>> }[];
  readonly copy: Readonly<Record<LandingLocale, LandingHomeCopy>>;
}

const HOME01_HERO_3D =
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=80&auto=format&fit=crop';

const HOME01_G1 =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format&fit=crop';
const HOME01_G2 =
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=900&q=80&auto=format&fit=crop';
const HOME01_G3 =
  'https://images.unsplash.com/photo-1549388604-817d15aa0110?w=900&q=80&auto=format&fit=crop';
const HOME01_G4 =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80&auto=format&fit=crop';

const HOME02_HERO_3D = '/photos/home02_sunny_day.png';

const HOME02_G1 = '/photos/home02_bed.jpeg';
const HOME02_G2 = '/photos/home02_bed_night.jpeg';
const HOME02_G3 = '/photos/home02_projector.jpeg';
const HOME02_G4 = '/photos/home02_bookshell.jpg';

export const LANDING_HOMES: readonly LandingHomeDefinition[] = [
  {
    id: 'sotun-home-01',
    label: 'Sotun Home 01',
    theme: 'violet',
    hero3d: {
      src: HOME01_HERO_3D,
      alt: {
        en: 'Layered living space with gallery lighting and soft shadows',
        vi: 'Không gian sinh hoạt tầng lớp với ánh sáng phòng tranh và bóng đổ mềm',
      },
    },
    gallery: [
      {
        src: HOME01_G1,
        alt: { en: 'Cool-toned lounge detail', vi: 'Chi tiết phòng khách tông lạnh' },
      },
      {
        src: HOME01_G2,
        alt: { en: 'Lounge vignette with sculptural seating', vi: 'Góc sofa với bố cục điêu khắc' },
      },
      {
        src: HOME01_G3,
        alt: { en: 'Geometric wall and textile color', vi: 'Tường họa tiết và màu dệt' },
      },
      {
        src: HOME01_G4,
        alt: { en: 'Courtyard view through glass', vi: 'Nhìn sân trong qua kính' },
      },
    ],
    copy: {
      [LANDING_LOCALE_EN]: {
        eyebrow: 'Sotun Home 01',
        title: 'The gallery house — urban, calm, curated',
        tagline: 'Tall light, framed art, and a living room that feels like the first room you enter.',
        lead:
          'Home 01 opens through a narrow foyer into an open salon: white walls, oak underfoot, and pieces swapped each quarter.',
        wrapColumnA:
          'We designed the circulation like a small museum—you pause, turn, and discover something hung slightly off-center on purpose',
        wrapColumnB:
          'Bedrooms sit one half-flight up; mornings start quiet, with coffee at the long window bench before the city wakes',
        galleryTitle: 'Rooms you pass on the way in',
        gallerySubtitle: 'Four stops along the hallway: texture, light, seating, and a glimpse outside.',
        amenitiesTitle: 'Inside this home',
        amenities: [
          'Gallery wall + track lighting',
          'Open kitchen and dining bench',
          'Rain shower and soft linen beds',
          'Bluetooth speaker & fast Wi‑Fi',
        ],
        ctaTitle: 'Stay at Home 01',
        ctaSubtitle: 'Ask for the northern light room or the courtyard suite—we will match dates.',
        ctaEmailLabel: 'Email about Home 01',
        mailtoHref: 'mailto:stay@example.com?subject=Sotun%20Home%2001%20%E2%80%93%20inquiry',
      },
      [LANDING_LOCALE_VI]: {
        eyebrow: 'Sotun Home 01',
        title: 'Nhà phòng tranh — đô thị, yên, được chọn lọc',
        tagline: 'Ánh sáng cao, tranh đóng khung, và phòng khách như lối vào đầu tiên.',
        lead:
          'Home 01 mở từ hành lang hẹp vào phòng salon: tường trắng, sàn gỗ sồi, và tranh được đổi theo từng quý.',
        wrapColumnA:
          'Lối đi được thiết kế như viện bảo tàng nhỏ—bạn dừng lại, quay người, và thấy một tác phẩm treo lệch nhẹ một cách chủ ý',
        wrapColumnB:
          'Phòng ngủ nửa tầng phía trên; buổi sáng bắt đầu êm, với cà phê tại băng ghế cửa sổ dài trước khi phố thức dậy',
        galleryTitle: 'Những phòng bạn đi qua khi bước vào',
        gallerySubtitle: 'Bốn điểm dừng dọc hành lang: chất liệu, ánh sáng, chỗ ngồi, và một góc nhìn ra ngoài.',
        amenitiesTitle: 'Trong ngôi nhà này',
        amenities: [
          'Tường triển lãm + đèn ray',
          'Bếp mở và băng ghế ăn',
          'Vòi sen mưa và giường drap mềm',
          'Loa Bluetooth & Wi‑Fi nhanh',
        ],
        ctaTitle: 'Lưu trú tại Home 01',
        ctaSubtitle: 'Hỏi phòng ánh sáng hướng bắc hoặc căn sân trong—chúng tôi sẽ ghép ngày phù hợp.',
        ctaEmailLabel: 'Email về Home 01',
        mailtoHref: 'mailto:stay@example.com?subject=Sotun%20Home%2001%20%E2%80%93%20h%E1%BB%8Fi%20ph%C3%B2ng',
      },
    },
  },
  {
    id: 'sotun-home-02',
    label: 'Sotun Home 02',
    theme: 'amber',
    hero3d: {
      src: HOME02_HERO_3D,
      alt: {
        en: 'Courtyard wing with timber beams and deep seating',
        vi: 'Cánh nhà sân trong với kèo gỗ và chỗ ngồi sâu',
      },
    },
    gallery: [
      {
        src: HOME02_G1,
        alt: { en: 'Courtyard planting and stone path', vi: 'Cây sân trong và lối đi đá' },
      },
      {
        src: HOME02_G2,
        alt: { en: 'Kitchen joinery in warm oak', vi: 'Tủ bếp gỗ sồi ấm' },
      },
      {
        src: HOME02_G3,
        alt: { en: 'Evening light on dining table', vi: 'Ánh chiều trên bàn ăn' },
      },
      {
        src: HOME02_G4,
        alt: { en: 'Reading nook beneath stair', vi: 'Góc đọc dưới cầu thang' },
      },
    ],
    copy: {
      [LANDING_LOCALE_EN]: {
        eyebrow: 'Sotun Home 02',
        title: 'The garden wing — wood, breeze, slow evenings',
        tagline: 'Lower ceilings, wider doors, and rooms that spill toward the courtyard.',
        lead:
          'Home 02 is the second threshold a few steps across the lane: brick underfoot, plants drafting shade along the glass.',
        wrapColumnA:
          'Circulation hugs the garden—we keep shoes near the door and tea waiting on the wood counter',
        wrapColumnB:
          'By night, lamps are warm only; the art here is ceramic and fiber, meant to be touched gently',
        galleryTitle: 'Walking the perimeter',
        gallerySubtitle: 'Follow the outer ring: garden, kitchen table, light across the stair, then the nook.',
        amenitiesTitle: 'Inside this home',
        amenities: [
          'Private courtyard access',
          'Outdoor shower hook-up (seasonal)',
          'Record player + vinyl starter shelf',
          'Extra blankets and floor cushions',
        ],
        ctaTitle: 'Stay at Home 02',
        ctaSubtitle: 'Mention if you celebrate outdoors—we stage the patio for slow dinners.',
        ctaEmailLabel: 'Email about Home 02',
        mailtoHref: 'mailto:stay@example.com?subject=Sotun%20Home%2002%20%E2%80%93%20inquiry',
      },
      [LANDING_LOCALE_VI]: {
        eyebrow: 'Sotun Home 02',
        title: 'Cánh nhà sân trong — gỗ, gió, buổi tối chậm',
        tagline: 'Trần thấp hơn, cửa rộng hơn, và phòng thông ra sân trong.',
        lead:
          'Home 02 là ngưỡng thứ hai sau vài bước qua ngõ: gạch dưới chân, cây tạo bóng dọc theo kính.',
        wrapColumnA:
          'Lối đi ôm theo sân—giày để gần cửa và trà chờ trên quầy gỗ',
        wrapColumnB:
          'Tối đến, đèn chỉ ấm vừa; nghệ thuật ở đây là gốm và sợi, để chạm nhẹ',
        galleryTitle: 'Đi vòng quanh nhà',
        gallerySubtitle: 'Theo vành ngoài: sân, bếp, ánh sáng trên cầu thang, rồi góc đọc.',
        amenitiesTitle: 'Trong ngôi nhà này',
        amenities: [
          'Lối riêng ra sân trong',
          'Vòi sen ngoài trời (theo mùa)',
          'Máy nhạc đĩa than + vài đĩa mở đầu',
          'Chăn thêm và đệm ngồi sàn',
        ],
        ctaTitle: 'Lưu trú tại Home 02',
        ctaSubtitle: 'Cho biết nếu bạn thích tiệc sân—chúng tôi dựng hiên cho bữa tối chậm.',
        ctaEmailLabel: 'Email về Home 02',
        mailtoHref: 'mailto:stay@example.com?subject=Sotun%20Home%2002%20%E2%80%93%20h%E1%BB%8Fi%20ph%C3%B2ng',
      },
    },
  },
] as const;
