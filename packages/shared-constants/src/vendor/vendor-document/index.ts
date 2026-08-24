/**
 * Vendor Document Constants Index
 * Export all vendor document constants and types for easy importing
 */

// Vendor Document Constants
export {
  VENDOR_DOCUMENT,
  vendorDocumentGetTypeLabel,
  vendorDocumentGetStatusLabel,
  vendorDocumentGetCategory,
  vendorDocumentGetFormatLabel,
  vendorDocumentIsVerified,
  vendorDocumentIsPending,
  vendorDocumentIsRejected,
  vendorDocumentGetExpiryMonths,
} from './vendor-document.constants';

export type {
  VendorDocumentType,
  VendorDocumentStatus,
  VendorDocumentCategory,
  VendorDocumentFormat,
} from './vendor-document.constants';

// Vendor Document Type Constants
export {
  VENDOR_DOCUMENT_TYPE,
  vendorDocumentTypeGetLabel,
  vendorDocumentTypeGetCategory,
  vendorDocumentTypeGetImportance,
  vendorDocumentTypeGetVerification,
  vendorDocumentTypeGetProcessingTime,
} from './vendor-document-type.constants';

export type {
  VendorDocumentTypeType,
  VendorDocumentTypeCategory,
  VendorDocumentImportance,
  VendorDocumentVerification,
} from './vendor-document-type.constants';

// Vendor Document Status Constants
export {
  VENDOR_DOCUMENT_STATUS,
  vendorDocumentStatusGetLabel,
  vendorDocumentStatusIsVerified,
  vendorDocumentStatusIsPending,
  vendorDocumentStatusIsRejected,
  vendorDocumentStatusIsExpired,
  vendorDocumentStatusGetCategory,
  vendorDocumentStatusCanTransition,
} from './vendor-document-status.constants';

export type {
  VendorDocumentStatusType,
  VendorDocumentStatusCategory,
  VendorDocumentStatusColor,
  VendorDocumentStatusIcon,
  VendorDocumentStatusTransition,
} from './vendor-document-status.constants';
