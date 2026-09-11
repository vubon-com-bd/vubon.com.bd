import { RATING } from '@vubon/shared-constants/src/common/rating.constants';
import { FEEDBACK } from '@vubon/shared-constants/src/support/feedback.constants';

export interface FeedbackInput {
  userId: string;
  content: string;
  rating: string;
  type: string;
  status: string;
}

export const validateFeedback = (
  feedback: Partial<FeedbackInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!feedback.userId) errors.push('User ID is required');
  if (!feedback.content) errors.push('Feedback content is required');
  if (feedback.rating && !Object.keys(RATING).includes(feedback.rating)) {
    errors.push('Invalid rating');
  }
  if (feedback.type && !Object.keys(FEEDBACK.FEEDBACK_TYPES).includes(feedback.type)) {
    errors.push('Invalid feedback type');
  }
  if (feedback.status && !Object.keys(FEEDBACK.STATUS).includes(feedback.status)) {
    errors.push('Invalid feedback status');
  }
  return { isValid: errors.length === 0, errors };
};
