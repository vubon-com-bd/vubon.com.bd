/**
 * Auth Type Schema
 * @module shared-schemas/auth
 */

import { z } from 'zod';
import { AUTH_TYPE } from '@vubon/shared-constants/auth';

export const AuthTypeSchema = z.enum(Object.values(AUTH_TYPE) as [string, ...string[]]);

export type AuthTypeSchemaType = z.infer<typeof AuthTypeSchema>;
