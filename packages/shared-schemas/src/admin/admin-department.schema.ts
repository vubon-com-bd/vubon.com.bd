import { z } from 'zod';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants';

export const AdminDepartmentSchema = z.object({
  department: z.enum(Object.keys(ADMIN_DEPARTMENT) as [string, ...string[]]),
  category: z.literal('admin'),
});

export const AdminDepartmentEnumSchema = z.enum(
  Object.keys(ADMIN_DEPARTMENT) as [string, ...string[]]
);
