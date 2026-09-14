/**
 * Vendor Shipping Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-shipping.constants থেকে।
 */

import type {
  VENDOR_SHIPPING_METHOD,
  VENDOR_SHIPPING_ZONE,
} from '@vubon/shared-constants/business';
import type { VendorId, Money } from '../../common/primitives';

export type VendorShippingMethodValue =
  (typeof VENDOR_SHIPPING_METHOD)[keyof typeof VENDOR_SHIPPING_METHOD];

export type VendorShippingZoneValue =
  (typeof VENDOR_SHIPPING_ZONE)[keyof typeof VENDOR_SHIPPING_ZONE];

export interface VendorShipping {
  readonly id: string;
  readonly vendorId: VendorId;
  readonly method: VendorShippingMethodValue;
  readonly zone: VendorShippingZoneValue;
  readonly cost: Money;
  readonly currency: string;
  readonly freeAbove?: Money;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly isActive: boolean;
  readonly trackingRequired: boolean;
  readonly allowPickup: boolean;
  readonly allowCourier: boolean;
}

export interface VendorShippingRate {
  readonly zone: VendorShippingZoneValue;
  readonly cost: Money;
  readonly currency: string;
  readonly freeAbove?: Money;
  readonly estimatedDays: number;
}

export interface VendorShippingInput {
  readonly vendorId: VendorId;
  readonly method: VendorShippingMethodValue;
  readonly zone: VendorShippingZoneValue;
  readonly cost: number;
  readonly freeAbove?: number;
  readonly minDeliveryDays?: number;
  readonly maxDeliveryDays?: number;
}
