/**
 * Auth OAuth Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-oauth.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_OAUTH } from '@vubon/shared-constants/auth';

export const OAuthGrantTypeSchema = z.enum([
  AUTH_OAUTH.GRANT_TYPE_AUTHORIZATION_CODE,
  AUTH_OAUTH.GRANT_TYPE_CLIENT_CREDENTIALS,
  AUTH_OAUTH.GRANT_TYPE_REFRESH_TOKEN,
  AUTH_OAUTH.GRANT_TYPE_PASSWORD,
] as [string, string, string, string]);

export const OAuthResponseTypeSchema = z.enum([
  AUTH_OAUTH.RESPONSE_TYPE_CODE,
  AUTH_OAUTH.RESPONSE_TYPE_TOKEN,
] as [string, string]);

export const PkceMethodSchema = z.enum([
  AUTH_OAUTH.PKCE_METHOD_S256,
  AUTH_OAUTH.PKCE_METHOD_PLAIN,
] as [string, string]);

export const OAuthClientSchema = z.object({
  clientId: z.string().min(1).max(255),
  clientName: z.string().min(1).max(100),
  redirectUris: z.array(z.string().url()).min(1).max(20),
  scopes: z.array(z.string()).max(50),
  grantTypes: z.array(OAuthGrantTypeSchema).min(1).max(10),
  isPublic: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
});

export const OAuthTokenRequestSchema = z.object({
  grantType: OAuthGrantTypeSchema,
  clientId: z.string().min(1),
  clientSecret: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  redirectUri: z.string().url().optional(),
  refreshToken: z.string().min(1).optional(),
  scope: z.array(z.string()).optional(),
  codeVerifier: z.string().min(1).optional(),
});

export const OAuthTokenResponseSchema = z.object({
  accessToken: z.string().min(1),
  tokenType: z.literal('Bearer').default('Bearer'),
  expiresIn: z.number().int().positive(),
  refreshToken: z.string().optional(),
  scope: z.string().optional(),
  idToken: z.string().optional(),
});

export const OAuthAuthorizeRequestSchema = z.object({
  responseType: OAuthResponseTypeSchema,
  clientId: z.string().min(1),
  redirectUri: z.string().url(),
  scope: z.array(z.string()).max(50),
  state: z.string().min(16).max(255),
  codeChallenge: z.string().optional(),
  codeChallengeMethod: PkceMethodSchema.optional(),
});

export const OAuthUserInfoSchema = z.object({
  sub: z.string().min(1),
  email: z.string().email().optional(),
  emailVerified: z.boolean().optional(),
  name: z.string().max(200).optional(),
  picture: z.string().url().optional(),
  locale: z.string().max(10).optional(),
});

export type OAuthGrantTypeSchemaType = z.infer<typeof OAuthGrantTypeSchema>;
export type OAuthResponseTypeSchemaType = z.infer<typeof OAuthResponseTypeSchema>;
export type PkceMethodSchemaType = z.infer<typeof PkceMethodSchema>;
export type OAuthClientSchemaType = z.infer<typeof OAuthClientSchema>;
export type OAuthTokenRequestSchemaType = z.infer<typeof OAuthTokenRequestSchema>;
export type OAuthTokenResponseSchemaType = z.infer<typeof OAuthTokenResponseSchema>;
export type OAuthAuthorizeRequestSchemaType = z.infer<typeof OAuthAuthorizeRequestSchema>;
export type OAuthUserInfoSchemaType = z.infer<typeof OAuthUserInfoSchema>;
