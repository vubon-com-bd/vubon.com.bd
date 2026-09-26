import { Injectable } from '@nestjs/common';
import { VendorDocumentEntity } from '../../../domain/entities/vendor-document.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorDocumentRepository } from '../../../domain/repositories/vendor-document.repository.interface';

@Injectable()
export class VendorDocumentService {
  constructor(private readonly repo: VendorDocumentRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorDocumentEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(document: VendorDocumentEntity): Promise<void> {
    await this.repo.save(document);
  }
}
