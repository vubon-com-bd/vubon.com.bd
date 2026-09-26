/**
 * Auth Provider Schema
 * @module shared-schemas/auth
 */

import { z } from 'zod';
import { AUTH_PROVIDER } from '@vubon/shared-constants/auth';

export const AuthProviderSchema = z.enum(Object.values(AUTH_PROVIDER) as [string, ...string[]]);

export type AuthProviderSchemaType = z.infer<typeof AuthProviderSchema>;
