import type { TrackingSummaryResponseDTO } from './tracking-summary-response.dto.js';

export interface TrackingListResponseDTO {
  readonly items: readonly TrackingSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
