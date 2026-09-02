/**
 * Auth Provider Schema
 * প্রমাণীকরণ প্রোভাইডার সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_PROVIDER } from '@vubon/shared-constants';

export const AuthProviderSchema = z.enum([
  AUTH_PROVIDER.EMAIL,
  AUTH_PROVIDER.PHONE,
  AUTH_PROVIDER.GOOGLE,
  AUTH_PROVIDER.FACEBOOK,
  AUTH_PROVIDER.GITHUB,
  AUTH_PROVIDER.LINKEDIN,
  AUTH_PROVIDER.TWITTER,
  AUTH_PROVIDER.MICROSOFT,
  AUTH_PROVIDER.APPLE,
  AUTH_PROVIDER.BANGLADESH_GOV,
  AUTH_PROVIDER.NID,
  AUTH_PROVIDER.BIRTH_REG,
  AUTH_PROVIDER.MOBILE,
  AUTH_PROVIDER.BANK,
  AUTH_PROVIDER.BKASH,
  AUTH_PROVIDER.NAGAD,
  AUTH_PROVIDER.ROCKET,
]);

export const AuthProviderConfigSchema = z.object({
  provider: AuthProviderSchema,
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  redirectUri: z.string().url().optional(),
  scopes: z.array(z.string()).optional(),
  enabled: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export type AuthProviderSchemaType = z.infer<typeof AuthProviderSchema>;
export type AuthProviderConfigSchemaType = z.infer<typeof AuthProviderConfigSchema>;
