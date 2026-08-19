/**
 * যানবাহনের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * যানবাহন টাইপ
 */
export const VEHICLE_TYPES = {
  BIKE: 'bike',
  SCOOTER: 'scooter',
  VAN: 'van',
  TRUCK: 'truck',
  TRAILER: 'trailer',
  REFRIGERATED: 'refrigerated',
  THREE_WHEELER: 'three_wheeler',
} as const;

/**
 * যানবাহন টাইপ টাইপ
 */
export type VehicleType = (typeof VEHICLE_TYPES)[keyof typeof VEHICLE_TYPES];

/**
 * যানবাহন টাইপের বিবরণ
 */
export const VEHICLE_TYPE_DESCRIPTIONS: Record<VehicleType, string> = {
  [VEHICLE_TYPES.BIKE]: 'বাইক - ছোট প্যাকেজ ডেলিভারির জন্য',
  [VEHICLE_TYPES.SCOOTER]: 'স্কুটার - শহুরে ডেলিভারির জন্য',
  [VEHICLE_TYPES.VAN]: 'ভ্যান - মাঝারি আকারের পণ্য পরিবহনের জন্য',
  [VEHICLE_TYPES.TRUCK]: 'ট্রাক - বড় পণ্য পরিবহনের জন্য',
  [VEHICLE_TYPES.TRAILER]: 'ট্রেইলার - ভারী পণ্য পরিবহনের জন্য',
  [VEHICLE_TYPES.REFRIGERATED]: 'রেফ্রিজারেটেড - তাপমাত্রা নিয়ন্ত্রিত পণ্য পরিবহনের জন্য',
  [VEHICLE_TYPES.THREE_WHEELER]: 'থ্রি-হুইলার - শহুরে ডেলিভারির জন্য',
};

/**
 * যানবাহন টাইপের রং (UI এর জন্য)
 */
export const VEHICLE_TYPE_COLORS: Record<VehicleType, string> = {
  [VEHICLE_TYPES.BIKE]: '#2ECC71', // সবুজ
  [VEHICLE_TYPES.SCOOTER]: '#3498DB', // নীল
  [VEHICLE_TYPES.VAN]: '#F39C12', // কমলা
  [VEHICLE_TYPES.TRUCK]: '#E74C3C', // লাল
  [VEHICLE_TYPES.TRAILER]: '#9B59B6', // বেগুনি
  [VEHICLE_TYPES.REFRIGERATED]: '#1ABC9C', // টিল
  [VEHICLE_TYPES.THREE_WHEELER]: '#E67E22', // গাঢ় কমলা
};

/**
 * যানবাহন টাইপের আইকন (UI এর জন্য)
 */
export const VEHICLE_TYPE_ICONS: Record<VehicleType, string> = {
  [VEHICLE_TYPES.BIKE]: 'motorcycle',
  [VEHICLE_TYPES.SCOOTER]: 'scooter',
  [VEHICLE_TYPES.VAN]: 'van',
  [VEHICLE_TYPES.TRUCK]: 'truck',
  [VEHICLE_TYPES.TRAILER]: 'trailer',
  [VEHICLE_TYPES.REFRIGERATED]: 'snowflake',
  [VEHICLE_TYPES.THREE_WHEELER]: 'car',
};

/**
 * যানবাহন টাইপের ক্ষমতা
 */
export const VEHICLE_TYPE_CAPACITY: Record<VehicleType, { weight: number; volume: number }> = {
  [VEHICLE_TYPES.BIKE]: { weight: 100, volume: 0.5 },
  [VEHICLE_TYPES.SCOOTER]: { weight: 80, volume: 0.4 },
  [VEHICLE_TYPES.VAN]: { weight: 1000, volume: 10 },
  [VEHICLE_TYPES.TRUCK]: { weight: 5000, volume: 50 },
  [VEHICLE_TYPES.TRAILER]: { weight: 10000, volume: 100 },
  [VEHICLE_TYPES.REFRIGERATED]: { weight: 3000, volume: 30 },
  [VEHICLE_TYPES.THREE_WHEELER]: { weight: 200, volume: 1 },
};

/**
 * যানবাহন টাইপের জ্বালানি খরচ (প্রতি কিমি)
 */
export const VEHICLE_TYPE_FUEL_COST_PER_KM: Record<VehicleType, number> = {
  [VEHICLE_TYPES.BIKE]: 1.5,
  [VEHICLE_TYPES.SCOOTER]: 1.8,
  [VEHICLE_TYPES.VAN]: 5,
  [VEHICLE_TYPES.TRUCK]: 8,
  [VEHICLE_TYPES.TRAILER]: 12,
  [VEHICLE_TYPES.REFRIGERATED]: 10,
  [VEHICLE_TYPES.THREE_WHEELER]: 2.5,
};

/**
 * যানবাহন টাইপ গ্রুপ
 */
export const VEHICLE_TYPE_GROUPS = {
  ALL: Object.values(VEHICLE_TYPES),
  TWO_WHEELER: [VEHICLE_TYPES.BIKE, VEHICLE_TYPES.SCOOTER] as const,
  FOUR_WHEELER: [VEHICLE_TYPES.VAN, VEHICLE_TYPES.TRUCK, VEHICLE_TYPES.REFRIGERATED] as const,
  HEAVY: [VEHICLE_TYPES.TRAILER] as const,
  SPECIAL: [VEHICLE_TYPES.THREE_WHEELER] as const,
} as const;

/**
 * যানবাহন টাইপ গ্রুপ টাইপ
 */
export type VehicleTypeGroup = typeof VEHICLE_TYPE_GROUPS;

/**
 * যানবাহন টাইপ কনফিগারেশন
 */
export const VEHICLE_TYPE_CONFIG = {
  TYPES: VEHICLE_TYPES,
  DESCRIPTIONS: VEHICLE_TYPE_DESCRIPTIONS,
  COLORS: VEHICLE_TYPE_COLORS,
  ICONS: VEHICLE_TYPE_ICONS,
  CAPACITY: VEHICLE_TYPE_CAPACITY,
  FUEL_COST: VEHICLE_TYPE_FUEL_COST_PER_KM,
  GROUPS: VEHICLE_TYPE_GROUPS,
} as const;

/**
 * যানবাহন টাইপ কনফিগারেশন টাইপ
 */
export type VehicleTypeConfig = typeof VEHICLE_TYPE_CONFIG;

/**
 * চেক করে যে যানবাহন টাইপ টু-হুইলার কিনা
 */
export function isTwoWheelerVehicleType(type: VehicleType): boolean {
  return (VEHICLE_TYPE_GROUPS.TWO_WHEELER as readonly VehicleType[]).includes(type);
}

/**
 * চেক করে যে যানবাহন টাইপ ফোর-হুইলার কিনা
 */
export function isFourWheelerVehicleType(type: VehicleType): boolean {
  return (VEHICLE_TYPE_GROUPS.FOUR_WHEELER as readonly VehicleType[]).includes(type);
}

/**
 * চেক করে যে যানবাহন টাইপ হেভি কিনা
 */
export function isHeavyVehicleType(type: VehicleType): boolean {
  return (VEHICLE_TYPE_GROUPS.HEAVY as readonly VehicleType[]).includes(type);
}

/**
 * যানবাহন টাইপের বিবরণ পাওয়া
 */
export function getVehicleTypeDescription(type: VehicleType): string {
  return VEHICLE_TYPE_DESCRIPTIONS[type];
}

/**
 * যানবাহন টাইপের ক্ষমতা পাওয়া
 */
export function getVehicleTypeCapacity(type: VehicleType): { weight: number; volume: number } {
  return VEHICLE_TYPE_CAPACITY[type];
}

/**
 * যানবাহন টাইপের জ্বালানি খরচ পাওয়া
 */
export function getVehicleTypeFuelCost(type: VehicleType): number {
  return VEHICLE_TYPE_FUEL_COST_PER_KM[type];
}

/**
 * যানবাহন টাইপের সর্বোচ্চ ওজন ক্ষমতা পাওয়া
 */
export function getVehicleTypeMaxWeight(type: VehicleType): number {
  return VEHICLE_TYPE_CAPACITY[type].weight;
}

/**
 * যানবাহন টাইপের সর্বোচ্চ আয়তন ক্ষমতা পাওয়া
 */
export function getVehicleTypeMaxVolume(type: VehicleType): number {
  return VEHICLE_TYPE_CAPACITY[type].volume;
}
