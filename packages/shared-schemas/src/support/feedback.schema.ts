import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { RATING } from '@vubon/shared-constants/src/common/rating.constants';
import { FEEDBACK } from '@vubon/shared-constants/src/support/feedback.constants';

const feedbackTypeKeys = Object.keys(FEEDBACK.FEEDBACK_TYPES) as [string, ...string[]];
const feedbackStatusKeys = Object.keys(FEEDBACK.STATUS) as [string, ...string[]];
const ratingKeys = Object.keys(RATING) as [string, ...string[]];

export const FeedbackSchema = BaseSchema.extend({
  feedbackId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(feedbackTypeKeys),
  rating: z.enum(ratingKeys),
  content: z.string().min(10).max(5000),
  status: z.enum(feedbackStatusKeys),
  images: z.array(z.string().url()),
  isAnonymous: z.boolean().default(false),
  reviewedBy: z.string().uuid().optional(),
  reviewedAt: z.date().optional(),
  actionedAt: z.date().optional(),
  action: z.string().optional(),
  rejectedReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
