import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { RATING } from '@vubon/shared-constants/src/common/rating.constants';
import { TESTIMONIAL_STATUS } from '@vubon/shared-constants/src/content/testimonial-status.constants';

const ratingKeys = Object.keys(RATING) as [string, ...string[]];
const testimonialStatusKeys = Object.keys(TESTIMONIAL_STATUS) as [string, ...string[]];

export const TestimonialSchema = BaseSchema.extend({
  testimonialId: z.string().uuid(),
  content: z.string().min(10).max(1000),
  rating: z.enum(ratingKeys),
  status: z.enum(testimonialStatusKeys),
  userId: z.string().uuid(),
  user: UserSchema,
  name: z.string().min(1).max(100),
  avatar: z.string().url().optional(),
  position: z.string().optional(),
  company: z.string().optional(),
  image: z.string().url().optional(),
  video: z.string().url().optional(),
  isVerified: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  approvedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
