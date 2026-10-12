/**
 * VendorDocumentResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type { VENDOR_DOCUMENT_TYPE, VENDOR_DOCUMENT_STATUS } from '@vubon/shared-constants/business';

export interface VendorDocumentResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly type: (typeof VENDOR_DOCUMENT_TYPE)[keyof typeof VENDOR_DOCUMENT_TYPE];
  readonly status: (typeof VENDOR_DOCUMENT_STATUS)[keyof typeof VENDOR_DOCUMENT_STATUS];
  readonly fileUrl: string;
  readonly fileName: string;
  readonly mimeType: string;
  readonly fileSize: number;
  readonly documentNumber?: string;
  readonly issuedAt?: string;
  readonly expiresAt?: string;
  readonly verifiedAt?: string;
  readonly verifiedBy?: string;
  readonly rejectionReason?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VendorDocumentPublicDto {
  readonly id: string;
  readonly type: (typeof VENDOR_DOCUMENT_TYPE)[keyof typeof VENDOR_DOCUMENT_TYPE];
  readonly status: (typeof VENDOR_DOCUMENT_STATUS)[keyof typeof VENDOR_DOCUMENT_STATUS];
  readonly fileName: string;
  readonly uploadedAt: string;
  readonly expiresAt?: string;
}
