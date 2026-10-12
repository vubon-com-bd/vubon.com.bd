/**
 * Vendor HTTP Response DTOs
 * @module vendor-service/interfaces/dtos/responses
 */
import type {
  VendorResponseDto,
  VendorPublicDto,
  VendorSummaryDto,
} from '../../../application/dtos/responses/vendor-response.dto.js';
import type { VendorListResponseDto } from '../../../application/dtos/responses/vendor-list-response.dto.js';
import type { VendorStatsResponseDto } from '../../../application/dtos/responses/vendor-stats-response.dto.js';

export interface VendorHttpResponse<T = unknown> {
  readonly success: true;
  readonly data: T;
  readonly timestamp: string;
}

export interface VendorErrorHttpResponse {
  readonly success: false;
  readonly statusCode: number;
  readonly code: string;
  readonly message: string;
  readonly context?: Readonly<Record<string, unknown>>;
  readonly timestamp: string;
}

export type VendorResponseHttpDTO = VendorHttpResponse<VendorResponseDto>;
export type VendorPublicResponseHttpDTO = VendorHttpResponse<VendorPublicDto>;
export type VendorSummaryResponseHttpDTO = VendorHttpResponse<VendorSummaryDto>;
export type VendorListResponseHttpDTO = VendorHttpResponse<VendorListResponseDto>;
export type VendorStatsResponseHttpDTO = VendorHttpResponse<VendorStatsResponseDto>;

export interface VendorSlugAvailabilityHttpDTO {
  readonly slug: string;
  readonly available: boolean;
  readonly suggestion?: string;
}
