import { StatusObject } from '../common/status.types';
import { TESTIMONIAL_STATUS } from '@vubon/shared-constants/src/content/testimonial-status.constants';

export interface TestimonialStatus extends StatusObject {
  type: keyof typeof TESTIMONIAL_STATUS | string;
  category: 'testimonial';
  isPending: boolean;
  isApproved: boolean;
  isRejected: boolean;
  isFeatured: boolean;
}

export type TestimonialStatusKey = keyof typeof TESTIMONIAL_STATUS;
