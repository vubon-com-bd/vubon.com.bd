import { z } from 'zod';
import { UserTypeSchema } from '../user/user-type.schema';
import { ADMIN_TYPES } from '@vubon/shared-constants';

export const AdminTypeSchema = UserTypeSchema.extend({
  type: z.enum(Object.keys(ADMIN_TYPES) as [string, ...string[]]),
  category: z.literal('admin'),
});

export const AdminTypeEnumSchema = z.enum(Object.keys(ADMIN_TYPES) as [string, ...string[]]);
