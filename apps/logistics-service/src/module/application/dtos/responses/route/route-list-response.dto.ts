import type { RouteSummaryResponseDTO } from './route-summary-response.dto.js';

export interface RouteListResponseDTO {
  readonly items: readonly RouteSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
