import type { CourierSummaryResponseDTO } from './courier-summary-response.dto.js';

export interface CourierListResponseDTO {
  readonly items: readonly CourierSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
