/**
 * Environment Config Schema
 * @module shared-schemas/common/config
 *
 * Values আসে shared-constants/common/environment.constants থেকে।
 */

import { z } from 'zod';
import { ENVIRONMENT } from '@vubon/shared-constants/common';

export const EnvironmentSchema = z.enum(Object.values(ENVIRONMENT) as [string, ...string[]]);

export const EnvConfigSchema = z.object({
  NODE_ENV: EnvironmentSchema,
  PORT: z.coerce.number().int().min(1).max(65535),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().optional(),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters')
    .max(256, 'JWT_SECRET is too long'),
  JWT_EXPIRES_IN: z.string().min(1),
  API_BASE_URL: z.string().url(),
  LOG_LEVEL: z.string().optional(),
});

export const EnvConfigPartialSchema = EnvConfigSchema.partial();

export type EnvironmentSchemaType = z.infer<typeof EnvironmentSchema>;
export type EnvConfigSchemaType = z.infer<typeof EnvConfigSchema>;
export type EnvConfigPartialSchemaType = z.infer<typeof EnvConfigPartialSchema>;
