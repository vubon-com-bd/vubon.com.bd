/**
 * Zone Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/zone.constants থেকে।
 */

import type { ZONE_STATUS, ZONE_TYPE, ZONE_PRICING_TYPE } from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';
import type { Money } from '../common/primitives';

export type ZoneStatusValue = (typeof ZONE_STATUS)[keyof typeof ZONE_STATUS];

export type ZoneTypeValue = (typeof ZONE_TYPE)[keyof typeof ZONE_TYPE];

export type ZonePricingTypeValue = (typeof ZONE_PRICING_TYPE)[keyof typeof ZONE_PRICING_TYPE];

export interface Zone extends BaseEntity<string> {
  readonly name: string;
  readonly code: string;
  readonly type: ZoneTypeValue;
  readonly status: ZoneStatusValue;
  readonly pricingType: ZonePricingTypeValue;
  readonly parentId?: string;
  readonly postalCodes?: readonly string[];
  readonly districts?: readonly string[];
  readonly divisions?: readonly string[];
  readonly shippingCost: Money;
  readonly freeAbove?: Money;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly codEnabled: boolean;
  readonly codCharge?: Money;
  readonly codMaxAmount?: Money;
  readonly isRemote: boolean;
  readonly isActive: boolean;
}

export interface ZonePublic {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: ZoneTypeValue;
  readonly shippingCost: Money;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
}

export interface ZoneListFilter {
  readonly status?: ZoneStatusValue;
  readonly type?: ZoneTypeValue;
  readonly isRemote?: boolean;
  readonly search?: string;
}
