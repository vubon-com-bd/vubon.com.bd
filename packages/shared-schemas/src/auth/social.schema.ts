import { z } from 'zod';

/**
 * Supported social providers
 */
const SocialProviderEnum = z.enum([
  'google',
  'facebook',
  'github',
  'apple',
  'linkedin',
  'twitter',
  'microsoft',
  'discord',
]);

/**
 * Schema for validating social login requests
 */
export const SocialLoginSchema = z.object({
  /**
   * Social provider - must be one of the supported providers
   */
  provider: SocialProviderEnum,

  /**
   * Authorization code from the social provider
   */
  code: z
    .string({
      required_error: 'Authorization code is required',
      invalid_type_error: 'Authorization code must be a string',
    })
    .min(1, 'Authorization code is required'),
});

/**
 * Schema for validating social callback requests
 */
export const SocialCallbackSchema = z.object({
  /**
   * Authorization code from the social provider
   */
  code: z
    .string({
      required_error: 'Authorization code is required',
      invalid_type_error: 'Authorization code must be a string',
    })
    .min(1, 'Authorization code is required'),

  /**
   * State parameter for CSRF protection - optional
   */
  state: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'State cannot be empty if provided',
    }),
});

/**
 * Schema for validating link social account requests
 */
export const LinkSocialAccountSchema = z.object({
  /**
   * Social provider - must be one of the supported providers
   */
  provider: SocialProviderEnum,

  /**
   * Authorization code from the social provider
   */
  code: z
    .string({
      required_error: 'Authorization code is required',
      invalid_type_error: 'Authorization code must be a string',
    })
    .min(1, 'Authorization code is required'),
});

/**
 * Schema for validating unlink social account requests
 */
export const UnlinkSocialAccountSchema = z.object({
  /**
   * Social provider - must be one of the supported providers
   */
  provider: SocialProviderEnum,

  /**
   * Provider user ID - optional, for verification
   */
  providerUserId: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Provider user ID cannot be empty if provided',
    }),
});

/**
 * Type inference for social schemas
 */
export type SocialLoginSchemaType = z.infer<typeof SocialLoginSchema>;
export type SocialCallbackSchemaType = z.infer<typeof SocialCallbackSchema>;
export type LinkSocialAccountSchemaType = z.infer<typeof LinkSocialAccountSchema>;
export type UnlinkSocialAccountSchemaType = z.infer<typeof UnlinkSocialAccountSchema>;

/**
 * Validates social login data and returns typed result
 */
export function validateSocialLogin(data: unknown): SocialLoginSchemaType {
  return SocialLoginSchema.parse(data);
}

/**
 * Safely validates social login data without throwing
 */
export function safeValidateSocialLogin(data: unknown): {
  success: boolean;
  data?: SocialLoginSchemaType;
  error?: z.ZodError;
} {
  const result = SocialLoginSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates social callback data and returns typed result
 */
export function validateSocialCallback(data: unknown): SocialCallbackSchemaType {
  return SocialCallbackSchema.parse(data);
}

/**
 * Safely validates social callback data without throwing
 */
export function safeValidateSocialCallback(data: unknown): {
  success: boolean;
  data?: SocialCallbackSchemaType;
  error?: z.ZodError;
} {
  const result = SocialCallbackSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates link social account data and returns typed result
 */
export function validateLinkSocialAccount(data: unknown): LinkSocialAccountSchemaType {
  return LinkSocialAccountSchema.parse(data);
}

/**
 * Safely validates link social account data without throwing
 */
export function safeValidateLinkSocialAccount(data: unknown): {
  success: boolean;
  data?: LinkSocialAccountSchemaType;
  error?: z.ZodError;
} {
  const result = LinkSocialAccountSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates unlink social account data and returns typed result
 */
export function validateUnlinkSocialAccount(data: unknown): UnlinkSocialAccountSchemaType {
  return UnlinkSocialAccountSchema.parse(data);
}

/**
 * Safely validates unlink social account data without throwing
 */
export function safeValidateUnlinkSocialAccount(data: unknown): {
  success: boolean;
  data?: UnlinkSocialAccountSchemaType;
  error?: z.ZodError;
} {
  const result = UnlinkSocialAccountSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
