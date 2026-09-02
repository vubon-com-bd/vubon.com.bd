/**
 * Auth SSO Schema
 * প্রমাণীকরণ Single Sign-On সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { AUTH_SSO } from '@vubon/shared-constants';

export const AuthSSOSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  provider: z.enum([
    AUTH_SSO.PROVIDERS.OKTA,
    AUTH_SSO.PROVIDERS.AUTH0,
    AUTH_SSO.PROVIDERS.AZURE_AD,
    AUTH_SSO.PROVIDERS.AWS_COGNITO,
    AUTH_SSO.PROVIDERS.GOOGLE_WORKSPACE,
    AUTH_SSO.PROVIDERS.MICROSOFT_365,
    AUTH_SSO.PROVIDERS.DUO,
    AUTH_SSO.PROVIDERS.PING_IDENTITY,
    AUTH_SSO.PROVIDERS.ONE_LOGIN,
    AUTH_SSO.PROVIDERS.BD_GOV_SSO,
    AUTH_SSO.PROVIDERS.BD_GOV_DIGITAL,
    AUTH_SSO.PROVIDERS.BD_GOV_NID,
    AUTH_SSO.PROVIDERS.BD_GOV_ETC,
    AUTH_SSO.PROVIDERS.BANK_ASIA,
    AUTH_SSO.PROVIDERS.DBBL_SSO,
    AUTH_SSO.PROVIDERS.BRAC_SSO,
    AUTH_SSO.PROVIDERS.BKASH_SSO,
    AUTH_SSO.PROVIDERS.NAGAD_SSO,
    AUTH_SSO.PROVIDERS.ROCKET_SSO,
  ]),
  protocol: z.enum([
    AUTH_SSO.PROTOCOLS.SAML,
    AUTH_SSO.PROTOCOLS.OIDC,
    AUTH_SSO.PROTOCOLS.CAS,
    AUTH_SSO.PROTOCOLS.WS_FEDERATION,
    AUTH_SSO.PROTOCOLS.OAUTH2,
  ]),
  providerId: z.string().min(1, 'Provider ID is required'),
  samlResponse: z.string().optional(),
  samlAssertion: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  linkedAt: z.date(),
  expiredAt: z.date().optional(),
  revokedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AuthSSOCreateSchema = AuthSSOSchema.omit({
  id: true,
  linkedAt: true,
  expiredAt: true,
  revokedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const AuthSSOSAMLRequestSchema = z.object({
  samlRequest: z.string().min(1, 'SAML request is required'),
  relayState: z.string().optional(),
});

export const AuthSSOSAMLResponseSchema = z.object({
  samlResponse: z.string().min(1, 'SAML response is required'),
  relayState: z.string().optional(),
});

export type AuthSSOSchemaType = z.infer<typeof AuthSSOSchema>;
export type AuthSSOCreateSchemaType = z.infer<typeof AuthSSOCreateSchema>;
export type AuthSSOSAMLRequestSchemaType = z.infer<typeof AuthSSOSAMLRequestSchema>;
export type AuthSSOSAMLResponseSchemaType = z.infer<typeof AuthSSOSAMLResponseSchema>;
