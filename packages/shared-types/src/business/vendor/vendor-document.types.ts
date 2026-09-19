/**
 * Vendor Document Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-document.constants থেকে।
 */

import type {
  VENDOR_DOCUMENT_TYPE,
  VENDOR_DOCUMENT_STATUS,
} from '@vubon/shared-constants/business';
import type { VendorId, Url } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';

export type VendorDocumentTypeValue =
  (typeof VENDOR_DOCUMENT_TYPE)[keyof typeof VENDOR_DOCUMENT_TYPE];

export type VendorDocumentStatusValue =
  (typeof VENDOR_DOCUMENT_STATUS)[keyof typeof VENDOR_DOCUMENT_STATUS];

export interface VendorDocument extends BaseEntity<string> {
  readonly vendorId: VendorId;
  readonly type: VendorDocumentTypeValue;
  readonly status: VendorDocumentStatusValue;
  readonly fileUrl: Url;
  readonly fileName: string;
  readonly fileSize: number;
  readonly mimeType: string;
  readonly documentNumber?: string;
  readonly issuedAt?: string;
  readonly expiresAt?: string;
  readonly verifiedAt?: string;
  readonly verifiedBy?: string;
  readonly rejectionReason?: string;
  readonly notes?: string;
}

export interface VendorDocumentPublic {
  readonly id: string;
  readonly type: VendorDocumentTypeValue;
  readonly status: VendorDocumentStatusValue;
  readonly fileName: string;
  readonly uploadedAt: string;
  readonly expiresAt?: string;
}

export interface VendorDocumentUploadInput {
  readonly vendorId: VendorId;
  readonly type: VendorDocumentTypeValue;
  readonly fileUrl: string;
  readonly fileName: string;
  readonly documentNumber?: string;
  readonly issuedAt?: string;
  readonly expiresAt?: string;
}
