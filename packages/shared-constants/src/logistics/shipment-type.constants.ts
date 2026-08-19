/**
 * শিপমেন্টের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * শিপমেন্ট টাইপ
 */
export const SHIPMENT_TYPES = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  OVERNIGHT: 'overnight',
  INTERNATIONAL: 'international',
  DOMESTIC: 'domestic',
  BULK: 'bulk',
  FRAGILE: 'fragile',
} as const;

/**
 * শিপমেন্ট টাইপ টাইপ
 */
export type ShipmentType = (typeof SHIPMENT_TYPES)[keyof typeof SHIPMENT_TYPES];

/**
 * শিপমেন্ট টাইপের বিবরণ
 */
export const SHIPMENT_TYPE_DESCRIPTIONS: Record<ShipmentType, string> = {
  [SHIPMENT_TYPES.STANDARD]: 'স্ট্যান্ডার্ড - সাধারণ ডেলিভারি সময়সীমা',
  [SHIPMENT_TYPES.EXPRESS]: 'এক্সপ্রেস - দ্রুত ডেলিভারি সেবা',
  [SHIPMENT_TYPES.SAME_DAY]: 'সেইম ডে - একই দিনে ডেলিভারি',
  [SHIPMENT_TYPES.OVERNIGHT]: 'ওভারনাইট - পরের দিন ডেলিভারি',
  [SHIPMENT_TYPES.INTERNATIONAL]: 'আন্তর্জাতিক - আন্তর্জাতিক শিপমেন্ট',
  [SHIPMENT_TYPES.DOMESTIC]: 'দেশীয় - দেশের ভিতরে শিপমেন্ট',
  [SHIPMENT_TYPES.BULK]: 'বাল্ক - বড় পরিমাণ পণ্য শিপমেন্ট',
  [SHIPMENT_TYPES.FRAGILE]: 'ভঙ্গুর - ভঙ্গুর পণ্য শিপমেন্ট',
};

/**
 * শিপমেন্ট টাইপের ডেলিভারি সময় (ঘন্টায়)
 */
export const SHIPMENT_TYPE_DELIVERY_HOURS: Record<ShipmentType, number> = {
  [SHIPMENT_TYPES.STANDARD]: 48,
  [SHIPMENT_TYPES.EXPRESS]: 24,
  [SHIPMENT_TYPES.SAME_DAY]: 6,
  [SHIPMENT_TYPES.OVERNIGHT]: 12,
  [SHIPMENT_TYPES.INTERNATIONAL]: 120,
  [SHIPMENT_TYPES.DOMESTIC]: 48,
  [SHIPMENT_TYPES.BULK]: 72,
  [SHIPMENT_TYPES.FRAGILE]: 48,
};

/**
 * শিপমেন্ট টাইপের অতিরিক্ত চার্জ (বেস চার্জের উপর)
 */
export const SHIPMENT_TYPE_EXTRA_CHARGE: Record<ShipmentType, number> = {
  [SHIPMENT_TYPES.STANDARD]: 0,
  [SHIPMENT_TYPES.EXPRESS]: 30,
  [SHIPMENT_TYPES.SAME_DAY]: 50,
  [SHIPMENT_TYPES.OVERNIGHT]: 40,
  [SHIPMENT_TYPES.INTERNATIONAL]: 100,
  [SHIPMENT_TYPES.DOMESTIC]: 0,
  [SHIPMENT_TYPES.BULK]: 20,
  [SHIPMENT_TYPES.FRAGILE]: 15,
};

/**
 * শিপমেন্ট টাইপের রং (UI এর জন্য)
 */
export const SHIPMENT_TYPE_COLORS: Record<ShipmentType, string> = {
  [SHIPMENT_TYPES.STANDARD]: '#3498DB', // নীল
  [SHIPMENT_TYPES.EXPRESS]: '#E74C3C', // লাল
  [SHIPMENT_TYPES.SAME_DAY]: '#F39C12', // কমলা
  [SHIPMENT_TYPES.OVERNIGHT]: '#9B59B6', // বেগুনি
  [SHIPMENT_TYPES.INTERNATIONAL]: '#1ABC9C', // টিল
  [SHIPMENT_TYPES.DOMESTIC]: '#2ECC71', // সবুজ
  [SHIPMENT_TYPES.BULK]: '#34495E', // গাঢ় নীল
  [SHIPMENT_TYPES.FRAGILE]: '#E67E22', // কমলা
};

/**
 * শিপমেন্ট টাইপের আইকন (UI এর জন্য)
 */
export const SHIPMENT_TYPE_ICONS: Record<ShipmentType, string> = {
  [SHIPMENT_TYPES.STANDARD]: 'box',
  [SHIPMENT_TYPES.EXPRESS]: 'bolt',
  [SHIPMENT_TYPES.SAME_DAY]: 'clock',
  [SHIPMENT_TYPES.OVERNIGHT]: 'moon',
  [SHIPMENT_TYPES.INTERNATIONAL]: 'globe',
  [SHIPMENT_TYPES.DOMESTIC]: 'map-marker',
  [SHIPMENT_TYPES.BULK]: 'cubes',
  [SHIPMENT_TYPES.FRAGILE]: 'glass',
};

/**
 * শিপমেন্ট টাইপের ওজন সীমা (কেজি)
 */
export const SHIPMENT_TYPE_WEIGHT_LIMITS: Record<ShipmentType, number> = {
  [SHIPMENT_TYPES.STANDARD]: 50,
  [SHIPMENT_TYPES.EXPRESS]: 30,
  [SHIPMENT_TYPES.SAME_DAY]: 20,
  [SHIPMENT_TYPES.OVERNIGHT]: 30,
  [SHIPMENT_TYPES.INTERNATIONAL]: 50,
  [SHIPMENT_TYPES.DOMESTIC]: 50,
  [SHIPMENT_TYPES.BULK]: 200,
  [SHIPMENT_TYPES.FRAGILE]: 10,
};

/**
 * শিপমেন্ট টাইপের প্রয়োজনীয় ডকুমেন্ট
 */
export const SHIPMENT_TYPE_REQUIRED_DOCUMENTS: Record<ShipmentType, readonly string[]> = {
  [SHIPMENT_TYPES.STANDARD]: ['invoice'],
  [SHIPMENT_TYPES.EXPRESS]: ['invoice', 'express_authorization'],
  [SHIPMENT_TYPES.SAME_DAY]: ['invoice', 'priority_authorization'],
  [SHIPMENT_TYPES.OVERNIGHT]: ['invoice', 'overnight_authorization'],
  [SHIPMENT_TYPES.INTERNATIONAL]: ['invoice', 'customs_declaration', 'export_license'],
  [SHIPMENT_TYPES.DOMESTIC]: ['invoice'],
  [SHIPMENT_TYPES.BULK]: ['invoice', 'bulk_authorization', 'inventory_manifest'],
  [SHIPMENT_TYPES.FRAGILE]: ['invoice', 'fragile_handling_instructions'],
};

/**
 * শিপমেন্ট টাইপের বিশেষ নির্দেশনা
 */
export const SHIPMENT_TYPE_SPECIAL_INSTRUCTIONS: Record<ShipmentType, string> = {
  [SHIPMENT_TYPES.STANDARD]: 'কোন বিশেষ নির্দেশনা নেই',
  [SHIPMENT_TYPES.EXPRESS]: 'দ্রুত ডেলিভারির জন্য অগ্রাধিকার প্রদান করুন',
  [SHIPMENT_TYPES.SAME_DAY]: 'একই দিনে ডেলিভারি নিশ্চিত করুন',
  [SHIPMENT_TYPES.OVERNIGHT]: 'পরের দিন সকালে ডেলিভারি নিশ্চিত করুন',
  [SHIPMENT_TYPES.INTERNATIONAL]: 'কাস্টমস ক্লিয়ারেন্স নিশ্চিত করুন',
  [SHIPMENT_TYPES.DOMESTIC]: 'স্থানীয় ডেলিভারি নিয়ম মেনে চলুন',
  [SHIPMENT_TYPES.BULK]: 'বাল্ক হ্যান্ডলিং সরঞ্জাম ব্যবহার করুন',
  [SHIPMENT_TYPES.FRAGILE]: 'ভঙ্গুর পণ্য হিসাবে চিহ্নিত করুন এবং সাবধানে হ্যান্ডেল করুন',
};

/**
 * শিপমেন্ট টাইপ গ্রুপ
 */
export const SHIPMENT_TYPE_GROUPS = {
  ALL: Object.values(SHIPMENT_TYPES),
  SPEED_BASED: [
    SHIPMENT_TYPES.STANDARD,
    SHIPMENT_TYPES.EXPRESS,
    SHIPMENT_TYPES.SAME_DAY,
    SHIPMENT_TYPES.OVERNIGHT,
  ] as readonly ShipmentType[],
  REGION_BASED: [SHIPMENT_TYPES.INTERNATIONAL, SHIPMENT_TYPES.DOMESTIC] as readonly ShipmentType[],
  SPECIAL: [SHIPMENT_TYPES.BULK, SHIPMENT_TYPES.FRAGILE] as readonly ShipmentType[],
} as const;

/**
 * শিপমেন্ট টাইপ গ্রুপ টাইপ
 */
export type ShipmentTypeGroup = typeof SHIPMENT_TYPE_GROUPS;

/**
 * চেক করে যে একটি টাইপ স্পিড বেসড কিনা
 */
export function isSpeedBasedType(type: ShipmentType): boolean {
  return (SHIPMENT_TYPE_GROUPS.SPEED_BASED as readonly ShipmentType[]).includes(type);
}

/**
 * চেক করে যে একটি টাইপ রিজিওন বেসড কিনা
 */
export function isRegionBasedType(type: ShipmentType): boolean {
  return (SHIPMENT_TYPE_GROUPS.REGION_BASED as readonly ShipmentType[]).includes(type);
}

/**
 * চেক করে যে একটি টাইপ স্পেশাল কিনা
 */
export function isSpecialType(type: ShipmentType): boolean {
  return (SHIPMENT_TYPE_GROUPS.SPECIAL as readonly ShipmentType[]).includes(type);
}

/**
 * একটি টাইপের ডেলিভারি সময় পাওয়া
 */
export function getDeliveryHours(type: ShipmentType): number {
  return SHIPMENT_TYPE_DELIVERY_HOURS[type];
}

/**
 * একটি টাইপের অতিরিক্ত চার্জ পাওয়া
 */
export function getExtraCharge(type: ShipmentType): number {
  return SHIPMENT_TYPE_EXTRA_CHARGE[type];
}

/**
 * একটি টাইপের ওজন সীমা পাওয়া
 */
export function getWeightLimit(type: ShipmentType): number {
  return SHIPMENT_TYPE_WEIGHT_LIMITS[type];
}

/**
 * শিপমেন্ট টাইপ কনফিগারেশন
 */
export const SHIPMENT_TYPE_CONFIG = {
  TYPES: SHIPMENT_TYPES,
  DESCRIPTIONS: SHIPMENT_TYPE_DESCRIPTIONS,
  DELIVERY_HOURS: SHIPMENT_TYPE_DELIVERY_HOURS,
  EXTRA_CHARGE: SHIPMENT_TYPE_EXTRA_CHARGE,
  COLORS: SHIPMENT_TYPE_COLORS,
  ICONS: SHIPMENT_TYPE_ICONS,
  WEIGHT_LIMITS: SHIPMENT_TYPE_WEIGHT_LIMITS,
  REQUIRED_DOCUMENTS: SHIPMENT_TYPE_REQUIRED_DOCUMENTS,
  SPECIAL_INSTRUCTIONS: SHIPMENT_TYPE_SPECIAL_INSTRUCTIONS,
  GROUPS: SHIPMENT_TYPE_GROUPS,
} as const;

/**
 * শিপমেন্ট টাইপ কনফিগারেশন টাইপ
 */
export type ShipmentTypeConfig = typeof SHIPMENT_TYPE_CONFIG;
