import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { TESTIMONIAL_STATUS } from '@vubon/shared-constants/src/content/testimonial-status.constants';

const testimonialStatusKeys = Object.keys(TESTIMONIAL_STATUS) as [string, ...string[]];

export const TestimonialStatusSchema = StatusSchema.extend({
  status: z.enum(testimonialStatusKeys),
  category: z.literal('testimonial'),
  isPending: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  isRejected: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export const TestimonialStatusEnumSchema = z.enum(testimonialStatusKeys);
