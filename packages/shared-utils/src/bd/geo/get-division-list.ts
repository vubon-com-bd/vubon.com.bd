/**
 * Get list of all Bangladeshi divisions
 * @module shared-utils/bd/geo
 */
import { DIVISION_META } from '@vubon/shared-constants/common';

export interface DivisionInfo {
  readonly code: string;
  readonly name: string;
  readonly nameBn: string;
}

export function getDivisionList(): readonly DivisionInfo[] {
  return Object.entries(DIVISION_META).map(([code, meta]) => ({
    code,
    name: (meta as { name: string }).name,
    nameBn: (meta as { nameBn: string }).nameBn,
  }));
}
