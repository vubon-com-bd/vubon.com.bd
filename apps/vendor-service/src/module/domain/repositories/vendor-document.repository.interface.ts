/**
 * VendorDocumentRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorDocumentEntity } from '../entities/vendor-document.entity.js';
import { DocumentIdVO } from '../value-objects/primitives/document-id.vo.js';
import { DocumentTypeVO } from '../value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../value-objects/primitives/document-status.vo.js';

export const VENDOR_DOCUMENT_REPOSITORY = Symbol('VENDOR_DOCUMENT_REPOSITORY');

export interface VendorDocumentFilter {
  readonly vendorId?: string;
  readonly type?: string;
  readonly status?: string;
  readonly expiringInDays?: number;
}

export interface VendorDocumentRepository extends BaseRepository<VendorDocumentEntity, string> {
  findByIdVO(id: DocumentIdVO): Promise<VendorDocumentEntity | null>;
  findByVendorId(vendorId: string): Promise<readonly VendorDocumentEntity[]>;
  findByVendorIdAndType(vendorId: string, type: DocumentTypeVO): Promise<readonly VendorDocumentEntity[]>;
  findByStatus(status: DocumentStatusVO): Promise<readonly VendorDocumentEntity[]>;

  findLatestForVendorAndType(vendorId: string, type: DocumentTypeVO): Promise<VendorDocumentEntity | null>;

  /** Filtered search (renamed from findAll to avoid base signature clash). */
  search(filter: VendorDocumentFilter): Promise<readonly VendorDocumentEntity[]>;

  /** Documents expiring within N days. */
  findExpiring(days: number): Promise<readonly VendorDocumentEntity[]>;
  /** Already-expired documents. */
  findExpired(): Promise<readonly VendorDocumentEntity[]>;
  /** Documents awaiting review. */
  findPendingReview(): Promise<readonly VendorDocumentEntity[]>;

  countByVendor(vendorId: string): Promise<number>;
  countByStatus(status: DocumentStatusVO): Promise<number>;
  existsByVendorIdAndType(vendorId: string, type: DocumentTypeVO): Promise<boolean>;
  deleteByVendorId(vendorId: string): Promise<void>;
}
