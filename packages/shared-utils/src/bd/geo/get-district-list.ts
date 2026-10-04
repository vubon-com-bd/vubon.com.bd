/**
 * Get districts (as list). Currently returns district constants.
 * @module shared-utils/bd/geo
 */
import { DISTRICT } from '@vubon/shared-constants/common';

export function getDistrictList(): readonly string[] {
  return Object.values(DISTRICT);
}
