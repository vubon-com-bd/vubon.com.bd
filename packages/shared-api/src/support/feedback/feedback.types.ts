export type FeedbackCategory = 'bug' | 'feature_request' | 'ux' | 'performance' | 'other';

export interface Feedback {
  readonly id: string;
  readonly userId: string;
  readonly category: FeedbackCategory;
  readonly message: string;
  readonly rating?: number;
  readonly createdAt: string;
}

export interface SubmitFeedbackRequest {
  readonly category: FeedbackCategory;
  readonly message: string;
  readonly rating?: number;
  readonly metadata?: Record<string, unknown>;
}

export interface FeedbackListResponse {
  readonly feedback: readonly Feedback[];
  readonly total: number;
}
