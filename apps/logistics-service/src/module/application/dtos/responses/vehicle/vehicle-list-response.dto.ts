import type { VehicleSummaryResponseDTO } from './vehicle-summary-response.dto.js';

export interface VehicleListResponseDTO {
  readonly items: readonly VehicleSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
