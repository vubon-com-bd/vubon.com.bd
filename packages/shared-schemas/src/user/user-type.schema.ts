/**
 * User Type Schema
 * @module shared-schemas/user
 */

import { z } from 'zod';
import { USER_TYPE } from '@vubon/shared-constants/user';

export const UserTypeSchema = z.enum(Object.values(USER_TYPE) as [string, ...string[]]);

export type UserTypeSchemaType = z.infer<typeof UserTypeSchema>;
