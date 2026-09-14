/**
 * Vendor Report Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-report.constants থেকে।
 */

import { z } from 'zod';
import {
  VENDOR_REPORT_TYPE,
  VENDOR_REPORT_FORMAT,
  VENDOR_REPORT_PERIOD,
} from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';

export const VendorReportTypeSchema = z.enum(
  Object.values(VENDOR_REPORT_TYPE) as [string, ...string[]]
);

export const VendorReportFormatSchema = z.enum(
  Object.values(VENDOR_REPORT_FORMAT) as [string, ...string[]]
);

export const VendorReportPeriodSchema = z.enum(
  Object.values(VENDOR_REPORT_PERIOD) as [string, ...string[]]
);

export const VendorReportSchema = z.object({
  id: UuidSchema,
  vendorId: UuidSchema,
  type: VendorReportTypeSchema,
  format: VendorReportFormatSchema,
  period: VendorReportPeriodSchema,
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().int().nonnegative().optional(),
  generatedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  generatedBy: z.string().optional(),
});

export const VendorReportSummarySchema = z.object({
  vendorId: UuidSchema,
  period: VendorReportPeriodSchema,
  totalOrders: z.number().int().nonnegative(),
  totalRevenue: MoneySchema,
  totalCommission: MoneySchema,
  totalPayout: MoneySchema,
  currency: z.string().length(3),
});

export type VendorReportTypeSchemaType = z.infer<typeof VendorReportTypeSchema>;
export type VendorReportFormatSchemaType = z.infer<typeof VendorReportFormatSchema>;
export type VendorReportPeriodSchemaType = z.infer<typeof VendorReportPeriodSchema>;
export type VendorReportSchemaType = z.infer<typeof VendorReportSchema>;
export type VendorReportSummarySchemaType = z.infer<typeof VendorReportSummarySchema>;
