/**
 * প্যাকেজিং সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * প্যাকেজিং কোডের প্রিফিক্স
 */
export const PACKAGING_PREFIX = 'PKG-' as const;

/**
 * প্যাকেজিং কোডের ফরম্যাট
 */
export const PACKAGING_CODE_FORMAT = {
  PREFIX: PACKAGING_PREFIX,
  SEPARATOR: '-',
  RANDOM_LENGTH: 6,
} as const;

/**
 * ডিফল্ট প্যাকেজিং সাইজ (সেমি)
 */
export const DEFAULT_PACKAGING_SIZE = {
  LENGTH: 30,
  WIDTH: 20,
  HEIGHT: 15,
} as const;

/**
 * প্যাকেজিং উপকরণের তালিকা
 */
export const PACKAGING_MATERIALS = {
  CARDBOARD: 'cardboard',
  PLASTIC: 'plastic',
  PAPER: 'paper',
  WOOD: 'wood',
  METAL: 'metal',
  BUBBLE_WRAP: 'bubble_wrap',
  FOAM: 'foam',
  BIODEGRADABLE: 'biodegradable',
} as const;

/**
 * প্যাকেজিং উপকরণ টাইপ
 */
export type PackagingMaterial = (typeof PACKAGING_MATERIALS)[keyof typeof PACKAGING_MATERIALS];

/**
 * প্যাকেজিং উপকরণের বিবরণ
 */
export const PACKAGING_MATERIAL_DESCRIPTIONS: Record<PackagingMaterial, string> = {
  [PACKAGING_MATERIALS.CARDBOARD]: 'কার্ডবোর্ড - সাধারণ প্যাকেজিং বক্স',
  [PACKAGING_MATERIALS.PLASTIC]: 'প্লাস্টিক - প্লাস্টিকের প্যাকেজিং',
  [PACKAGING_MATERIALS.PAPER]: 'পেপার - কাগজের প্যাকেজিং',
  [PACKAGING_MATERIALS.WOOD]: 'কাঠ - কাঠের প্যাকেজিং',
  [PACKAGING_MATERIALS.METAL]: 'ধাতু - ধাতব প্যাকেজিং',
  [PACKAGING_MATERIALS.BUBBLE_WRAP]: 'বাবল র্যাপ - নিরাপদ প্যাকেজিং',
  [PACKAGING_MATERIALS.FOAM]: 'ফোম - শক নিরোধক প্যাকেজিং',
  [PACKAGING_MATERIALS.BIODEGRADABLE]: 'বায়োডিগ্রেডেবল - পরিবেশবান্ধব প্যাকেজিং',
};

/**
 * সর্বোচ্চ প্যাকেজ ওজন (কেজি)
 */
export const MAX_PACKAGE_WEIGHT_KG = 50;

/**
 * রি-সাইকেলযোগ্য প্যাকেজিং সম্পর্কিত কনস্ট্যান্ট
 */
export const RECYCLABLE_PACKAGING = {
  ENABLED: true,
  RECYCLABLE_MATERIALS: [
    PACKAGING_MATERIALS.CARDBOARD,
    PACKAGING_MATERIALS.PAPER,
    PACKAGING_MATERIALS.BIODEGRADABLE,
  ] as PackagingMaterial[],
  RECYCLING_SYMBOL: '♻️',
  RECYCLING_PROCESS_TIME_DAYS: 7,
  RECYCLING_COST_FACTOR: 0.8,
} as const;

/**
 * প্যাকেজিং কনফিগারেশন
 */
export const PACKAGING_CONFIG = {
  PREFIX: PACKAGING_PREFIX,
  CODE_FORMAT: PACKAGING_CODE_FORMAT,
  DEFAULT_SIZE: DEFAULT_PACKAGING_SIZE,
  MATERIALS: PACKAGING_MATERIALS,
  MATERIAL_DESCRIPTIONS: PACKAGING_MATERIAL_DESCRIPTIONS,
  MAX_WEIGHT: MAX_PACKAGE_WEIGHT_KG,
  RECYCLABLE: RECYCLABLE_PACKAGING,
} as const;

/**
 * প্যাকেজিং কনফিগারেশন টাইপ
 */
export type PackagingConfig = typeof PACKAGING_CONFIG;

/**
 * প্যাকেজিং কোড জেনারেট করুন
 */
export function generatePackagingCode(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${PACKAGING_PREFIX}${random}`;
}

/**
 * প্যাকেজিং কোড ভালিডেট করুন
 */
export function isValidPackagingCode(code: string): boolean {
  return code.startsWith(PACKAGING_PREFIX) && code.length >= 9;
}

/**
 * প্যাকেজিং উপকরণ ভালিডেট করুন
 */
export function isValidPackagingMaterial(material: string): material is PackagingMaterial {
  return Object.values(PACKAGING_MATERIALS).includes(material as PackagingMaterial);
}

/**
 * প্যাকেজিং সাইজ ভালিডেট করুন
 */
export function isValidPackagingSize(length: number, width: number, height: number): boolean {
  return length > 0 && width > 0 && height > 0 && length <= 100 && width <= 100 && height <= 100;
}

/**
 * প্যাকেজ ওজন ভালিডেট করুন
 */
export function isValidPackageWeight(weight: number): boolean {
  return weight > 0 && weight <= MAX_PACKAGE_WEIGHT_KG;
}

/**
 * প্যাকেজিং ভলিউম গণনা করুন
 */
export function calculatePackagingVolume(length: number, width: number, height: number): number {
  return length * width * height;
}

/**
 * প্যাকেজিং উপকরণের বিবরণ পাওয়া
 */
export function getPackagingMaterialDescription(material: PackagingMaterial): string {
  return PACKAGING_MATERIAL_DESCRIPTIONS[material];
}

/**
 * প্যাকেজিং রি-সাইকেলযোগ্য কিনা চেক করুন
 */
export function isPackagingRecyclable(material: PackagingMaterial): boolean {
  return (RECYCLABLE_PACKAGING.RECYCLABLE_MATERIALS as PackagingMaterial[]).includes(material);
}

/**
 * প্যাকেজিং খরচ গণনা করুন
 */
export function calculatePackagingCost(
  material: PackagingMaterial,
  weight: number,
  volume: number
): number {
  let baseCost = 10;

  if (material === PACKAGING_MATERIALS.CARDBOARD) baseCost = 15;
  else if (material === PACKAGING_MATERIALS.PLASTIC) baseCost = 20;
  else if (material === PACKAGING_MATERIALS.PAPER) baseCost = 10;
  else if (material === PACKAGING_MATERIALS.WOOD) baseCost = 30;
  else if (material === PACKAGING_MATERIALS.METAL) baseCost = 40;
  else if (material === PACKAGING_MATERIALS.BUBBLE_WRAP) baseCost = 25;
  else if (material === PACKAGING_MATERIALS.FOAM) baseCost = 20;
  else if (material === PACKAGING_MATERIALS.BIODEGRADABLE) baseCost = 35;

  const weightFactor = weight / 10;
  const volumeFactor = volume / 1000;

  let cost = baseCost + weightFactor * 5 + volumeFactor * 2;

  // রি-সাইকেলযোগ্য প্যাকেজিংয়ের জন্য ডিসকাউন্ট
  if (isPackagingRecyclable(material)) {
    cost *= RECYCLABLE_PACKAGING.RECYCLING_COST_FACTOR;
  }

  return Math.round(cost * 100) / 100;
}
