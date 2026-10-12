/**
 * ShippingMethod Request DTOs
 * @module logistics-service/application/dtos/requests/shipping-method
 */
import type { ShippingMethodValue, ShippingMethodStatusValue, ShippingRateTypeValue } from '@vubon/shared-types/logistics';

export interface CreateShippingMethodRequestDTO {
  readonly name: string;
  readonly code: ShippingMethodValue | string;
  readonly displayName: string;
  readonly rateType: ShippingRateTypeValue;
  readonly baseCost: number;
  readonly freeAbove?: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly maxWeightKg?: number;
  readonly maxDimensionsCm?: number;
  readonly codEnabled: boolean;
  readonly trackingEnabled: boolean;
  readonly coverageZones?: readonly string[];
  readonly couriers?: readonly string[];
  readonly isDefault?: boolean;
}

export interface UpdateShippingMethodRequestDTO {
  readonly methodId: string;
  readonly displayName?: string;
  readonly baseCost?: number;
  readonly currency?: string;
  readonly minDeliveryDays?: number;
  readonly maxDeliveryDays?: number;
  readonly codEnabled?: boolean;
}

export interface ActivateShippingMethodRequestDTO { readonly methodId: string; }
export interface DeactivateShippingMethodRequestDTO { readonly methodId: string; readonly reason?: string; }
export interface SuspendShippingMethodRequestDTO { readonly methodId: string; readonly reason: string; }
export interface CalculateShippingRequestDTO {
  readonly methodId: string;
  readonly orderValue: number;
  readonly weightKg: number;
}

export interface ShippingMethodListFilterDTO {
  readonly status?: ShippingMethodStatusValue;
  readonly code?: string;
  readonly zoneId?: string;
  readonly codEnabled?: boolean;
  readonly search?: string;
}
