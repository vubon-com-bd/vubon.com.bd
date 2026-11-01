import type { ZoneSummaryResponseDTO } from './zone-summary-response.dto.js';

export interface ZoneListResponseDTO {
  readonly items: readonly ZoneSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
