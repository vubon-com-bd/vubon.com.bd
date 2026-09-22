import { Injectable } from '@nestjs/common';
import { VendorBankAccountEntity } from '../../../domain/entities/vendor-bank-account.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorBankAccountRepository } from '../../../domain/repositories/vendor-bank-account.repository.interface';

@Injectable()
export class VendorBankAccountService {
  constructor(private readonly repo: VendorBankAccountRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorBankAccountEntity[]> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(account: VendorBankAccountEntity): Promise<void> {
    await this.repo.save(account);
  }
}
