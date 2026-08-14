/**
 * কন্টেন্ট লাইসেন্স সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * লাইসেন্সের ধরনসমূহ
 */
export const LICENSE_TYPES = [
  'all-rights-reserved',
  'cc-by',
  'cc-by-sa',
  'cc-by-nd',
  'cc-by-nc',
  'cc-by-nc-sa',
  'cc-by-nc-nd',
  'public-domain',
] as const;

/**
 * লাইসেন্সের URLসমূহ
 */
export const LICENSE_URLS = {
  'all-rights-reserved': 'https://www.example.com/all-rights-reserved',
  'cc-by': 'https://creativecommons.org/licenses/by/4.0/',
  'cc-by-sa': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'cc-by-nd': 'https://creativecommons.org/licenses/by-nd/4.0/',
  'cc-by-nc': 'https://creativecommons.org/licenses/by-nc/4.0/',
  'cc-by-nc-sa': 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  'cc-by-nc-nd': 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  'public-domain': 'https://creativecommons.org/publicdomain/zero/1.0/',
} as const satisfies Record<(typeof LICENSE_TYPES)[number], string>;

/**
 * ডিফল্ট লাইসেন্স
 */
export const DEFAULT_LICENSE = 'all-rights-reserved' as const;

/**
 * লাইসেন্সের লেবেল (বাংলা এবং ইংরেজি)
 */
export const LICENSE_LABELS = {
  'all-rights-reserved': {
    en: 'All Rights Reserved',
    bn: 'সব অধিকার সংরক্ষিত',
  },
  'cc-by': {
    en: 'CC BY (Attribution)',
    bn: 'সিসি বাই (অ্যাট্রিবিউশন)',
  },
  'cc-by-sa': {
    en: 'CC BY-SA (Attribution-ShareAlike)',
    bn: 'সিসি বাই-এসএ (অ্যাট্রিবিউশন-শেয়ারঅ্যালাইক)',
  },
  'cc-by-nd': {
    en: 'CC BY-ND (Attribution-NoDerivs)',
    bn: 'সিসি বাই-এনডি (অ্যাট্রিবিউশন-নো ডেরিভস)',
  },
  'cc-by-nc': {
    en: 'CC BY-NC (Attribution-NonCommercial)',
    bn: 'সিসি বাই-এনসি (অ্যাট্রিবিউশন-অনকমার্শিয়াল)',
  },
  'cc-by-nc-sa': {
    en: 'CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)',
    bn: 'সিসি বাই-এনসি-এসএ (অ্যাট্রিবিউশন-অনকমার্শিয়াল-শেয়ারঅ্যালাইক)',
  },
  'cc-by-nc-nd': {
    en: 'CC BY-NC-ND (Attribution-NonCommercial-NoDerivs)',
    bn: 'সিসি বাই-এনসি-এনডি (অ্যাট্রিবিউশন-অনকমার্শিয়াল-নো ডেরিভস)',
  },
  'public-domain': {
    en: 'Public Domain',
    bn: 'পাবলিক ডোমেইন',
  },
} as const satisfies Record<(typeof LICENSE_TYPES)[number], { en: string; bn: string }>;

/**
 * লাইসেন্সের সংক্ষিপ্ত বিবরণ
 */
export const LICENSE_DESCRIPTIONS = {
  'all-rights-reserved': {
    en: 'All rights reserved. No usage without permission.',
    bn: 'সব অধিকার সংরক্ষিত। অনুমতি ছাড়া ব্যবহার করা যাবে না।',
  },
  'cc-by': {
    en: 'Free to share and adapt with attribution.',
    bn: 'অ্যাট্রিবিউশন সহ শেয়ার এবং অভিযোজন মুক্ত।',
  },
  'cc-by-sa': {
    en: 'Free to share and adapt with attribution and share alike.',
    bn: 'অ্যাট্রিবিউশন এবং শেয়ারঅ্যালাইক সহ শেয়ার এবং অভিযোজন মুক্ত।',
  },
  'cc-by-nd': {
    en: 'Free to share with attribution, but no derivatives.',
    bn: 'অ্যাট্রিবিউশন সহ শেয়ার মুক্ত, কিন্তু ডেরিভেটিভস নয়।',
  },
  'cc-by-nc': {
    en: 'Free to share and adapt with attribution, non-commercial only.',
    bn: 'অ্যাট্রিবিউশন সহ শেয়ার এবং অভিযোজন মুক্ত, শুধুমাত্র অনকমার্শিয়াল।',
  },
  'cc-by-nc-sa': {
    en: 'Free to share and adapt with attribution, non-commercial, share alike.',
    bn: 'অ্যাট্রিবিউশন সহ শেয়ার এবং অভিযোজন মুক্ত, অনকমার্শিয়াল, শেয়ারঅ্যালাইক।',
  },
  'cc-by-nc-nd': {
    en: 'Free to share with attribution, non-commercial, no derivatives.',
    bn: 'অ্যাট্রিবিউশন সহ শেয়ার মুক্ত, অনকমার্শিয়াল, ডেরিভেটিভস নয়।',
  },
  'public-domain': {
    en: 'Free to use for any purpose without restrictions.',
    bn: 'কোনো বিধিনিষেধ ছাড়া যেকোনো উদ্দেশ্যে ব্যবহার মুক্ত।',
  },
} as const satisfies Record<(typeof LICENSE_TYPES)[number], { en: string; bn: string }>;

/**
 * লাইসেন্স টাইপ
 */
export type LicenseType = (typeof LICENSE_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * লাইসেন্স বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLicense(license: string): license is LicenseType {
  return LICENSE_TYPES.includes(license as LicenseType);
}

/**
 * লাইসেন্সের URL পাওয়ার ফাংশন
 */
export function getLicenseUrl(license: LicenseType): string {
  return LICENSE_URLS[license];
}

/**
 * লাইসেন্সের লেবেল পাওয়ার ফাংশন
 */
export function getLicenseLabel(license: LicenseType, lang: Language = 'en'): string {
  return LICENSE_LABELS[license][lang];
}

/**
 * লাইসেন্সের বিবরণ পাওয়ার ফাংশন
 */
export function getLicenseDescription(license: LicenseType, lang: Language = 'en'): string {
  return LICENSE_DESCRIPTIONS[license][lang];
}

/**
 * সব লাইসেন্সের তালিকা পাওয়ার ফাংশন
 */
export function getAllLicenses(): readonly LicenseType[] {
  return LICENSE_TYPES;
}

/**
 * ডিফল্ট লাইসেন্স পাওয়ার ফাংশন
 */
export function getDefaultLicense(): LicenseType {
  return DEFAULT_LICENSE;
}

/**
 * লাইসেন্স কমার্শিয়াল ব্যবহার অনুমোদিত কিনা চেক করার ফাংশন
 */
export function isCommercialAllowed(license: LicenseType): boolean {
  return !license.includes('nc') && license !== 'all-rights-reserved';
}

/**
 * লাইসেন্স ডেরিভেটিভস অনুমোদিত কিনা চেক করার ফাংশন
 */
export function isDerivativesAllowed(license: LicenseType): boolean {
  return !license.includes('nd') && license !== 'all-rights-reserved';
}

/**
 * লাইসেন্স অ্যাট্রিবিউশন প্রয়োজন কিনা চেক করার ফাংশন
 */
export function isAttributionRequired(license: LicenseType): boolean {
  return license !== 'public-domain' && license !== 'all-rights-reserved';
}

/**
 * লাইসেন্স শেয়ারঅ্যালাইক প্রয়োজন কিনা চেক করার ফাংশন
 */
export function isShareAlikeRequired(license: LicenseType): boolean {
  return license.includes('sa');
}

/**
 * লাইসেন্স ওপেন সোর্স কিনা চেক করার ফাংশন
 */
export function isOpenLicense(license: LicenseType): boolean {
  return license !== 'all-rights-reserved' && license !== 'public-domain';
}

/**
 * লাইসেন্স ফ্রি কিনা চেক করার ফাংশন
 */
export function isFreeLicense(license: LicenseType): boolean {
  return license === 'public-domain' || license.startsWith('cc-');
}
