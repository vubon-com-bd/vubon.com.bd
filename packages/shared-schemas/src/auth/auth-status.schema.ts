/**
 * Auth Status Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-status.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_STATUS } from '@vubon/shared-constants/auth';

export const AuthStatusSchema = z.enum(Object.values(AUTH_STATUS) as [string, ...string[]]);

export type AuthStatusSchemaType = z.infer<typeof AuthStatusSchema>;
