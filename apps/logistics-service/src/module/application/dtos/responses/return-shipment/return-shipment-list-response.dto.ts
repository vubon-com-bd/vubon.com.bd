import type { ReturnShipmentSummaryResponseDTO } from './return-shipment-summary-response.dto.js';

export interface ReturnShipmentListResponseDTO {
  readonly items: readonly ReturnShipmentSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
