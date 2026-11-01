import type { DispatchSummaryResponseDTO } from './dispatch-summary-response.dto.js';

export interface DispatchListResponseDTO {
  readonly items: readonly DispatchSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
