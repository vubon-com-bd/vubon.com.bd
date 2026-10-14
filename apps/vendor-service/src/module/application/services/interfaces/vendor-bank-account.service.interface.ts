/**
 * IVendorBankAccountService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  AddBankAccountRequestDTO,
  UpdateBankAccountRequestDTO,
  DeleteBankAccountRequestDTO,
  SetDefaultAccountRequestDTO,
} from '../../dtos/requests/bank-account/index.js';
import type {
  BankAccountResponseDTO,
  BankAccountSummaryResponseDTO,
  BankAccountListResponseDTO,
} from '../../dtos/responses/bank-account-response.dto.js';

export const VENDOR_BANK_ACCOUNT_SERVICE = Symbol('VENDOR_BANK_ACCOUNT_SERVICE');

export interface IVendorBankAccountService {
  add(dto: AddBankAccountRequestDTO, actorId?: string): Promise<BankAccountResponseDTO>;
  update(dto: UpdateBankAccountRequestDTO, actorId?: string): Promise<BankAccountResponseDTO>;
  remove(dto: DeleteBankAccountRequestDTO): Promise<{ readonly success: true }>;
  setDefault(dto: SetDefaultAccountRequestDTO, actorId?: string): Promise<BankAccountResponseDTO>;
  verify(bankAccountId: string, actorId: string): Promise<BankAccountResponseDTO>;
  unverify(bankAccountId: string, actorId: string): Promise<BankAccountResponseDTO>;
  getById(id: string): Promise<BankAccountResponseDTO>;
  getDefault(vendorId: string): Promise<BankAccountResponseDTO | null>;
  listByVendor(vendorId: string): Promise<BankAccountListResponseDTO>;
  listVerified(vendorId: string): Promise<readonly BankAccountSummaryResponseDTO[]>;
}
