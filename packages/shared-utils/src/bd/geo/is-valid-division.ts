/**
 * Check if string is a valid BD division
 * @module shared-utils/bd/geo
 */
import { DIVISION } from '@vubon/shared-constants/common';

const DIVISION_SET = new Set(Object.values(DIVISION).map((v) => String(v).toLowerCase()));

export function isValidDivision(value: string): boolean {
  if (typeof value !== 'string') return false;
  return DIVISION_SET.has(value.toLowerCase());
}
