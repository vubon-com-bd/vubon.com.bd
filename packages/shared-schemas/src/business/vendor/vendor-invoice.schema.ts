/**
 * Vendor Invoice Schema
 * ভেন্ডর ইনভয়েস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_INVOICE } from '@vubon/shared-constants';

export const VendorInvoiceSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  type: z.enum(Object.values(VENDOR_INVOICE.TYPES) as [string, ...string[]]),
  status: z.enum(Object.values(VENDOR_INVOICE.STATUS) as [string, ...string[]]),
  amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  taxRate: z.number().min(0).max(100).default(15),
  taxAmount: z.number().min(0).default(0),
  discountRate: z.number().min(0).default(0),
  discountAmount: z.number().min(0).default(0),
  netAmount: z.number().min(0).default(0),
  dueDate: z.date(),
  issuedDate: z.date(),
  paidDate: z.date().optional(),
  paymentMethod: z
    .enum(Object.values(VENDOR_INVOICE.PAYMENT_METHODS) as [string, ...string[]])
    .optional(),
  paymentId: z.string().uuid().optional(),
  description: z.string().optional(),
  descriptionBangla: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorInvoiceCreateSchema = VendorInvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  invoiceNumber: true,
  taxAmount: true,
  discountAmount: true,
  netAmount: true,
});

export const VendorInvoiceUpdateSchema = VendorInvoiceCreateSchema.partial();

export type VendorInvoice = z.infer<typeof VendorInvoiceSchema>;
export type VendorInvoiceCreate = z.infer<typeof VendorInvoiceCreateSchema>;
export type VendorInvoiceUpdate = z.infer<typeof VendorInvoiceUpdateSchema>;
