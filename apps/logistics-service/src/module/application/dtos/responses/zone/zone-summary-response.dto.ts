import type { ZoneStatusValue } from '@domain/primitives/zone-status.vo';
import type { ZoneTypeValue } from '@domain/primitives/zone-type.vo';

export interface ZoneSummaryResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly type: ZoneTypeValue;
  readonly status: ZoneStatusValue;
  readonly shippingCost: number;
  readonly currency: string;
  readonly isRemote: boolean;
  readonly createdAt: string;
}
