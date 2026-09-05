/**
 * Vendor Invoice Validator
 * ভেন্ডর ইনভয়েস ভ্যালিডেটর
 */

import { VENDOR_INVOICE } from '@vubon/shared-constants';
import { VendorInvoiceSchema } from '@vubon/shared-schemas';
import type { VendorInvoice } from '@vubon/shared-types';

export interface VendorInvoiceValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorInvoice;
}

export const validateVendorInvoice = (data: unknown): VendorInvoiceValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid invoice data'] },
    };
  }

  const invoice = data as Record<string, unknown>;

  // Vendor ID validation
  if (!invoice.vendorId || typeof invoice.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  // Invoice number validation
  if (
    !invoice.invoiceNumber ||
    typeof invoice.invoiceNumber !== 'string' ||
    invoice.invoiceNumber.length < 1
  ) {
    errors.invoiceNumber = ['Invoice number is required'];
    valid = false;
  }

  // Type validation - VENDOR_INVOICE ব্যবহার
  if (invoice.type) {
    const typeValues = Object.values(VENDOR_INVOICE.TYPES) as string[];
    if (!typeValues.includes(invoice.type as string)) {
      errors.type = ['Invalid invoice type'];
      valid = false;
    }
  } else {
    errors.type = ['Invoice type is required'];
    valid = false;
  }

  // Status validation - VENDOR_INVOICE ব্যবহার
  if (invoice.status) {
    const statusValues = Object.values(VENDOR_INVOICE.STATUS) as string[];
    if (!statusValues.includes(invoice.status as string)) {
      errors.status = ['Invalid invoice status'];
      valid = false;
    }
  }

  // Amount validation
  if (invoice.amount !== undefined) {
    if (typeof invoice.amount !== 'number' || invoice.amount < 0) {
      errors.amount = ['Amount must be a positive number'];
      valid = false;
    }
  } else {
    errors.amount = ['Amount is required'];
    valid = false;
  }

  // Due date validation
  if (!invoice.dueDate) {
    errors.dueDate = ['Due date is required'];
    valid = false;
  } else {
    const dueDate = new Date(invoice.dueDate as string);
    if (isNaN(dueDate.getTime())) {
      errors.dueDate = ['Invalid due date'];
      valid = false;
    }
  }

  // Tax rate validation - VENDOR_INVOICE ব্যবহার
  if (invoice.taxRate !== undefined) {
    const taxRate = invoice.taxRate as number;
    if (taxRate < 0 || taxRate > 100) {
      errors.taxRate = ['Tax rate must be between 0 and 100'];
      valid = false;
    }
  }

  // Discount rate validation - VENDOR_INVOICE ব্যবহার
  if (invoice.discountRate !== undefined) {
    const discountRate = invoice.discountRate as number;
    if (discountRate < 0 || discountRate > 100) {
      errors.discountRate = ['Discount rate must be between 0 and 100'];
      valid = false;
    }
  }

  try {
    const validatedData = VendorInvoiceSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as VendorInvoice,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorInvoiceCreate = (data: unknown): VendorInvoiceValidationResult => {
  return validateVendorInvoice(data);
};

export const validateVendorInvoiceUpdate = (data: unknown): VendorInvoiceValidationResult => {
  return validateVendorInvoice(data);
};
