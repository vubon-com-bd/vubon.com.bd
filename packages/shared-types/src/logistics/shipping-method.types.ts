import { TypeObject } from '../common/types.types';
import { SHIPPING_METHOD } from '@vubon/shared-constants/src/logistics/shipping-method.constants';

export interface ShippingMethod extends TypeObject {
  type: keyof typeof SHIPPING_METHOD.TYPES | string;
  category: 'shipping';
  carrier: keyof typeof SHIPPING_METHOD.SHIPPING_CARRIERS | string;
  estimatedDays: number;
  cost: number;
  isEconomy: boolean;
  isStandard: boolean;
  isExpress: boolean;
  isPriority: boolean;
  isOvernight: boolean;
  isSameDay: boolean;
  isInternational: boolean;
}

export type ShippingMethodKey = keyof typeof SHIPPING_METHOD.TYPES;
