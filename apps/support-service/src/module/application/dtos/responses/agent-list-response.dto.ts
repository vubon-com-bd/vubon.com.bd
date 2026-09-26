/**
 * AgentListResponseDTO
 * @module support-service/application/dtos/responses
 */
import type { AgentResponseDTO } from './agent-response.dto';

export interface AgentListResponseDTO {
  readonly items: readonly AgentResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
