/**
 * Zone Request DTOs
 * @module logistics-service/application/dtos/requests/zone
 */
import type { ZoneTypeValue, ZonePricingTypeValue, ZoneStatusValue } from '@vubon/shared-types/logistics';

export interface CreateZoneRequestDTO {
  readonly name: string;
  readonly code: string;
  readonly type: ZoneTypeValue;
  readonly pricingType: ZonePricingTypeValue;
  readonly parentId?: string;
  readonly postalCodes?: readonly string[];
  readonly districts?: readonly string[];
  readonly divisions?: readonly string[];
  readonly shippingCost: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly codEnabled: boolean;
  readonly codCharge?: number;
  readonly codMaxAmount?: number;
  readonly isRemote?: boolean;
}

export interface UpdateZoneRequestDTO {
  readonly zoneId: string;
  readonly name?: string;
  readonly shippingCost?: number;
  readonly currency?: string;
  readonly minDeliveryDays?: number;
  readonly maxDeliveryDays?: number;
}

export interface ActivateZoneRequestDTO { readonly zoneId: string; }
export interface InactivateZoneRequestDTO { readonly zoneId: string; readonly reason?: string; }
export interface SuspendZoneRequestDTO { readonly zoneId: string; readonly reason: string; }

export interface ZoneListFilterDTO {
  readonly status?: ZoneStatusValue;
  readonly type?: ZoneTypeValue;
  readonly parentId?: string;
  readonly isRemote?: boolean;
  readonly search?: string;
}
