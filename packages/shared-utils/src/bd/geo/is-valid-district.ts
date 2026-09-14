/**
 * Check if string is a valid BD district
 * @module shared-utils/bd/geo
 */
import { DISTRICT } from '@vubon/shared-constants/common';

const DISTRICT_SET = new Set(Object.values(DISTRICT).map((v) => String(v).toLowerCase()));

export function isValidDistrict(value: string): boolean {
  if (typeof value !== 'string') return false;
  return DISTRICT_SET.has(value.toLowerCase());
}
