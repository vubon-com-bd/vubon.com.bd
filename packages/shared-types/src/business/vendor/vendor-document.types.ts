import { BaseEntity } from '../../common/base.types';
import { VENDOR_DOCUMENT } from '@vubon/shared-constants/src/business/vendor/vendor-document.constants';
import { Vendor } from './vendor.types';

export interface VendorDocument extends BaseEntity {
  documentId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_DOCUMENT.TYPES | string;
  name: string;
  description?: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  status: keyof typeof VENDOR_DOCUMENT.DOCUMENT_STATUS | string;
  isVerified: boolean;
  verifiedAt?: Date;
  expiresAt?: Date;
  metadata: Record<string, unknown>;
}
