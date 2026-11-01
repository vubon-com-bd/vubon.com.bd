import type { DriverSummaryResponseDTO } from './driver-summary-response.dto.js';

export interface DriverListResponseDTO {
  readonly items: readonly DriverSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
