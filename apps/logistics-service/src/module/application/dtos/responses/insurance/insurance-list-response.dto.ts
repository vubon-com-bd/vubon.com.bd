import type { InsuranceSummaryResponseDTO } from './insurance-summary-response.dto.js';

export interface InsuranceListResponseDTO {
  readonly items: readonly InsuranceSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
