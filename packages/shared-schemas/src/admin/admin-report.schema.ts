/**
 * Admin Report Schema
 * অ্যাডমিন রিপোর্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';

export const AdminReportSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  name: z
    .string()
    .min(1, 'Report name is required')
    .max(100, 'Report name must be less than 100 characters'),
  type: z.enum(['daily', 'weekly', 'monthly', 'custom']),
  format: z.enum(['pdf', 'csv', 'excel', 'json']),
  data: z.record(z.unknown()),
  filters: z.record(z.unknown()).optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).default('pending'),
  downloadUrl: z.string().url().optional(),
  expiresAt: z.date().optional(),
  generatedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminReportCreateSchema = AdminReportSchema.omit({
  id: true,
  status: true,
  downloadUrl: true,
  generatedAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  expiresIn: z.number().int().positive().optional(),
});

export const AdminReportUpdateSchema = AdminReportSchema.partial();

export type AdminReportSchemaType = z.infer<typeof AdminReportSchema>;
export type AdminReportCreateSchemaType = z.infer<typeof AdminReportCreateSchema>;
export type AdminReportUpdateSchemaType = z.infer<typeof AdminReportUpdateSchema>;
