/**
 * Zone Response DTOs
 * @module logistics-service/application/dtos/responses/zone
 */
import type { ZoneTypeValue, ZonePricingTypeValue, ZoneStatusValue } from '@vubon/shared-types/logistics';

export interface ZoneResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: ZoneTypeValue;
  readonly status: ZoneStatusValue;
  readonly pricingType: ZonePricingTypeValue;
  readonly parentId?: string;
  readonly postalCodes: readonly string[];
  readonly districts: readonly string[];
  readonly divisions: readonly string[];
  readonly shippingCost: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly codEnabled: boolean;
  readonly codCharge?: number;
  readonly codMaxAmount?: number;
  readonly isRemote: boolean;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ZoneListResponseDTO {
  readonly items: readonly ZoneResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
