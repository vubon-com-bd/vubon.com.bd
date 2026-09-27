/**
 * Map district to its division
 * @module shared-utils/bd/geo
 *
 * Uses the canonical DISTRICTS_BY_DIVISION mapping from
 * @vubon/shared-constants (all 64 districts).
 */
import { DISTRICTS_BY_DIVISION } from '@vubon/shared-constants/common';

// Build reverse index once at module load
const DISTRICT_TO_DIVISION: Readonly<Record<string, string>> = (() => {
  const map: Record<string, string> = {};
  for (const [division, districts] of Object.entries(
    DISTRICTS_BY_DIVISION as Record<string, readonly string[]>,
  )) {
    for (const district of districts) {
      map[district.toLowerCase()] = division;
    }
  }
  return Object.freeze(map);
})();

export function getDivisionByDistrict(district: string): string | null {
  if (typeof district !== 'string') return null;
  return DISTRICT_TO_DIVISION[district.toLowerCase()] ?? null;
}
