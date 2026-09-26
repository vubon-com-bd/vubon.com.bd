/**
 * Map district to its division (static mapping)
 * @module shared-utils/bd/geo
 */
const DISTRICT_TO_DIVISION: Record<string, string> = {
  dhaka: 'dhaka',
  gazipur: 'dhaka',
  narayanganj: 'dhaka',
  tangail: 'dhaka',
  faridpur: 'dhaka',
  chittagong: 'chittagong',
  cox_bazar: 'chittagong',
  cumilla: 'chittagong',
  feni: 'chittagong',
  noakhali: 'chittagong',
  rajshahi: 'rajshahi',
  bogra: 'rajshahi',
  khulna: 'khulna',
  jessore: 'khulna',
  kushtia: 'khulna',
  sylhet: 'sylhet',
  barishal: 'barishal',
  rangpur: 'rangpur',
  mymensingh: 'mymensingh',
};

export function getDivisionByDistrict(district: string): string | null {
  if (typeof district !== 'string') return null;
  return DISTRICT_TO_DIVISION[district.toLowerCase()] ?? null;
}
