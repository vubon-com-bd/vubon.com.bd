import { z } from 'zod';
import { ADMIN_LEVEL } from '@vubon/shared-constants/src/admin/admin-level.constants';

const adminLevelValues = Object.values(ADMIN_LEVEL) as [string, ...string[]];

export const AdminLevelSchema = z.object({
  level: z.enum(adminLevelValues),
  category: z.literal('admin'),
});

export const AdminLevelEnumSchema = z.enum(adminLevelValues);
