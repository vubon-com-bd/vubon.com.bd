import { DELIVERY_METHOD } from '@vubon/shared-constants/src/business/checkout/delivery-method.constants';

export interface DeliveryMethodInput {
  type: string;
  name: string;
  cost?: { amount: number };
}

export const validateDeliveryMethod = (
  method: Partial<DeliveryMethodInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!method.type) errors.push('Delivery method type is required');
  if (method.type && !Object.keys(DELIVERY_METHOD.TYPES).includes(method.type)) {
    errors.push('Invalid delivery method type');
  }
  if (!method.name) errors.push('Delivery method name is required');
  if (method.cost?.amount !== undefined && method.cost.amount < 0) {
    errors.push('Delivery cost cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};
