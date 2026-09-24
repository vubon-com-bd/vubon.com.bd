import type { Feedback } from '@vubon/shared-types/support';

export interface FeedbackResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly status: string;
  readonly content: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type FeedbackResponseShape = Feedback;
