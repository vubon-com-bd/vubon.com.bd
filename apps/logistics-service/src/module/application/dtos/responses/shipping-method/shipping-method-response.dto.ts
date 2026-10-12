/**
 * ShippingMethod Response DTOs
 * @module logistics-service/application/dtos/responses/shipping-method
 */
import type { ShippingMethodStatusValue, ShippingRateTypeValue } from '@vubon/shared-types/logistics';

export interface ShippingMethodResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly displayName: string;
  readonly status: ShippingMethodStatusValue;
  readonly rateType: ShippingRateTypeValue;
  readonly baseCost: number;
  readonly freeAbove?: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly maxWeightKg?: number;
  readonly codEnabled: boolean;
  readonly trackingEnabled: boolean;
  readonly coverageZones: readonly string[];
  readonly couriers: readonly string[];
  readonly isDefault: boolean;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CalculateShippingResponseDTO {
  readonly baseCost: number;
  readonly weightSurcharge: number;
  readonly zoneMultiplier: number;
  readonly remoteSurcharge: number;
  readonly codCharge: number;
  readonly discount: number;
  readonly total: number;
  readonly currency: string;
  readonly isFreeShipping: boolean;
}

export interface ShippingMethodListResponseDTO {
  readonly items: readonly ShippingMethodResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
