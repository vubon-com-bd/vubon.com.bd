/**
 * ComplaintListResponseDTO
 * @module support-service/application/dtos/responses
 */
import type { ComplaintResponseDTO } from './complaint-response.dto';

export interface ComplaintListResponseDTO {
  readonly items: readonly ComplaintResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
