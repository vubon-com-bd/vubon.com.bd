/**
 * Vendor Invoice Generator
 * ভেন্ডর ইনভয়েস জেনারেটর
 */

import { idGenerator } from '../../common/generator/id-generator';
import { formatDate, formatCurrency } from '../../common/formatter';
import type { VendorInvoice } from '@vubon/shared-types';

export interface VendorInvoiceGenerationResult {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: string;
  taxAmount: string;
  discountAmount: string;
  netAmount: string;
  currency: string;
}

export const generateVendorInvoice = (
  invoice: VendorInvoice,
  currency: 'BDT' | 'USD' = 'BDT'
): VendorInvoiceGenerationResult => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  const invoiceNumber = invoice.invoiceNumber || generateVendorInvoiceNumber();
  const invoiceDate = formatDate(invoice.issuedDate, 'DD-MM-YYYY');
  const dueDate = formatDate(invoice.dueDate, 'DD-MM-YYYY');

  return {
    invoiceNumber,
    invoiceDate,
    dueDate,
    amount: formatPrice(invoice.amount),
    taxAmount: formatPrice(invoice.taxAmount),
    discountAmount: formatPrice(invoice.discountAmount),
    netAmount: formatPrice(invoice.netAmount),
    currency: currency,
  };
};

export const generateVendorInvoiceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = idGenerator.numericId(4);

  return `INV-${year}${month}${day}-${random}`;
};

export const generateVendorInvoicePDF = (invoice: VendorInvoice): string => {
  return `Invoice #${invoice.invoiceNumber}\nAmount: ${invoice.amount}\nDue Date: ${invoice.dueDate}`;
};

export const generateVendorInvoiceCSV = (invoices: VendorInvoice[]): string => {
  const headers = ['Invoice Number', 'Amount', 'Currency', 'Status', 'Due Date', 'Issued Date'];
  const rows = invoices.map((inv) => [
    inv.invoiceNumber,
    inv.amount.toString(),
    'BDT',
    inv.status,
    inv.dueDate.toISOString(),
    inv.issuedDate.toISOString(),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
};
