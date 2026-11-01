import type { ShippingMethodSummaryResponseDTO } from './shipping-method-summary-response.dto.js';

export interface ShippingMethodListResponseDTO {
  readonly items: readonly ShippingMethodSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
