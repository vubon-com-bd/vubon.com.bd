import type { ShippingMethodTypeValue } from '@domain/primitives/shipping-method-type.vo';
import type { ShippingMethodStatusValue } from '@domain/primitives/shipping-method-status.vo';

export interface ShippingMethodSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly displayName: string;
  readonly type: ShippingMethodTypeValue;
  readonly status: ShippingMethodStatusValue;
  readonly baseCost: number;
  readonly currency: string;
  readonly createdAt: string;
}
