import { z } from 'zod';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';

const adminDepartmentValues = Object.values(ADMIN_DEPARTMENT) as [string, ...string[]];

export const AdminDepartmentSchema = z.object({
  department: z.enum(adminDepartmentValues),
  category: z.literal('admin'),
});

export const AdminDepartmentEnumSchema = z.enum(adminDepartmentValues);
