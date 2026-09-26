/**
 * FeedbackServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { SubmitFeedbackRequestDTO } from '../../dtos/requests/feedback/submit-feedback.dto';
import type { ReviewFeedbackRequestDTO } from '../../dtos/requests/feedback/review-feedback.dto';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';
import type { FeedbackListResponseDTO } from '../../dtos/responses/feedback-list-response.dto';

export interface FeedbackServiceInterface {
  submit(input: SubmitFeedbackRequestDTO): Promise<FeedbackResponseDTO>;
  review(input: ReviewFeedbackRequestDTO): Promise<FeedbackResponseDTO>;
  getById(feedbackId: string): Promise<FeedbackResponseDTO>;
  list(page: number, limit: number): Promise<FeedbackListResponseDTO>;
}
