/**
 * Vendor Ticket Validator
 * ভেন্ডর টিকেট ভ্যালিডেটর
 */

import { VendorReportSchema } from '@vubon/shared-schemas';
import type { VendorTicket } from '@vubon/shared-types';

export interface VendorTicketValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorTicket;
}

export const validateVendorTicket = (data: unknown): VendorTicketValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid ticket data'] },
    };
  }

  const ticket = data as Record<string, unknown>;

  if (!ticket.vendorId || typeof ticket.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  if (!ticket.title || typeof ticket.title !== 'string' || ticket.title.length < 1) {
    errors.title = ['Ticket title is required'];
    valid = false;
  }

  if (
    !ticket.description ||
    typeof ticket.description !== 'string' ||
    ticket.description.length < 1
  ) {
    errors.description = ['Ticket description is required'];
    valid = false;
  }

  if (ticket.type) {
    const validTypes = ['support', 'complaint', 'inquiry', 'request', 'issue'] as string[];
    if (!validTypes.includes(ticket.type as string)) {
      errors.type = ['Invalid ticket type'];
      valid = false;
    }
  } else {
    errors.type = ['Ticket type is required'];
    valid = false;
  }

  if (ticket.priority) {
    const validPriorities = ['low', 'medium', 'high', 'critical'] as string[];
    if (!validPriorities.includes(ticket.priority as string)) {
      errors.priority = ['Invalid priority'];
      valid = false;
    }
  } else {
    errors.priority = ['Priority is required'];
    valid = false;
  }

  if (!ticket.category || typeof ticket.category !== 'string' || ticket.category.length < 1) {
    errors.category = ['Category is required'];
    valid = false;
  }

  try {
    const validatedData = VendorReportSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as unknown as VendorTicket,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorTicketCreate = (data: unknown): VendorTicketValidationResult => {
  return validateVendorTicket(data);
};

export const validateVendorTicketUpdate = (data: unknown): VendorTicketValidationResult => {
  return validateVendorTicket(data);
};
