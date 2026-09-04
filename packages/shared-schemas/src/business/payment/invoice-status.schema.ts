/**
 * Invoice Status Schema
 * ইনভয়েস স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_INVOICE } from '@vubon/shared-constants';

export const InvoiceStatusSchema = BaseSchema.extend({
  invoiceId: z.string().uuid(),
  status: z.enum(Object.values(VENDOR_INVOICE.STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z.enum(Object.values(VENDOR_INVOICE.STATUS) as [string, ...string[]]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const InvoiceStatusUpdateSchema = InvoiceStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;
export type InvoiceStatusUpdate = z.infer<typeof InvoiceStatusUpdateSchema>;
