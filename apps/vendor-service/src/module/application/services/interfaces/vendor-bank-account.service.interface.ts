import type { VendorBankAccountEntity } from '../../../domain/entities/vendor-bank-account.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface VendorBankAccountServiceInterface {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorBankAccountEntity[]>;
  save(account: VendorBankAccountEntity): Promise<void>;
}
