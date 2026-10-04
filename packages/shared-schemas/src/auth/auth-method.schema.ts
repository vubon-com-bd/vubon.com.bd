/**
 * Auth Method Schema
 * @module shared-schemas/auth
 */

import { z } from 'zod';
import { AUTH_METHOD } from '@vubon/shared-constants/auth';

export const AuthMethodSchema = z.enum(Object.values(AUTH_METHOD) as [string, ...string[]]);

export type AuthMethodSchemaType = z.infer<typeof AuthMethodSchema>;
