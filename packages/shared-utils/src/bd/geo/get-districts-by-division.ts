/**
 * Get districts for a division
 * @module shared-utils/bd/geo
 *
 * Uses the canonical DISTRICTS_BY_DIVISION mapping from
 * @vubon/shared-constants (all 64 districts).
 */
import { DISTRICTS_BY_DIVISION } from '@vubon/shared-constants/common';

export function getDistrictsByDivision(division: string): readonly string[] {
  if (typeof division !== 'string') return [];

  const key = division.toLowerCase();
  const mapping = DISTRICTS_BY_DIVISION as Record<string, readonly string[]>;

  return mapping[key] ?? [];
}
