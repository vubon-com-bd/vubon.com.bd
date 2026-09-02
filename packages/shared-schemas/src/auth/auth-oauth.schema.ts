/**
 * Auth OAuth Schema
 * প্রমাণীকরণ OAuth সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_OAUTH } from '@vubon/shared-constants';

export const AuthOAuthSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum([
    AUTH_OAUTH.PROVIDERS.GOOGLE,
    AUTH_OAUTH.PROVIDERS.FACEBOOK,
    AUTH_OAUTH.PROVIDERS.GITHUB,
    AUTH_OAUTH.PROVIDERS.LINKEDIN,
    AUTH_OAUTH.PROVIDERS.TWITTER,
    AUTH_OAUTH.PROVIDERS.MICROSOFT,
    AUTH_OAUTH.PROVIDERS.APPLE,
    AUTH_OAUTH.PROVIDERS.SPOTIFY,
    AUTH_OAUTH.PROVIDERS.DISCORD,
    AUTH_OAUTH.PROVIDERS.SLACK,
  ]),
  providerId: z.string().min(1, 'Provider ID is required'),
  accessToken: z.string().min(1, 'Access token is required'),
  refreshToken: z.string().optional(),
  expiresAt: z.date().optional(),
  scope: z.array(z.string()).optional(),
  state: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  linkedAt: z.date(),
  revokedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthOAuthCreateSchema = AuthOAuthSchema.omit({
  id: true,
  linkedAt: true,
  revokedAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  expiresIn: z.number().int().positive().optional(),
});

export const AuthOAuthTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresIn: z.number().int(),
  tokenType: z.string(),
  scope: z.string().optional(),
});

export const AuthOAuthAuthorizationRequestSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  redirectUri: z.string().url('Invalid redirect URI'),
  responseType: z.enum([
    AUTH_OAUTH.RESPONSE_TYPES.CODE,
    AUTH_OAUTH.RESPONSE_TYPES.TOKEN,
    AUTH_OAUTH.RESPONSE_TYPES.ID_TOKEN,
    AUTH_OAUTH.RESPONSE_TYPES.CODE_TOKEN,
    AUTH_OAUTH.RESPONSE_TYPES.CODE_ID_TOKEN,
    AUTH_OAUTH.RESPONSE_TYPES.CODE_TOKEN_ID_TOKEN,
  ]),
  scope: z.array(z.string()).optional(),
  state: z.string().optional(),
});

export type AuthOAuthSchemaType = z.infer<typeof AuthOAuthSchema>;
export type AuthOAuthCreateSchemaType = z.infer<typeof AuthOAuthCreateSchema>;
export type AuthOAuthTokenResponseSchemaType = z.infer<typeof AuthOAuthTokenResponseSchema>;
export type AuthOAuthAuthorizationRequestSchemaType = z.infer<
  typeof AuthOAuthAuthorizationRequestSchema
>;
