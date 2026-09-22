import type { VendorDocumentEntity } from '../../../domain/entities/vendor-document.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorDocumentServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorDocumentEntity[]>;
  save(document: VendorDocumentEntity): Promise<void>;
}
