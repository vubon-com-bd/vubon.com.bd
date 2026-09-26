/**
 * TeamListResponseDTO
 * @module support-service/application/dtos/responses
 */
import type { TeamResponseDTO } from './team-response.dto';

export interface TeamListResponseDTO {
  readonly items: readonly TeamResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
