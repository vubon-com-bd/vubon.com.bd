import { RATING } from '@vubon/shared-constants/src/common/rating.constants';
import { TESTIMONIAL_STATUS } from '@vubon/shared-constants/src/content/testimonial-status.constants';

export interface TestimonialInput {
  content: string;
  rating: string;
  status: string;
}

export const validateTestimonial = (
  testimonial: Partial<TestimonialInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!testimonial.content) errors.push('Testimonial content is required');
  if (testimonial.rating && !Object.keys(RATING).includes(testimonial.rating)) {
    errors.push('Invalid rating');
  }
  if (testimonial.status && !Object.keys(TESTIMONIAL_STATUS).includes(testimonial.status)) {
    errors.push('Invalid testimonial status');
  }
  return { isValid: errors.length === 0, errors };
};
