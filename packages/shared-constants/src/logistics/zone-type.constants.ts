/**
 * জোনের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * জোন টাইপ
 */
export const ZONE_TYPES = {
  URBAN: 'urban',
  SUBURBAN: 'suburban',
  RURAL: 'rural',
  REMOTE: 'remote',
  INDUSTRIAL: 'industrial',
  COMMERCIAL: 'commercial',
  RESIDENTIAL: 'residential',
} as const;

/**
 * জোন টাইপ টাইপ
 */
export type ZoneType = (typeof ZONE_TYPES)[keyof typeof ZONE_TYPES];

/**
 * জোন টাইপের বিবরণ
 */
export const ZONE_TYPE_DESCRIPTIONS: Record<ZoneType, string> = {
  [ZONE_TYPES.URBAN]: 'শহর - ঘনবসতিপূর্ণ শহর এলাকা',
  [ZONE_TYPES.SUBURBAN]: 'উপনগর - শহরের উপকণ্ঠ এলাকা',
  [ZONE_TYPES.RURAL]: 'গ্রাম - গ্রামীণ এলাকা',
  [ZONE_TYPES.REMOTE]: 'দূরবর্তী - প্রত্যন্ত এলাকা',
  [ZONE_TYPES.INDUSTRIAL]: 'শিল্প - শিল্প এলাকা',
  [ZONE_TYPES.COMMERCIAL]: 'বাণিজ্যিক - বাণিজ্যিক এলাকা',
  [ZONE_TYPES.RESIDENTIAL]: 'আবাসিক - আবাসিক এলাকা',
};

/**
 * জোন টাইপের রং (UI এর জন্য)
 */
export const ZONE_TYPE_COLORS: Record<ZoneType, string> = {
  [ZONE_TYPES.URBAN]: '#E74C3C', // লাল
  [ZONE_TYPES.SUBURBAN]: '#F39C12', // কমলা
  [ZONE_TYPES.RURAL]: '#2ECC71', // সবুজ
  [ZONE_TYPES.REMOTE]: '#95A5A6', // ধূসর
  [ZONE_TYPES.INDUSTRIAL]: '#3498DB', // নীল
  [ZONE_TYPES.COMMERCIAL]: '#9B59B6', // বেগুনি
  [ZONE_TYPES.RESIDENTIAL]: '#1ABC9C', // টিল
};

/**
 * জোন টাইপের আইকন (UI এর জন্য)
 */
export const ZONE_TYPE_ICONS: Record<ZoneType, string> = {
  [ZONE_TYPES.URBAN]: 'city',
  [ZONE_TYPES.SUBURBAN]: 'home',
  [ZONE_TYPES.RURAL]: 'tree',
  [ZONE_TYPES.REMOTE]: 'mountain',
  [ZONE_TYPES.INDUSTRIAL]: 'factory',
  [ZONE_TYPES.COMMERCIAL]: 'shopping-bag',
  [ZONE_TYPES.RESIDENTIAL]: 'building',
};

/**
 * জোন টাইপের ডেলিভারি সময় (ঘন্টায়)
 */
export const ZONE_TYPE_DELIVERY_HOURS: Record<ZoneType, number> = {
  [ZONE_TYPES.URBAN]: 24,
  [ZONE_TYPES.SUBURBAN]: 36,
  [ZONE_TYPES.RURAL]: 48,
  [ZONE_TYPES.REMOTE]: 72,
  [ZONE_TYPES.INDUSTRIAL]: 36,
  [ZONE_TYPES.COMMERCIAL]: 24,
  [ZONE_TYPES.RESIDENTIAL]: 48,
};

/**
 * জোন টাইপের ডেলিভারি চার্জ (বেস চার্জের উপর)
 */
export const ZONE_TYPE_DELIVERY_CHARGE: Record<ZoneType, number> = {
  [ZONE_TYPES.URBAN]: 0,
  [ZONE_TYPES.SUBURBAN]: 20,
  [ZONE_TYPES.RURAL]: 40,
  [ZONE_TYPES.REMOTE]: 80,
  [ZONE_TYPES.INDUSTRIAL]: 20,
  [ZONE_TYPES.COMMERCIAL]: 0,
  [ZONE_TYPES.RESIDENTIAL]: 30,
};

/**
 * জোন টাইপের জনসংখ্যার ঘনত্ব (প্রতি বর্গকিমি)
 */
export const ZONE_TYPE_POPULATION_DENSITY: Record<ZoneType, number> = {
  [ZONE_TYPES.URBAN]: 5000,
  [ZONE_TYPES.SUBURBAN]: 2000,
  [ZONE_TYPES.RURAL]: 500,
  [ZONE_TYPES.REMOTE]: 100,
  [ZONE_TYPES.INDUSTRIAL]: 1000,
  [ZONE_TYPES.COMMERCIAL]: 3000,
  [ZONE_TYPES.RESIDENTIAL]: 4000,
};

/**
 * জোন টাইপ গ্রুপ
 */
export const ZONE_TYPE_GROUPS = {
  ALL: Object.values(ZONE_TYPES),
  URBAN_CORE: [ZONE_TYPES.URBAN, ZONE_TYPES.SUBURBAN] as const,
  RURAL_AREA: [ZONE_TYPES.RURAL, ZONE_TYPES.REMOTE] as const,
  FUNCTIONAL: [ZONE_TYPES.INDUSTRIAL, ZONE_TYPES.COMMERCIAL, ZONE_TYPES.RESIDENTIAL] as const,
} as const;

/**
 * জোন টাইপ গ্রুপ টাইপ
 */
export type ZoneTypeGroup = typeof ZONE_TYPE_GROUPS;

/**
 * জোন টাইপ কনফিগারেশন
 */
export const ZONE_TYPE_CONFIG = {
  TYPES: ZONE_TYPES,
  DESCRIPTIONS: ZONE_TYPE_DESCRIPTIONS,
  COLORS: ZONE_TYPE_COLORS,
  ICONS: ZONE_TYPE_ICONS,
  DELIVERY_HOURS: ZONE_TYPE_DELIVERY_HOURS,
  DELIVERY_CHARGE: ZONE_TYPE_DELIVERY_CHARGE,
  POPULATION_DENSITY: ZONE_TYPE_POPULATION_DENSITY,
  GROUPS: ZONE_TYPE_GROUPS,
} as const;

/**
 * জোন টাইপ কনফিগারেশন টাইপ
 */
export type ZoneTypeConfig = typeof ZONE_TYPE_CONFIG;

/**
 * চেক করে যে জোন টাইপ আরবান কোর কিনা
 */
export function isUrbanCoreZoneType(type: ZoneType): boolean {
  return (ZONE_TYPE_GROUPS.URBAN_CORE as readonly ZoneType[]).includes(type);
}

/**
 * চেক করে যে জোন টাইপ রুরাল এরিয়া কিনা
 */
export function isRuralAreaZoneType(type: ZoneType): boolean {
  return (ZONE_TYPE_GROUPS.RURAL_AREA as readonly ZoneType[]).includes(type);
}

/**
 * চেক করে যে জোন টাইপ ফাংশনাল কিনা
 */
export function isFunctionalZoneType(type: ZoneType): boolean {
  return (ZONE_TYPE_GROUPS.FUNCTIONAL as readonly ZoneType[]).includes(type);
}

/**
 * জোন টাইপের বিবরণ পাওয়া
 */
export function getZoneTypeDescription(type: ZoneType): string {
  return ZONE_TYPE_DESCRIPTIONS[type];
}

/**
 * জোন টাইপের ডেলিভারি সময় পাওয়া
 */
export function getZoneTypeDeliveryHours(type: ZoneType): number {
  return ZONE_TYPE_DELIVERY_HOURS[type];
}

/**
 * জোন টাইপের ডেলিভারি চার্জ পাওয়া
 */
export function getZoneTypeDeliveryCharge(type: ZoneType): number {
  return ZONE_TYPE_DELIVERY_CHARGE[type];
}

/**
 * জোন টাইপের জনসংখ্যার ঘনত্ব পাওয়া
 */
export function getZoneTypePopulationDensity(type: ZoneType): number {
  return ZONE_TYPE_POPULATION_DENSITY[type];
}

/**
 * জোন টাইপের জন্য ডেলিভারি চার্জ গণনা করুন
 */
export function calculateZoneTypeDeliveryCost(type: ZoneType, baseCost: number): number {
  const extraCharge = ZONE_TYPE_DELIVERY_CHARGE[type];
  return baseCost + extraCharge;
}
