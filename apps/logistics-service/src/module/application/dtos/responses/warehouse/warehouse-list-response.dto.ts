import type { WarehouseSummaryResponseDTO } from './warehouse-summary-response.dto.js';

export interface WarehouseListResponseDTO {
  readonly items: readonly WarehouseSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
