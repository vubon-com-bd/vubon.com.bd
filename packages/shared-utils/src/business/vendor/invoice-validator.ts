import { VENDOR_INVOICE } from '@vubon/shared-constants/src/business/vendor/vendor-invoice.constants';

export interface InvoiceInput {
  vendorId: string;
  amount: number;
  status: string;
}

export const validateVendorInvoice = (
  invoice: Partial<InvoiceInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!invoice.vendorId) errors.push('Vendor ID is required');
  if (invoice.amount !== undefined && invoice.amount < 0) {
    errors.push('Amount cannot be negative');
  }
  if (invoice.status && !Object.keys(VENDOR_INVOICE.STATUS).includes(invoice.status)) {
    errors.push('Invalid invoice status');
  }
  return { isValid: errors.length === 0, errors };
};
