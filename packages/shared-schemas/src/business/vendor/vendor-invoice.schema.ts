/**
 * Vendor Invoice Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-invoice.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_INVOICE_STATUS, VENDOR_INVOICE_TYPE } from '@vubon/shared-constants/business';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema, PositiveMoneySchema } from '../../common/primitives/money.schema';

export const VendorInvoiceStatusSchema = z.enum(
  Object.values(VENDOR_INVOICE_STATUS) as [string, ...string[]]
);

export const VendorInvoiceTypeSchema = z.enum(
  Object.values(VENDOR_INVOICE_TYPE) as [string, ...string[]]
);

export const VendorInvoiceSchema = BaseEntitySchema.extend({
  vendorId: UuidSchema,
  invoiceNumber: z.string().min(1).max(50),
  type: VendorInvoiceTypeSchema,
  status: VendorInvoiceStatusSchema,
  amount: PositiveMoneySchema,
  taxAmount: MoneySchema.optional(),
  totalAmount: PositiveMoneySchema,
  currency: z.string().length(3),
  issueDate: z.string().datetime(),
  dueDate: z.string().datetime(),
  paidAt: z.string().datetime().optional(),
  periodStart: z.string().datetime().optional(),
  periodEnd: z.string().datetime().optional(),
  orderIds: z.array(UuidSchema).max(1000).optional(),
  notes: z.string().max(1000).optional(),
  pdfUrl: z.string().url().optional(),
});

export const VendorInvoicePublicSchema = VendorInvoiceSchema.pick({
  id: true,
  invoiceNumber: true,
  type: true,
  status: true,
  totalAmount: true,
  currency: true,
  issueDate: true,
  dueDate: true,
  paidAt: true,
});

export type VendorInvoiceStatusSchemaType = z.infer<typeof VendorInvoiceStatusSchema>;
export type VendorInvoiceTypeSchemaType = z.infer<typeof VendorInvoiceTypeSchema>;
export type VendorInvoiceSchemaType = z.infer<typeof VendorInvoiceSchema>;
export type VendorInvoicePublicSchemaType = z.infer<typeof VendorInvoicePublicSchema>;
