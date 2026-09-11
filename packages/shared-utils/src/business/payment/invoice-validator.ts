import { INVOICE } from '@vubon/shared-constants/src/business/payment/invoice.constants';

export interface InvoiceInput {
  orderId: string;
  invoiceNumber: string;
  status: string;
  type: string;
}

export const validateInvoice = (
  invoice: Partial<InvoiceInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!invoice.orderId) errors.push('Order ID is required');
  if (!invoice.invoiceNumber) errors.push('Invoice number is required');
  if (invoice.status && !Object.keys(INVOICE.STATUS).includes(invoice.status)) {
    errors.push('Invalid invoice status');
  }
  if (invoice.type && !Object.keys(INVOICE.TYPES).includes(invoice.type)) {
    errors.push('Invalid invoice type');
  }
  return { isValid: errors.length === 0, errors };
};

export const isInvoicePaid = (invoice: InvoiceInput): boolean => {
  return invoice.status === 'paid';
};
