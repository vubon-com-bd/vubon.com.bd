/**
 * Get upazila list (partial — actual data would come from a dedicated dataset)
 * @module shared-utils/bd/geo
 */
import { UPAZILA } from '@vubon/shared-constants/common';

export function getUpazilaList(): readonly string[] {
  return Object.values(UPAZILA);
}
