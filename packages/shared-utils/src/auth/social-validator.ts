import { AUTH_SOCIAL } from '@vubon/shared-constants/src/auth/auth-social.constants';

export const validateSocialToken = (
  _provider: keyof typeof AUTH_SOCIAL | string,
  _token: string
): boolean => {
  // Implementation for social token validation
  return true;
};

export const validateSocialProvider = (provider: string): boolean => {
  return ['google', 'facebook', 'twitter', 'github'].includes(provider);
};
