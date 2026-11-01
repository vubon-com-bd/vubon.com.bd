/**
 * Vendor Document Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorDocumentEntity } from '../entities/vendor-document.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { DocumentIdVO } from '../value-objects/primitives/document-id.vo.js';

export const VENDOR_DOCUMENT_REPOSITORY = Symbol('VENDOR_DOCUMENT_REPOSITORY');

export interface VendorDocumentListFilter {
  readonly vendorId?: string;
  readonly type?: string | readonly string[];
  readonly status?: string | readonly string[];
  readonly isExpired?: boolean;
  readonly isExpiringSoon?: boolean;
  readonly expiringInDays?: number;
  readonly search?: string;
}

export interface VendorDocumentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'expiresAt' | 'uploadedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorDocumentListFilter;
}

export interface VendorDocumentPaginationResult {
  readonly items: readonly VendorDocumentEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorDocumentRepository
  extends BaseRepository<VendorDocumentEntity, string> {
  findByIdVO(id: DocumentIdVO): Promise<VendorDocumentEntity | null>;
  findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorDocumentEntity[]>;
  findByVendorAndType(
    vendorId: VendorIdVO | string,
    type: string,
  ): Promise<readonly VendorDocumentEntity[]>;
  findPendingReview(
    vendorId?: VendorIdVO | string,
  ): Promise<readonly VendorDocumentEntity[]>;
  findVerifiedByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorDocumentEntity[]>;
  findExpiringSoon(days: number): Promise<readonly VendorDocumentEntity[]>;
  findExpired(): Promise<readonly VendorDocumentEntity[]>;
  findPaginated(
    options: VendorDocumentListOptions,
  ): Promise<VendorDocumentPaginationResult>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  existsByVendorAndType(vendorId: string, type: string): Promise<boolean>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly pending: number;
    readonly verified: number;
    readonly rejected: number;
    readonly expired: number;
    readonly byType: Readonly<Record<string, number>>;
  }>;
}
