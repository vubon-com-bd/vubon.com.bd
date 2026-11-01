import type { ShippingMethodTypeValue } from '@domain/primitives/shipping-method-type.vo';
import type { ShippingRateTypeValue } from '@domain/primitives/shipping-rate-type.vo';

export interface CreateShippingMethodRequestDTO {
  readonly name: string;
  readonly code: string;
  readonly displayName: string;
  readonly type: ShippingMethodTypeValue;
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
