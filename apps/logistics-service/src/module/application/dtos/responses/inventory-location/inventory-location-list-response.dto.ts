import type { InventoryLocationSummaryResponseDTO } from './inventory-location-summary-response.dto.js';

export interface InventoryLocationListResponseDTO {
  readonly items: readonly InventoryLocationSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
