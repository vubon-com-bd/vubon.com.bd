/**
 * Invoice Query Handlers — Barrel
 * @module payment-service/modules/invoice/queries
 */
import { GetInvoiceHandler } from '@application/queries/invoice/get-invoice.handler';
import { ListInvoicesHandler } from '@application/queries/invoice/list-invoices.handler';

export const INVOICE_QUERY_HANDLERS = [
  GetInvoiceHandler,
  ListInvoicesHandler,
] as const;
