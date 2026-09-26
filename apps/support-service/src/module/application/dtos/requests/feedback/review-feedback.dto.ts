/**
 * ReviewFeedbackRequestDTO
 * @module support-service/application/dtos/requests/feedback
 */
import type { FeedbackStatusValue } from '@vubon/shared-types/support';

export interface ReviewFeedbackRequestDTO {
  readonly feedbackId: string;
  readonly reviewerId: string;
  readonly status: FeedbackStatusValue;
  readonly note?: string;
}
