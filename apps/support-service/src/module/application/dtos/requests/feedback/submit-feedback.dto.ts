/**
 * SubmitFeedbackRequestDTO — matches FeedbackCreateInputSchema
 * @module support-service/application/dtos/requests/feedback
 */
import type { FeedbackTypeValue } from '@vubon/shared-types/support';

export interface SubmitFeedbackRequestDTO {
  readonly type: FeedbackTypeValue;
  readonly title?: string;
  readonly message: string;
  readonly rating?: number;
  readonly attachments?: readonly string[];
  readonly isAnonymous?: boolean;
  readonly referenceId?: string;
  readonly referenceType?: string;
  readonly userId?: string;
  readonly email?: string;
}
