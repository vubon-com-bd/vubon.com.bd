import { z } from 'zod';
import { ADMIN_LEVEL } from '@vubon/shared-constants';

export const AdminLevelSchema = z.object({
  level: z.enum(Object.keys(ADMIN_LEVEL) as [string, ...string[]]),
  category: z.literal('admin'),
});

export const AdminLevelEnumSchema = z.enum(Object.keys(ADMIN_LEVEL) as [string, ...string[]]);
