/**
 * IVendorDocumentService — contract
 * @module vendor-service/application/services/interfaces
 */
import type { UploadDocumentRequestDTO } from '../../dtos/requests/verification/upload-document.dto.js';
import type {
  DocumentResponseDTO,
  DocumentListResponseDTO,
} from '../../dtos/responses/verification-response.dto.js';

export const VENDOR_DOCUMENT_SERVICE = Symbol('VENDOR_DOCUMENT_SERVICE');

export interface DocumentListFilterDTO {
  readonly vendorId?: string;
  readonly type?: string | readonly string[];
  readonly status?: string | readonly string[];
  readonly isExpired?: boolean;
  readonly isExpiringSoon?: boolean;
  readonly expiringInDays?: number;
}

export interface DocumentListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'expiresAt' | 'uploadedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DocumentListFilterDTO;
}

export interface IVendorDocumentService {
  upload(dto: UploadDocumentRequestDTO, actorId?: string): Promise<DocumentResponseDTO>;
  approve(documentId: string, actorId: string): Promise<DocumentResponseDTO>;
  reject(documentId: string, reason: string, actorId: string): Promise<DocumentResponseDTO>;
  resubmit(documentId: string, fileUrl: string, fileName: string, fileSize: number, actorId?: string): Promise<DocumentResponseDTO>;
  remove(documentId: string, actorId?: string): Promise<{ readonly success: true }>;
  getById(id: string): Promise<DocumentResponseDTO>;
  listByVendor(vendorId: string): Promise<DocumentListResponseDTO>;
  listPending(limit?: number): Promise<readonly DocumentResponseDTO[]>;
  listExpiringSoon(days: number): Promise<readonly DocumentResponseDTO[]>;
  listExpired(): Promise<readonly DocumentResponseDTO[]>;
}
