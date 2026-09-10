import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { INVOICE } from '@vubon/shared-constants/src/business/payment/invoice.constants';

const invoiceStatusKeys = Object.keys(INVOICE.STATUS) as [string, ...string[]];

export const InvoiceStatusSchema = StatusSchema.extend({
  status: z.enum(invoiceStatusKeys),
  category: z.literal('invoice'),
});

export const InvoiceStatusEnumSchema = z.enum(invoiceStatusKeys);
