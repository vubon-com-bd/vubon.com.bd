/**
 * User Status Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-status.constants থেকে।
 */

import { z } from 'zod';
import { USER_STATUS } from '@vubon/shared-constants/user';

export const UserStatusSchema = z.enum(Object.values(USER_STATUS) as [string, ...string[]]);

export type UserStatusSchemaType = z.infer<typeof UserStatusSchema>;
