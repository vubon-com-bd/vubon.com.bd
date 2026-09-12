import { SOCIAL_MEDIA } from '@vubon/shared-constants/src/marketing/social-media.constants';

export interface SocialMediaInput {
  type: string;
  postType: string;
}

export const validateSocialMedia = (
  social: Partial<SocialMediaInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!social.type) errors.push('Social media type is required');
  if (social.type && !Object.keys(SOCIAL_MEDIA.TYPES).includes(social.type)) {
    errors.push('Invalid social media type');
  }
  if (social.postType && !Object.keys(SOCIAL_MEDIA.POST_TYPES).includes(social.postType)) {
    errors.push('Invalid post type');
  }
  return { isValid: errors.length === 0, errors };
};
