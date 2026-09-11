import { VENDOR_WARRANTY } from '@vubon/shared-constants/src/business/vendor/vendor-warranty.constants';

export interface WarrantyInput {
  type: string;
  periodDays: number;
}

export const validateWarranty = (
  warranty: Partial<WarrantyInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!warranty.type) errors.push('Warranty type is required');
  if (warranty.type && !Object.keys(VENDOR_WARRANTY.TYPES).includes(warranty.type)) {
    errors.push('Invalid warranty type');
  }
  if (warranty.periodDays !== undefined && warranty.periodDays < 0) {
    errors.push('Warranty period cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};
