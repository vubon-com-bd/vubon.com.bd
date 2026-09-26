import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorBankAccountEntity } from '../entities/vendor-bank-account.entity';
import { BankAccountIdVO } from '../value-objects/primitives/bank-account-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorBankAccountRepository
  extends BaseRepository<VendorBankAccountEntity, BankAccountIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorBankAccountEntity[]>;
  findDefault(vendorId: VendorIdVO): Promise<VendorBankAccountEntity | null>;
}
