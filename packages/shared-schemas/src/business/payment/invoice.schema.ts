/**
 * Invoice Schema
 * ইনভয়েস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_INVOICE } from '@vubon/shared-constants';

export const InvoiceSchema = BaseSchema.extend({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  orderId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  status: z.enum(Object.values(VENDOR_INVOICE.STATUS) as [string, ...string[]]),
  type: z.enum(Object.values(VENDOR_INVOICE.TYPES) as [string, ...string[]]).default('regular'),
  taxRate: z.number().min(0).default(15),
  taxAmount: z.number().min(0).default(0),
  discountRate: z.number().min(0).default(0),
  discountAmount: z.number().min(0).default(0),
  netAmount: z.number().min(0).default(0),
  dueDate: z.date(),
  issuedDate: z.date(),
  paidDate: z.date().optional(),
  paymentMethod: z.string().optional(),
  paymentId: z.string().uuid().optional(),
  description: z.string().optional(),
  descriptionBangla: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const InvoiceCreateSchema = InvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  invoiceNumber: true,
  taxAmount: true,
  discountAmount: true,
  netAmount: true,
});

export const InvoiceUpdateSchema = InvoiceCreateSchema.partial();

export type Invoice = z.infer<typeof InvoiceSchema>;
export type InvoiceCreate = z.infer<typeof InvoiceCreateSchema>;
export type InvoiceUpdate = z.infer<typeof InvoiceUpdateSchema>;
