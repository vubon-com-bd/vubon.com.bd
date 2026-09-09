import { z } from 'zod';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants/src/admin/admin-department.constants';

const adminDepartmentKeys = Object.keys(ADMIN_DEPARTMENT) as [string, ...string[]];

export const AdminDepartmentSchema = z.object({
  department: z.enum(adminDepartmentKeys),
  category: z.literal('admin'),
});
