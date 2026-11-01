/**
 * ShipmentListResponseDTO — Paginated
 * @module logistics-service/application/dtos/responses/shipment
 */
import type { ShipmentSummaryResponseDTO } from './shipment-summary-response.dto.js';

export interface ShipmentListResponseDTO {
  readonly items: readonly ShipmentSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
