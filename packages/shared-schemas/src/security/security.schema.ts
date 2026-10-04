/**
 * Security Schema
 * @module shared-schemas/security
 *
 * Values আসে shared-constants/security/security.constants থেকে।
 */

import { z } from 'zod';
import { SECURITY } from '@vubon/shared-constants/security';

export const PasswordPolicySchema = z.object({
  minLength: z.number().int().min(SECURITY.PASSWORD_MIN_LENGTH).max(SECURITY.PASSWORD_MAX_LENGTH),
  maxLength: z.number().int().min(8).max(256),
  requireUppercase: z.boolean(),
  requireLowercase: z.boolean(),
  requireNumber: z.boolean(),
  requireSymbol: z.boolean(),
  historyCount: z.number().int().nonnegative().max(50),
  expiryDays: z.number().int().nonnegative().max(3650),
  bcryptRounds: z.number().int().min(SECURITY.BCRYPT_MIN_ROUNDS).max(SECURITY.BCRYPT_MAX_ROUNDS),
});

export const JwtPayloadSchema = z.object({
  sub: z.string().min(1),
  iat: z.number().int().nonnegative(),
  exp: z.number().int().nonnegative(),
  iss: z.string().min(1),
  aud: z.string().optional(),
  jti: z.string().optional(),
  scope: z.array(z.string()).optional(),
});

export const JwtConfigSchema = z.object({
  algorithm: z.enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512']),
  accessExpiry: z.string().min(1).max(20),
  refreshExpiry: z.string().min(1).max(20),
  issuer: z.string().min(1).max(100),
  audience: z.string().min(1).max(100),
});

export const AuthCredentialsSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1).optional(),
  expiresAt: z.number().int().positive(),
});

export const EncryptionConfigSchema = z.object({
  algorithm: z.string().min(1).max(50),
  ivLength: z.number().int().positive().max(64),
  saltLength: z.number().int().positive().max(128),
  keyLength: z.number().int().positive().max(128),
});

export const RateLimitConfigSchema = z.object({
  windowSeconds: z.number().int().positive().max(86400),
  maxRequests: z.number().int().positive().max(1000000),
  burstLimit: z.number().int().positive().optional(),
});

export type PasswordPolicySchemaType = z.infer<typeof PasswordPolicySchema>;
export type JwtPayloadSchemaType = z.infer<typeof JwtPayloadSchema>;
export type JwtConfigSchemaType = z.infer<typeof JwtConfigSchema>;
export type AuthCredentialsSchemaType = z.infer<typeof AuthCredentialsSchema>;
export type EncryptionConfigSchemaType = z.infer<typeof EncryptionConfigSchema>;
export type RateLimitConfigSchemaType = z.infer<typeof RateLimitConfigSchema>;
