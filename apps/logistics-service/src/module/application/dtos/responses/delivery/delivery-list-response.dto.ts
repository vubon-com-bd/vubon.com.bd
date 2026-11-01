import type { DeliverySummaryResponseDTO } from './delivery-summary-response.dto.js';

export interface DeliveryListResponseDTO {
  readonly items: readonly DeliverySummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
