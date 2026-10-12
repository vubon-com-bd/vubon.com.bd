/**
 * UploadVendorDocumentRequestDto
 * @module vendor-service/application/dtos/requests
 */
import type { VENDOR_DOCUMENT_TYPE } from '@vubon/shared-constants/business';

export class UploadVendorDocumentRequestDto {
  vendorId!: string;
  type!: (typeof VENDOR_DOCUMENT_TYPE)[keyof typeof VENDOR_DOCUMENT_TYPE];
  fileUrl!: string;
  fileName!: string;
  mimeType!: string;
  fileSize!: number;
  documentNumber?: string;
  issuedAt?: string;
  expiresAt?: string;
  notes?: string;
  idempotencyKey?: string;
}
