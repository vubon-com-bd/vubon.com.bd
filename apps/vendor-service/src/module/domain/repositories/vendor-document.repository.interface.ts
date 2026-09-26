import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorDocumentEntity } from '../entities/vendor-document.entity';
import { DocumentIdVO } from '../value-objects/primitives/document-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorDocumentRepository
  extends BaseRepository<VendorDocumentEntity, DocumentIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorDocumentEntity[]>;
  findExpired(before: Date): Promise<readonly VendorDocumentEntity[]>;
}
