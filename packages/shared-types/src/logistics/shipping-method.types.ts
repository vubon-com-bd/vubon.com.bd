/**
 * Shipping Method Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/shipping-method.constants থেকে।
 */

import type {
  SHIPPING_METHOD,
  SHIPPING_METHOD_STATUS,
  SHIPPING_RATE_TYPE,
} from '@vubon/shared-constants/logistics';
import type { Money } from '../common/primitives';
import type { BaseEntity } from '../common/base';

export type ShippingMethodValue = (typeof SHIPPING_METHOD)[keyof typeof SHIPPING_METHOD];

export type ShippingMethodStatusValue =
  (typeof SHIPPING_METHOD_STATUS)[keyof typeof SHIPPING_METHOD_STATUS];

export type ShippingRateTypeValue = (typeof SHIPPING_RATE_TYPE)[keyof typeof SHIPPING_RATE_TYPE];

export interface ShippingMethod extends BaseEntity<string> {
  readonly name: string;
  readonly code: ShippingMethodValue | string;
  readonly displayName: string;
  readonly status: ShippingMethodStatusValue;
  readonly rateType: ShippingRateTypeValue;
  readonly baseCost: Money;
  readonly freeAbove?: Money;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly maxWeightKg?: number;
  readonly maxDimensionsCm?: number;
  readonly codEnabled: boolean;
  readonly trackingEnabled: boolean;
  readonly coverageZones?: readonly string[];
  readonly couriers?: readonly string[];
  readonly isDefault: boolean;
  readonly isActive: boolean;
}

export interface ShippingMethodPublic {
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly rateType: ShippingRateTypeValue;
  readonly baseCost: Money;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly codEnabled: boolean;
}
