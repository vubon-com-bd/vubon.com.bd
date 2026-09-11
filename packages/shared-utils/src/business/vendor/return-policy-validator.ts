import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants/src/business/vendor/vendor-return-policy.constants';

export interface ReturnPolicyInput {
  type: string;
  windowDays: number;
}

export const validateReturnPolicy = (
  policy: Partial<ReturnPolicyInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!policy.type) errors.push('Return policy type is required');
  if (policy.type && !Object.keys(VENDOR_RETURN_POLICY.TYPES).includes(policy.type)) {
    errors.push('Invalid return policy type');
  }
  if (policy.windowDays !== undefined && policy.windowDays < 0) {
    errors.push('Return window cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};
