import type { ReturnReasonSummaryResponseDTO } from './return-reason-summary-response.dto.js';

export interface ReturnReasonListResponseDTO {
  readonly items: readonly ReturnReasonSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
