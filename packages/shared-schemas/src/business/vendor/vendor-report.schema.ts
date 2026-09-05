/**
 * Vendor Report Schema
 * ভেন্ডর রিপোর্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_REPORT } from '@vubon/shared-constants';

export const VendorReportSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  type: z.enum(Object.values(VENDOR_REPORT.TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Report name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  periodStart: z.date(),
  periodEnd: z.date(),
  format: z.enum(Object.values(VENDOR_REPORT.FORMATS) as [string, ...string[]]),
  data: z.record(z.union([z.string(), z.number(), z.boolean(), z.object({})])),
  generatedAt: z.date().default(() => new Date()),
  generatedBy: z.string().uuid(),
  fileUrl: z.string().url().optional(),
  status: z.enum(Object.values(VENDOR_REPORT.STATUS) as [string, ...string[]]),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorReportCreateSchema = VendorReportSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  generatedAt: true,
  fileUrl: true,
});

export const VendorReportUpdateSchema = VendorReportCreateSchema.partial();

export type VendorReport = z.infer<typeof VendorReportSchema>;
export type VendorReportCreate = z.infer<typeof VendorReportCreateSchema>;
export type VendorReportUpdate = z.infer<typeof VendorReportUpdateSchema>;
