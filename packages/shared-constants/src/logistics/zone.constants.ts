/**
 * জোন সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * জোন কোডের প্রিফিক্স
 */
export const ZONE_PREFIX = 'ZON-' as const;

/**
 * জোন কোডের ফরম্যাট
 */
export const ZONE_CODE_FORMAT = {
  PREFIX: ZONE_PREFIX,
  SEPARATOR: '-',
  RANDOM_LENGTH: 6,
} as const;

/**
 * জোনের সর্বোচ্চ এলাকা (বর্গকিমি)
 */
export const MAX_ZONE_AREA_SQKM = 500;

/**
 * জোনের সর্বোচ্চ কুরিয়ার সংখ্যা
 */
export const MAX_ZONE_COURIERS = 50;

/**
 * জোনের ডেলিভারি চার্জ ফর্মুলা
 */
export const ZONE_DELIVERY_CHARGE_FORMULA = {
  BASE_CHARGE: 50,
  CHARGE_PER_KM: 10,
  CHARGE_PER_KG: 5,
  MINIMUM_CHARGE: 60,
  MAXIMUM_CHARGE: 500,
  SURCHARGE_PERCENT: 2.5,
} as const;

/**
 * জোনের ডেলিভারি চার্জ ফর্মুলা টাইপ
 */
export type ZoneDeliveryChargeFormula = typeof ZONE_DELIVERY_CHARGE_FORMULA;

/**
 * জোনের সীমান্ত নির্ধারণের পদ্ধতি
 */
export const ZONE_BOUNDARY_METHODS = {
  GEOGRAPHIC: 'geographic',
  POSTAL_CODE: 'postal_code',
  ADMINISTRATIVE: 'administrative',
  CUSTOM: 'custom',
  GPS_COORDINATES: 'gps_coordinates',
} as const;

/**
 * জোনের সীমান্ত নির্ধারণের পদ্ধতি টাইপ
 */
export type ZoneBoundaryMethod = (typeof ZONE_BOUNDARY_METHODS)[keyof typeof ZONE_BOUNDARY_METHODS];

/**
 * জোন কনফিগারেশন
 */
export const ZONE_CONFIG = {
  PREFIX: ZONE_PREFIX,
  CODE_FORMAT: ZONE_CODE_FORMAT,
  MAX_AREA: MAX_ZONE_AREA_SQKM,
  MAX_COURIERS: MAX_ZONE_COURIERS,
  DELIVERY_CHARGE: ZONE_DELIVERY_CHARGE_FORMULA,
  BOUNDARY_METHODS: ZONE_BOUNDARY_METHODS,
} as const;

/**
 * জোন কনফিগারেশন টাইপ
 */
export type ZoneConfig = typeof ZONE_CONFIG;

/**
 * জোন কোড জেনারেট করুন
 */
export function generateZoneCode(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${ZONE_PREFIX}${random}`;
}

/**
 * জোন কোড ভালিডেট করুন
 */
export function isValidZoneCode(code: string): boolean {
  return code.startsWith(ZONE_PREFIX) && code.length >= 9;
}

/**
 * জোনের এলাকা ভালিডেট করুন
 */
export function isValidZoneArea(area: number): boolean {
  return area > 0 && area <= MAX_ZONE_AREA_SQKM;
}

/**
 * জোনের কুরিয়ার সংখ্যা ভালিডেট করুন
 */
export function isValidZoneCouriers(count: number): boolean {
  return count > 0 && count <= MAX_ZONE_COURIERS;
}

/**
 * জোনের ডেলিভারি চার্জ গণনা করুন
 */
export function calculateZoneDeliveryCharge(
  distance: number,
  weight: number,
  isExpress: boolean = false
): number {
  const formula = ZONE_DELIVERY_CHARGE_FORMULA;
  let charge =
    formula.BASE_CHARGE + distance * formula.CHARGE_PER_KM + weight * formula.CHARGE_PER_KG;

  if (isExpress) {
    charge *= 1.3;
  }

  const surcharge = charge * (formula.SURCHARGE_PERCENT / 100);
  charge += surcharge;

  return Math.max(charge, formula.MINIMUM_CHARGE);
}

/**
 * জোনের ডেলিভারি চার্জ ভালিডেট করুন
 */
export function isValidZoneDeliveryCharge(charge: number): boolean {
  return (
    charge >= ZONE_DELIVERY_CHARGE_FORMULA.MINIMUM_CHARGE &&
    charge <= ZONE_DELIVERY_CHARGE_FORMULA.MAXIMUM_CHARGE
  );
}

/**
 * জোনের সীমান্ত নির্ধারণের পদ্ধতির বিবরণ পাওয়া
 */
export function getZoneBoundaryMethodDescription(method: ZoneBoundaryMethod): string {
  const descriptions: Record<ZoneBoundaryMethod, string> = {
    [ZONE_BOUNDARY_METHODS.GEOGRAPHIC]: 'ভৌগোলিক - মানচিত্র ভিত্তিক সীমানা নির্ধারণ',
    [ZONE_BOUNDARY_METHODS.POSTAL_CODE]: 'পোস্টাল কোড - পোস্ট কোড ভিত্তিক সীমানা নির্ধারণ',
    [ZONE_BOUNDARY_METHODS.ADMINISTRATIVE]: 'প্রশাসনিক - প্রশাসনিক সীমানা ভিত্তিক',
    [ZONE_BOUNDARY_METHODS.CUSTOM]: 'কাস্টম - নিজস্ব সংজ্ঞায়িত সীমানা',
    [ZONE_BOUNDARY_METHODS.GPS_COORDINATES]: 'জিপিএস - জিপিএস স্থানাংক ভিত্তিক',
  };
  return descriptions[method];
}

/**
 * জোনের ডেলিভারি চার্জ ফর্মুলার বিবরণ পাওয়া
 */
export function getZoneDeliveryChargeFormulaDescription(): string {
  const formula = ZONE_DELIVERY_CHARGE_FORMULA;
  return `বেস চার্জ: ${formula.BASE_CHARGE} টাকা + প্রতি কিমি: ${formula.CHARGE_PER_KM} টাকা + প্রতি কেজি: ${formula.CHARGE_PER_KG} টাকা`;
}
