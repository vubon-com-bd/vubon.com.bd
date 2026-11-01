import type { WarehouseStatusValue } from '@domain/primitives/warehouse-status.vo';

export interface WarehouseSummaryResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly status: WarehouseStatusValue;
  readonly zone: string;
  readonly isDefault: boolean;
  readonly createdAt: string;
}
