/**
 * FeedbackListResponseDTO
 * @module support-service/application/dtos/responses
 */
import type { FeedbackResponseDTO } from './feedback-response.dto';

export interface FeedbackListResponseDTO {
  readonly items: readonly FeedbackResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
