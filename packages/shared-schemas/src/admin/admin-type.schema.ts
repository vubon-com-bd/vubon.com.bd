import { z } from 'zod';
import { ADMIN_TYPES } from '@vubon/shared-constants/src/admin/admin-type.constants';

const adminTypeValues = Object.values(ADMIN_TYPES) as [string, ...string[]];

export const AdminTypeSchema = z.object({
  type: z.enum(adminTypeValues),
  category: z.literal('admin'),
});

export const AdminTypeEnumSchema = z.enum(adminTypeValues);
