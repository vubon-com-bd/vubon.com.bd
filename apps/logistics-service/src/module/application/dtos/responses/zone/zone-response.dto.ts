import type { ZoneStatusValue } from '@domain/primitives/zone-status.vo';
import type { ZoneTypeValue } from '@domain/primitives/zone-type.vo';
import type { ZonePricingTypeValue } from '@domain/primitives/zone-pricing-type.vo';

export interface ZoneResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly type: ZoneTypeValue;
  readonly status: ZoneStatusValue;
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
  readonly isActive: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly restrictedAt?: string;
  readonly suspendedAt?: string;
  readonly statusReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
