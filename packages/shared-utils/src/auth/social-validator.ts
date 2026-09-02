/**
 * Auth Social Validator
 * প্রমীকরণ সোশ্যাল ভ্যালিডেটর
 */

import { AUTH_SOCIAL } from '@vubon/shared-constants';

export const AuthSocialValidator = {
  /**
   * Validate social provider
   * সোশ্যাল প্রোভাইডার ভ্যালিডেট করা
   */
  validateProvider: (provider: string): boolean => {
    const validProviders = Object.keys(AUTH_SOCIAL.PROVIDERS);
    return validProviders.includes(provider);
  },

  /**
   * Validate social profile
   * সোশ্যাল প্রোফাইল ভ্যালিডেট করা
   */
  validateProfile: (profile: {
    id: string;
    email?: string;
    name?: string;
    provider: string;
  }): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!profile.id) {
      errors.push('Social profile ID is required');
    }

    if (!profile.provider) {
      errors.push('Provider is required');
    } else if (!AuthSocialValidator.validateProvider(profile.provider)) {
      errors.push(`Invalid provider: ${profile.provider}`);
    }

    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      errors.push('Invalid email format');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate social token
   * সোশ্যাল টোকেন ভ্যালিডেট করা
   */
  validateToken: (token: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!token || token.length === 0) {
      errors.push('Access token is required');
    }

    if (token.length < 10) {
      errors.push('Token is too short');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Check if social provider requires email
   * সোশ্যাল প্রোভাইডারের ইমেইল প্রয়োজন কিনা চেক করা
   */
  requiresEmail: (provider: string): boolean => {
    const providersRequiringEmail = ['GOOGLE', 'FACEBOOK', 'LINKEDIN', 'MICROSOFT', 'APPLE'];
    return providersRequiringEmail.includes(provider.toUpperCase());
  },

  /**
   * Get required scopes for provider
   * প্রোভাইডারের জন্য প্রয়োজনীয় স্কোপ পাওয়া
   */
  getRequiredScopes: (provider: string): string[] => {
    const scopes: Record<string, string[]> = {
      GOOGLE: ['email', 'profile', 'openid'],
      FACEBOOK: ['email', 'public_profile'],
      GITHUB: ['user:email', 'read:user'],
      LINKEDIN: ['r_emailaddress', 'r_liteprofile'],
      TWITTER: ['users.read', 'tweet.read'],
      MICROSOFT: ['User.Read', 'email', 'openid', 'profile'],
      APPLE: ['email', 'name'],
    };

    return scopes[provider.toUpperCase()] || [];
  },
};
