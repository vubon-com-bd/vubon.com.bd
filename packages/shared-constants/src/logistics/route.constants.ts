/**
 * রুট সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * রুট কোডের প্রিফিক্স
 */
export const ROUTE_PREFIX = 'RTE-' as const;

/**
 * রুট কোডের ফরম্যাট
 */
export const ROUTE_CODE_FORMAT = {
  PREFIX: ROUTE_PREFIX,
  SEPARATOR: '-',
  RANDOM_LENGTH: 6,
} as const;

/**
 * রুটের সর্বোচ্চ স্টপ সংখ্যা
 */
export const MAX_ROUTE_STOPS = 20;

/**
 * রুটের সর্বোচ্চ দূরত্ব (কিমি)
 */
export const MAX_ROUTE_DISTANCE_KM = 200;

/**
 * রুট অপ্টিমাইজেশন অ্যালগরিদমের ধরণ
 */
export const ROUTE_OPTIMIZATION_ALGORITHMS = {
  NEAREST_NEIGHBOR: 'nearest_neighbor',
  GENETIC: 'genetic',
  DYNAMIC_PROGRAMMING: 'dynamic_programming',
  GREEDY: 'greedy',
  SIMULATED_ANNEALING: 'simulated_annealing',
} as const;

/**
 * রুট অপ্টিমাইজেশন অ্যালগরিদম টাইপ
 */
export type RouteOptimizationAlgorithm =
  (typeof ROUTE_OPTIMIZATION_ALGORITHMS)[keyof typeof ROUTE_OPTIMIZATION_ALGORITHMS];

/**
 * রুটের ডিফল্ট গতি (কিমি/ঘন্টা)
 */
export const DEFAULT_ROUTE_SPEED_KMPH = 40;

/**
 * রুটের ডিফল্ট সময় অঞ্চল
 */
export const DEFAULT_ROUTE_TIMEZONE = 'Asia/Dhaka';

/**
 * রুটের সর্বোচ্চ সময় (ঘন্টা)
 */
export const MAX_ROUTE_DURATION_HOURS = 12;

/**
 * রুটের সর্বনিম্ন সময় (ঘন্টা)
 */
export const MIN_ROUTE_DURATION_HOURS = 1;

/**
 * রুট অপ্টিমাইজেশন কনফিগারেশন
 */
export const ROUTE_OPTIMIZATION_CONFIG = {
  DEFAULT_ALGORITHM: ROUTE_OPTIMIZATION_ALGORITHMS.NEAREST_NEIGHBOR,
  MAX_ITERATIONS: 1000,
  CONVERGENCE_THRESHOLD: 0.01,
  TIME_LIMIT_SECONDS: 60,
  DISTANCE_WEIGHT: 0.6,
  TIME_WEIGHT: 0.4,
} as const;

/**
 * রুট অপ্টিমাইজেশন কনফিগারেশন টাইপ
 */
export type RouteOptimizationConfig = typeof ROUTE_OPTIMIZATION_CONFIG;

/**
 * রুট কনফিগারেশন
 */
export const ROUTE_CONFIG = {
  PREFIX: ROUTE_PREFIX,
  CODE_FORMAT: ROUTE_CODE_FORMAT,
  MAX_STOPS: MAX_ROUTE_STOPS,
  MAX_DISTANCE: MAX_ROUTE_DISTANCE_KM,
  ALGORITHMS: ROUTE_OPTIMIZATION_ALGORITHMS,
  DEFAULT_SPEED: DEFAULT_ROUTE_SPEED_KMPH,
  DEFAULT_TIMEZONE: DEFAULT_ROUTE_TIMEZONE,
  MAX_DURATION: MAX_ROUTE_DURATION_HOURS,
  MIN_DURATION: MIN_ROUTE_DURATION_HOURS,
  OPTIMIZATION: ROUTE_OPTIMIZATION_CONFIG,
} as const;

/**
 * রুট কনফিগারেশন টাইপ
 */
export type RouteConfig = typeof ROUTE_CONFIG;

/**
 * রুট কোড জেনারেট করুন
 */
export function generateRouteCode(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${ROUTE_PREFIX}${random}`;
}

/**
 * রুট কোড ভালিডেট করুন
 */
export function isValidRouteCode(code: string): boolean {
  return code.startsWith(ROUTE_PREFIX) && code.length >= 9;
}

/**
 * রুটের স্টপ সংখ্যা ভালিডেট করুন
 */
export function isValidRouteStops(stops: number): boolean {
  return stops > 0 && stops <= MAX_ROUTE_STOPS;
}

/**
 * রুটের দূরত্ব ভালিডেট করুন
 */
export function isValidRouteDistance(distance: number): boolean {
  return distance > 0 && distance <= MAX_ROUTE_DISTANCE_KM;
}

/**
 * রুটের সময়কাল গণনা করুন
 */
export function calculateRouteDuration(
  distance: number,
  speed: number = DEFAULT_ROUTE_SPEED_KMPH
): number {
  if (speed <= 0) return 0;
  return distance / speed;
}

/**
 * রুটের জ্বালানি খরচ গণনা করুন
 */
export function calculateRouteFuelCost(
  distance: number,
  fuelEfficiency: number,
  fuelPrice: number
): number {
  if (fuelEfficiency <= 0) return 0;
  return (distance / fuelEfficiency) * fuelPrice;
}

/**
 * রুট অপ্টিমাইজেশন সেটিংস পাওয়া
 */
export function getRouteOptimizationSettings(): RouteOptimizationConfig {
  return ROUTE_OPTIMIZATION_CONFIG;
}

/**
 * রুট অপ্টিমাইজেশন অ্যালগরিদমের বিবরণ পাওয়া
 */
export function getRouteOptimizationAlgorithmDescription(
  algorithm: RouteOptimizationAlgorithm
): string {
  const descriptions: Record<RouteOptimizationAlgorithm, string> = {
    [ROUTE_OPTIMIZATION_ALGORITHMS.NEAREST_NEIGHBOR]:
      'নিকটতম প্রতিবেশী - দ্রুততম কিন্তু সর্বোত্তম নয়',
    [ROUTE_OPTIMIZATION_ALGORITHMS.GENETIC]: 'জেনেটিক - জটিল রুটের জন্য কার্যকর',
    [ROUTE_OPTIMIZATION_ALGORITHMS.DYNAMIC_PROGRAMMING]: 'ডায়নামিক প্রোগ্রামিং - সঠিক কিন্তু ধীর',
    [ROUTE_OPTIMIZATION_ALGORITHMS.GREEDY]: 'গ্লুটন - মাঝারি কার্যকারিতা',
    [ROUTE_OPTIMIZATION_ALGORITHMS.SIMULATED_ANNEALING]: 'সিমুলেটেড অ্যানিলিং - ভাল ফলাফলের জন্য',
  };
  return descriptions[algorithm];
}
