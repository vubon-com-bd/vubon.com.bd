/**
 * যানবাহন সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * যানবাহন নম্বরের প্রিফিক্স
 */
export const VEHICLE_PREFIX = 'VEH-' as const;

/**
 * যানবাহন নম্বরের ফরম্যাট
 */
export const VEHICLE_NUMBER_FORMAT = {
  PREFIX: VEHICLE_PREFIX,
  SEPARATOR: '-',
  RANDOM_LENGTH: 6,
} as const;

/**
 * যানবাহনের সর্বোচ্চ গতি (কিমি/ঘন্টা)
 */
export const MAX_VEHICLE_SPEED_KMPH = 120;

/**
 * যানবাহনের জ্বালানি দক্ষতা (কিমি/লিটার)
 */
export const VEHICLE_FUEL_EFFICIENCY = {
  BIKE: 45,
  SCOOTER: 40,
  VAN: 15,
  TRUCK: 8,
  TRAILER: 5,
  REFRIGERATED: 6,
  THREE_WHEELER: 25,
} as const;

/**
 * যানবাহনের সর্বোচ্চ ভারবহন ক্ষমতা (কেজি)
 */
export const MAX_VEHICLE_LOAD_CAPACITY = {
  BIKE: 100,
  SCOOTER: 80,
  VAN: 1000,
  TRUCK: 5000,
  TRAILER: 10000,
  REFRIGERATED: 3000,
  THREE_WHEELER: 200,
} as const;

/**
 * মেইনটেন্যান্স রিমাইন্ডারের সময়সীমা (দিন)
 */
export const MAINTENANCE_REMINDER_DAYS = 30;

/**
 * যানবাহনের সার্ভিস ইন্টারভাল (কিমি)
 */
export const VEHICLE_SERVICE_INTERVAL_KM = 5000;

/**
 * যানবাহনের তেল পরিবর্তন ইন্টারভাল (কিমি)
 */
export const VEHICLE_OIL_CHANGE_INTERVAL_KM = 10000;

/**
 * যানবাহনের টায়ার পরিবর্তন ইন্টারভাল (কিমি)
 */
export const VEHICLE_TIRE_CHANGE_INTERVAL_KM = 40000;

/**
 * যানবাহনের ডিফল্ট ইন্স্যুরেন্স কভারেজ
 */
export const DEFAULT_VEHICLE_INSURANCE = {
  COVERAGE_AMOUNT: 500000,
  PREMIUM_RATE: 0.02,
  DURATION_DAYS: 365,
} as const;

/**
 * যানবাহন কনফিগারেশন
 */
export const VEHICLE_CONFIG = {
  PREFIX: VEHICLE_PREFIX,
  NUMBER_FORMAT: VEHICLE_NUMBER_FORMAT,
  MAX_SPEED: MAX_VEHICLE_SPEED_KMPH,
  FUEL_EFFICIENCY: VEHICLE_FUEL_EFFICIENCY,
  LOAD_CAPACITY: MAX_VEHICLE_LOAD_CAPACITY,
  MAINTENANCE_REMINDER_DAYS,
  SERVICE_INTERVAL: VEHICLE_SERVICE_INTERVAL_KM,
  OIL_CHANGE_INTERVAL: VEHICLE_OIL_CHANGE_INTERVAL_KM,
  TIRE_CHANGE_INTERVAL: VEHICLE_TIRE_CHANGE_INTERVAL_KM,
  DEFAULT_INSURANCE: DEFAULT_VEHICLE_INSURANCE,
} as const;

/**
 * যানবাহন কনফিগারেশন টাইপ
 */
export type VehicleConfig = typeof VEHICLE_CONFIG;

/**
 * যানবাহন নম্বর জেনারেট করুন
 */
export function generateVehicleNumber(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${VEHICLE_PREFIX}${random}`;
}

/**
 * যানবাহন নম্বর ভালিডেট করুন
 */
export function isValidVehicleNumber(number: string): boolean {
  return number.startsWith(VEHICLE_PREFIX) && number.length >= 9;
}

/**
 * যানবাহনের জ্বালানি দক্ষতা পাওয়া
 */
export function getVehicleFuelEfficiency(vehicleType: string): number {
  return VEHICLE_FUEL_EFFICIENCY[vehicleType as keyof typeof VEHICLE_FUEL_EFFICIENCY] || 10;
}

/**
 * যানবাহনের ভারবহন ক্ষমতা পাওয়া
 */
export function getVehicleLoadCapacity(vehicleType: string): number {
  return MAX_VEHICLE_LOAD_CAPACITY[vehicleType as keyof typeof MAX_VEHICLE_LOAD_CAPACITY] || 100;
}

/**
 * যানবাহনের পরবর্তী সার্ভিস তারিখ গণনা করুন
 */
export function calculateNextServiceDate(lastServiceDate: Date): Date {
  const nextDate = new Date(lastServiceDate);
  nextDate.setDate(nextDate.getDate() + MAINTENANCE_REMINDER_DAYS);
  return nextDate;
}

/**
 * যানবাহনের সার্ভিস প্রয়োজন কিনা চেক করুন
 */
export function isVehicleServiceRequired(
  currentMileage: number,
  lastServiceMileage: number
): boolean {
  return currentMileage - lastServiceMileage >= VEHICLE_SERVICE_INTERVAL_KM;
}
