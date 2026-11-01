import type { PackagingSummaryResponseDTO } from './packaging-summary-response.dto.js';

export interface PackagingListResponseDTO {
  readonly items: readonly PackagingSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
