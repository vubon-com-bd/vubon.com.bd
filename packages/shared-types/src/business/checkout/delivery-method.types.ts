import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { DELIVERY_METHOD } from '@vubon/shared-constants/src/business/checkout/delivery-method.constants';
import { Checkout } from './checkout.types';

export interface DeliveryMethod extends BaseEntity {
  deliveryId: string;
  checkoutId: string;
  checkout: Checkout;
  type: keyof typeof DELIVERY_METHOD.TYPES | string;
  name: string;
  description?: string;
  cost: Money;
  estimatedDays: number;
  estimatedDelivery: Date;
  isAvailable: boolean;
  isSelected: boolean;
  trackingNumber?: string;
  metadata: Record<string, unknown>;
}
