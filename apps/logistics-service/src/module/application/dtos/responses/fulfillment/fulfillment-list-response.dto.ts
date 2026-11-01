import type { FulfillmentSummaryResponseDTO } from './fulfillment-summary-response.dto.js';

export interface FulfillmentListResponseDTO {
  readonly items: readonly FulfillmentSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
