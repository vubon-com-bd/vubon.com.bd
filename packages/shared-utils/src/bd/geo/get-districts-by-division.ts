/**
 * Get districts for a division (static mapping)
 * @module shared-utils/bd/geo
 */
const DIVISION_TO_DISTRICTS: Record<string, readonly string[]> = {
  dhaka: ['dhaka', 'gazipur', 'narayanganj', 'tangail', 'faridpur'],
  chittagong: ['chittagong', 'cox_bazar', 'cumilla', 'feni', 'noakhali'],
  rajshahi: ['rajshahi', 'bogra'],
  khulna: ['khulna', 'jessore', 'kushtia'],
  sylhet: ['sylhet'],
  barishal: ['barishal'],
  rangpur: ['rangpur'],
  mymensingh: ['mymensingh'],
};

export function getDistrictsByDivision(division: string): readonly string[] {
  if (typeof division !== 'string') return [];
  return DIVISION_TO_DISTRICTS[division.toLowerCase()] ?? [];
}
