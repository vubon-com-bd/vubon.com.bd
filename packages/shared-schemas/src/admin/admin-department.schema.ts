/**
 * Admin Department Schema
 * অ্যাডমিন ডিপার্টমেন্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants';

export const AdminDepartmentSchema = BaseSchema.extend({
  name: z.enum([
    ADMIN_DEPARTMENT.DEPARTMENTS.IT,
    ADMIN_DEPARTMENT.DEPARTMENTS.HR,
    ADMIN_DEPARTMENT.DEPARTMENTS.FINANCE,
    ADMIN_DEPARTMENT.DEPARTMENTS.MARKETING,
    ADMIN_DEPARTMENT.DEPARTMENTS.SALES,
    ADMIN_DEPARTMENT.DEPARTMENTS.SUPPORT,
    ADMIN_DEPARTMENT.DEPARTMENTS.OPERATIONS,
    ADMIN_DEPARTMENT.DEPARTMENTS.LEGAL,
    ADMIN_DEPARTMENT.DEPARTMENTS.COMPLIANCE,
    ADMIN_DEPARTMENT.DEPARTMENTS.ADMIN,
    ADMIN_DEPARTMENT.DEPARTMENTS.CONTENT,
    ADMIN_DEPARTMENT.DEPARTMENTS.PRODUCT,
    ADMIN_DEPARTMENT.DEPARTMENTS.ENGINEERING,
    ADMIN_DEPARTMENT.DEPARTMENTS.DESIGN,
  ]),
  code: z.string().min(2, 'Code is required'),
  description: z.string().optional(),
  headId: z.string().uuid().optional(),
  members: z.array(z.string().uuid()).default([]),
  parentDepartment: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminDepartmentCreateSchema = AdminDepartmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const AdminDepartmentUpdateSchema = AdminDepartmentSchema.partial();

export type AdminDepartmentSchemaType = z.infer<typeof AdminDepartmentSchema>;
export type AdminDepartmentCreateSchemaType = z.infer<typeof AdminDepartmentCreateSchema>;
export type AdminDepartmentUpdateSchemaType = z.infer<typeof AdminDepartmentUpdateSchema>;
