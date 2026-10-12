/**
 * IVendorDocumentService
 * @module vendor-service/application/services/interfaces
 */
import type { UploadVendorDocumentRequestDto } from '../../dtos/requests/upload-document.dto.js';
import type {
  VendorDocumentResponseDto,
  VendorDocumentPublicDto,
} from '../../dtos/responses/vendor-document-response.dto.js';

export const VENDOR_DOCUMENT_SERVICE = Symbol('VENDOR_DOCUMENT_SERVICE');

export interface IVendorDocumentService {
  upload(dto: UploadVendorDocumentRequestDto, actorId?: string): Promise<VendorDocumentResponseDto>;
  verify(documentId: string, verifiedBy: string, actorId?: string): Promise<VendorDocumentResponseDto>;
  reject(documentId: string, reason: string, actorId?: string): Promise<VendorDocumentResponseDto>;
  resubmit(documentId: string, fileUrl: string, actorId?: string): Promise<VendorDocumentResponseDto>;
  getById(documentId: string): Promise<VendorDocumentResponseDto>;
  listByVendor(vendorId: string): Promise<readonly VendorDocumentResponseDto[]>;
  listPublicByVendor(vendorId: string): Promise<readonly VendorDocumentPublicDto[]>;
}
