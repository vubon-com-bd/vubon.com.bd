import type { ZoneTypeValue } from '@domain/primitives/zone-type.vo';
import type { ZonePricingTypeValue } from '@domain/primitives/zone-pricing-type.vo';

export interface CreateZoneRequestDTO {
  readonly code: string;
  readonly name: string;
  readonly type: ZoneTypeValue;
  readonly pricingType: ZonePricingTypeValue;
  readonly parentId?: string;
  readonly postalCodes?: readonly string[];
  readonly districts?: readonly string[];
  readonly divisions?: readonly string[];
  readonly shippingCost: number;
  readonly freeAbove?: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
  readonly codEnabled: boolean;
  readonly codCharge?: number;
  readonly codMaxAmount?: number;
  readonly isRemote: boolean;
}
