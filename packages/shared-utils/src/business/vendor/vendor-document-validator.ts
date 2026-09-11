import { VENDOR_DOCUMENT } from '@vubon/shared-constants/src/business/vendor/vendor-document.constants';

export interface VendorDocumentInput {
  type: string;
  name: string;
  fileUrl: string;
  status: string;
}

export const validateVendorDocument = (
  doc: Partial<VendorDocumentInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!doc.type) errors.push('Document type is required');
  if (doc.type && !Object.keys(VENDOR_DOCUMENT.TYPES).includes(doc.type)) {
    errors.push('Invalid document type');
  }
  if (!doc.name) errors.push('Document name is required');
  if (!doc.fileUrl) errors.push('Document URL is required');
  if (doc.status && !Object.keys(VENDOR_DOCUMENT.DOCUMENT_STATUS).includes(doc.status)) {
    errors.push('Invalid document status');
  }
  return { isValid: errors.length === 0, errors };
};
