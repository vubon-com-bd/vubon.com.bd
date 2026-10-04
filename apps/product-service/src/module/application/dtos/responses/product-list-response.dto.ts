/**
 * ProductListResponseDTO
 */
import type { ProductPublicResponseDTO } from './product-public-response.dto.js';

export interface ProductListResponseDTO {
  readonly success: true;
  readonly products: readonly ProductPublicResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
