/**
 * VendorProfileEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorProfileEntity } from '../../../../src/module/domain/entities/vendor-profile.entity.js';
import { BusinessDescriptionVO } from '../../../../src/module/domain/value-objects/primitives/business-description.vo.js';
import { VendorLogoVO } from '../../../../src/module/domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../../../../src/module/domain/value-objects/primitives/vendor-banner.vo.js';
import { VendorWebsiteVO } from '../../../../src/module/domain/value-objects/primitives/vendor-website.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';

function makeProfile(overrides: {
  tagline?: string;
  about?: BusinessDescriptionVO;
  logo?: VendorLogoVO;
  banner?: VendorBannerVO;
  website?: VendorWebsiteVO;
  categories?: readonly string[];
  languages?: readonly string[];
  socialLinks?: Readonly<Record<string, string>>;
} = {}) {
  return VendorProfileEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: VENDOR,
      tagline: overrides.tagline,
      about: overrides.about,
      logo: overrides.logo,
      banner: overrides.banner,
      website: overrides.website,
      categories: overrides.categories,
      languages: overrides.languages,
      socialLinks: overrides.socialLinks,
    },
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { deletedAt, ...propsOverrides } = overrides as {
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorProfileEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      socialLinks: {},
      categories: [],
      languages: [],
      ...propsOverrides,
    } as never,
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorProfileEntity — creation', () => {
  it('creates minimal profile', () => {
    const p = makeProfile();
    expect(p.vendorId).toBe(VENDOR);
    expect(p.tagline).toBeUndefined();
    expect(p.categories).toEqual([]);
    expect(p.languages).toEqual([]);
    expect(p.socialLinks).toEqual({});
  });

  it('creates with all fields', () => {
    const p = makeProfile({
      tagline: 'Best store in town',
      about: BusinessDescriptionVO.create('We sell great products.'),
      categories: ['electronics', 'gadgets'],
      languages: ['bn', 'en'],
      socialLinks: { facebook: 'https://fb.com/x' },
    });
    expect(p.tagline).toBe('Best store in town');
    expect(p.categories.length).toBe(2);
    expect(p.socialLinks['facebook']).toBeDefined();
  });
});

describe('VendorProfileEntity — invariants', () => {
  it('rejects tagline > 160 chars', () => {
    expect(() => reconstitute({ tagline: 'x'.repeat(161) })).toThrow();
  });

  it('rejects > 20 categories', () => {
    expect(() => reconstitute({ categories: new Array(21).fill('c') })).toThrow();
  });

  it('rejects > 10 languages', () => {
    expect(() => reconstitute({ languages: new Array(11).fill('en') })).toThrow();
  });
});

describe('VendorProfileEntity — getters', () => {
  it('returns scalar getters', () => {
    const p = makeProfile({ tagline: 'Hi' });
    expect(p.vendorId).toBe(VENDOR);
    expect(p.tagline).toBe('Hi');
    expect(p.about).toBeUndefined();
    expect(p.logo).toBeUndefined();
    expect(p.banner).toBeUndefined();
    expect(p.website).toBeUndefined();
    expect(p.socialLinks).toEqual({});
    expect(p.categories).toEqual([]);
    expect(p.languages).toEqual([]);
  });
});

describe('VendorProfileEntity — predicates', () => {
  it('hasLogo false when no logo', () => {
    expect(makeProfile().hasLogo()).toBe(false);
  });

  it('hasLogo true when logo set', () => {
    const p = makeProfile({ logo: VendorLogoVO.create('https://cdn.example.com/logo.png') });
    expect(p.hasLogo()).toBe(true);
  });

  it('hasBanner false when no banner', () => {
    expect(makeProfile().hasBanner()).toBe(false);
  });

  it('hasBanner true when banner set', () => {
    const p = makeProfile({ banner: VendorBannerVO.create('https://cdn.example.com/banner.jpg') });
    expect(p.hasBanner()).toBe(true);
  });

  it('hasAbout false when no about', () => {
    expect(makeProfile().hasAbout()).toBe(false);
  });

  it('hasAbout true when about set', () => {
    const p = makeProfile({ about: BusinessDescriptionVO.create('A long description of what we do.') });
    expect(p.hasAbout()).toBe(true);
  });

  it('isComplete requires logo + about + categories', () => {
    const p = makeProfile({
      logo: VendorLogoVO.create('https://cdn.example.com/logo.png'),
      about: BusinessDescriptionVO.create('A description'),
      categories: ['electronics'],
    });
    expect(p.isComplete()).toBe(true);
  });

  it('isComplete false when missing logo', () => {
    const p = makeProfile({
      about: BusinessDescriptionVO.create('A description'),
      categories: ['electronics'],
    });
    expect(p.isComplete()).toBe(false);
  });
});

describe('VendorProfileEntity — updateTagline', () => {
  it('updates tagline', () => {
    const p = makeProfile();
    p.updateTagline('New tagline', NOW);
    expect(p.tagline).toBe('New tagline');
  });

  it('throws on non-string', () => {
    const p = makeProfile();
    expect(() => p.updateTagline(123 as never, NOW)).toThrow();
  });

  it('throws on empty', () => {
    const p = makeProfile();
    expect(() => p.updateTagline('', NOW)).toThrow();
    expect(() => p.updateTagline('   ', NOW)).toThrow();
  });

  it('throws on > 160 chars', () => {
    const p = makeProfile();
    expect(() => p.updateTagline('x'.repeat(161), NOW)).toThrow();
  });
});

describe('VendorProfileEntity — updateAbout', () => {
  it('updates about', () => {
    const p = makeProfile();
    p.updateAbout(BusinessDescriptionVO.create('Long about text'), NOW);
    expect(p.hasAbout()).toBe(true);
  });

  it('throws on non-VO', () => {
    const p = makeProfile();
    expect(() => p.updateAbout('not-vo' as never, NOW)).toThrow();
  });
});

describe('VendorProfileEntity — updateLogo', () => {
  it('updates logo', () => {
    const p = makeProfile();
    p.updateLogo(VendorLogoVO.create('https://cdn.example.com/logo.png'), NOW);
    expect(p.hasLogo()).toBe(true);
  });

  it('throws on non-VO', () => {
    const p = makeProfile();
    expect(() => p.updateLogo('not-vo' as never, NOW)).toThrow();
  });
});

describe('VendorProfileEntity — updateBanner', () => {
  it('updates banner', () => {
    const p = makeProfile();
    p.updateBanner(VendorBannerVO.create('https://cdn.example.com/banner.jpg'), NOW);
    expect(p.hasBanner()).toBe(true);
  });

  it('throws on non-VO', () => {
    const p = makeProfile();
    expect(() => p.updateBanner('not-vo' as never, NOW)).toThrow();
  });
});

describe('VendorProfileEntity — updateCategories', () => {
  it('updates categories', () => {
    const p = makeProfile();
    p.updateCategories(['electronics', 'gadgets'], NOW);
    expect(p.categories.length).toBe(2);
  });

  it('deduplicates + trims', () => {
    const p = makeProfile();
    p.updateCategories(['  electronics  ', 'electronics', 'gadgets'], NOW);
    expect(p.categories.length).toBe(2);
  });

  it('removes empty strings', () => {
    const p = makeProfile();
    p.updateCategories(['', '   ', 'electronics'], NOW);
    expect(p.categories.length).toBe(1);
  });

  it('throws on > 20 categories', () => {
    const p = makeProfile();
    expect(() => p.updateCategories(new Array(21).fill('c'), NOW)).toThrow();
  });
});

describe('VendorProfileEntity — addSocialLink', () => {
  it('adds social link', () => {
    const p = makeProfile();
    p.addSocialLink('facebook', 'https://fb.com/vendor', NOW);
    expect(p.socialLinks['facebook']).toBe('https://fb.com/vendor');
  });

  it('throws on empty platform', () => {
    const p = makeProfile();
    expect(() => p.addSocialLink('', 'https://fb.com/x', NOW)).toThrow();
  });

  it('throws on empty url', () => {
    const p = makeProfile();
    expect(() => p.addSocialLink('facebook', '', NOW)).toThrow();
  });
});
