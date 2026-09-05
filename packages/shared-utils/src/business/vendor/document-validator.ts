/**
 * Vendor Document Validator
 * ভেন্ডর ডকুমেন্ট ভ্যালিডেটর
 */

import { VENDOR_DOCUMENT } from '@vubon/shared-constants';
import { VendorDocumentSchema } from '@vubon/shared-schemas';
import type { VendorDocument } from '@vubon/shared-types';

export interface VendorDocumentValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorDocument;
}

export const validateVendorDocument = (data: unknown): VendorDocumentValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid document data'] },
    };
  }

  const document = data as Record<string, unknown>;

  // Vendor ID validation
  if (!document.vendorId || typeof document.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  // Type validation - VENDOR_DOCUMENT.TYPES এর ভ্যালুগুলোর সাথে তুলনা
  if (document.type) {
    const typeValues = Object.values(VENDOR_DOCUMENT.TYPES) as string[];
    if (!typeValues.includes(document.type as string)) {
      errors.type = ['Invalid document type'];
      valid = false;
    }
  } else {
    errors.type = ['Document type is required'];
    valid = false;
  }

  // Name validation
  if (!document.name || typeof document.name !== 'string' || document.name.length < 1) {
    errors.name = ['Document name is required'];
    valid = false;
  }

  // File URL validation
  if (!document.fileUrl || typeof document.fileUrl !== 'string') {
    errors.fileUrl = ['File URL is required'];
    valid = false;
  } else {
    try {
      new URL(document.fileUrl as string);
    } catch {
      errors.fileUrl = ['Invalid file URL'];
      valid = false;
    }
  }

  // File name validation
  if (!document.fileName || typeof document.fileName !== 'string' || document.fileName.length < 1) {
    errors.fileName = ['File name is required'];
    valid = false;
  }

  // MIME type validation - VENDOR_DOCUMENT ব্যবহার
  if (!document.mimeType || typeof document.mimeType !== 'string') {
    errors.mimeType = ['MIME type is required'];
    valid = false;
  } else {
    const allowedFormats = VENDOR_DOCUMENT.DEFAULTS.ALLOWED_FORMATS;
    const mimeType = document.mimeType as string;
    const isValidMime = allowedFormats.some((format) => mimeType.includes(format));
    if (!isValidMime) {
      errors.mimeType = [`Invalid MIME type. Allowed: ${allowedFormats.join(', ')}`];
      valid = false;
    }
  }

  // File size validation - VENDOR_DOCUMENT ব্যবহার
  if (document.fileSize !== undefined) {
    const fileSize = document.fileSize as number;
    const maxSize = VENDOR_DOCUMENT.DEFAULTS.MAX_SIZE;
    if (fileSize > maxSize) {
      errors.fileSize = [`File size must be less than ${maxSize / 1024 / 1024}MB`];
      valid = false;
    }
  }

  try {
    const validatedData = VendorDocumentSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as VendorDocument,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorDocumentCreate = (data: unknown): VendorDocumentValidationResult => {
  return validateVendorDocument(data);
};

export const validateVendorDocumentUpdate = (data: unknown): VendorDocumentValidationResult => {
  return validateVendorDocument(data);
};
