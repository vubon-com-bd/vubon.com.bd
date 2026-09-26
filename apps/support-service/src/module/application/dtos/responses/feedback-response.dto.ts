/**
 * FeedbackResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  FeedbackTypeValue,
  FeedbackStatusValue,
} from '@vubon/shared-types/support';

export interface FeedbackResponseDTO {
  readonly id: string;
  readonly type: FeedbackTypeValue;
  readonly status: FeedbackStatusValue;
  readonly title?: string;
  readonly message: string;
  readonly rating?: number;
  readonly attachments?: readonly string[];
  readonly userId?: string;
  readonly email?: string;
  readonly isAnonymous: boolean;
  readonly tags?: readonly string[];
  readonly referenceId?: string;
  readonly referenceType?: string;
  readonly reviewedBy?: string;
  readonly reviewedAt?: string;
  readonly resolvedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
