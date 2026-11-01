/**
 * Auth SSO Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-sso.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_SSO, AUTH_SSO_BINDING } from '@vubon/shared-constants/auth';

export const SsoProviderSchema = z.enum(Object.values(AUTH_SSO) as [string, ...string[]]);

export const SsoBindingSchema = z.enum(Object.values(AUTH_SSO_BINDING) as [string, ...string[]]);

export const SsoAttributeMappingSchema = z.object({
  email: z.string().min(1).max(100),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  displayName: z.string().max(100).optional(),
  department: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  groups: z.string().max(100).optional(),
});

export const SsoConfigSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  provider: SsoProviderSchema,
  binding: SsoBindingSchema,
  entryPoint: z.string().url(),
  issuer: z.string().min(1).max(255),
  certificate: z.string().max(10000).optional(),
  metadataUrl: z.string().url().optional(),
  attributeMapping: SsoAttributeMappingSchema,
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
});

export const SsoLoginRequestSchema = z.object({
  providerId: z.string().min(1),
  relayState: z.string().max(500).optional(),
  returnUrl: z.string().url().optional(),
});

export const SsoLoginResponseSchema = z.object({
  success: z.boolean(),
  userId: z.string().optional(),
  isNewUser: z.boolean(),
  sessionId: z.string().optional(),
  attributes: z.record(z.string(), z.string()).optional(),
  error: z.string().optional(),
});

export const SsoLogoutRequestSchema = z.object({
  sessionId: z.string().min(1),
  userId: z.string().min(1),
  singleLogout: z.boolean().default(true),
});

export const SsoSessionSchema = z.object({
  sessionId: z.string().min(1),
  userId: z.string().min(1),
  providerId: z.string().min(1),
  providerSessionId: z.string().min(1),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
});

export type SsoProviderSchemaType = z.infer<typeof SsoProviderSchema>;
export type SsoBindingSchemaType = z.infer<typeof SsoBindingSchema>;
export type SsoAttributeMappingSchemaType = z.infer<typeof SsoAttributeMappingSchema>;
export type SsoConfigSchemaType = z.infer<typeof SsoConfigSchema>;
export type SsoLoginRequestSchemaType = z.infer<typeof SsoLoginRequestSchema>;
export type SsoLoginResponseSchemaType = z.infer<typeof SsoLoginResponseSchema>;
export type SsoLogoutRequestSchemaType = z.infer<typeof SsoLogoutRequestSchema>;
export type SsoSessionSchemaType = z.infer<typeof SsoSessionSchema>;
