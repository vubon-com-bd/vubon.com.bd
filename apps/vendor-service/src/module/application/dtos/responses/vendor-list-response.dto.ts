/**
 * VendorListResponseDto — paginated vendor list
 * @module vendor-service/application/dtos/responses
 */
import type { VendorSummaryDto } from './vendor-response.dto.js';

export interface VendorListResponseDto {
  readonly items: readonly VendorSummaryDto[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}
