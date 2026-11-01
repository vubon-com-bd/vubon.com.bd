/**
 * Invoice Command Handlers — Barrel
 * @module payment-service/modules/invoice/commands
 */
import { GenerateInvoiceHandler } from '@application/commands/invoice/generate-invoice.handler';
import { SendInvoiceHandler } from '@application/commands/invoice/send-invoice.handler';
import { VoidInvoiceHandler } from '@application/commands/invoice/void-invoice.handler';

export const INVOICE_COMMAND_HANDLERS = [
  GenerateInvoiceHandler,
  SendInvoiceHandler,
  VoidInvoiceHandler,
] as const;
