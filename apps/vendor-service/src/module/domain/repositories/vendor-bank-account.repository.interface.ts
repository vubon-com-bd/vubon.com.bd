/**
 * Vendor Bank Account Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorBankAccountEntity } from '../entities/vendor-bank-account.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { BankAccountIdVO } from '../value-objects/primitives/bank-account-id.vo.js';

export const VENDOR_BANK_ACCOUNT_REPOSITORY = Symbol(
  'VENDOR_BANK_ACCOUNT_REPOSITORY',
);

export interface VendorBankAccountListFilter {
  readonly vendorId?: string;
  readonly bankName?: string;
  readonly accountType?: string | readonly string[];
  readonly currency?: string;
  readonly isDefault?: boolean;
  readonly isVerified?: boolean;
  readonly search?: string;
}

export interface VendorBankAccountListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'bankName';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorBankAccountListFilter;
}

export interface VendorBankAccountPaginationResult {
  readonly items: readonly VendorBankAccountEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorBankAccountRepository
  extends BaseRepository<VendorBankAccountEntity, string> {
  findByIdVO(id: BankAccountIdVO): Promise<VendorBankAccountEntity | null>;
  findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorBankAccountEntity[]>;
  findDefaultByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorBankAccountEntity | null>;
  findVerifiedByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorBankAccountEntity[]>;
  findByAccountNumber(
    accountNumber: string,
  ): Promise<VendorBankAccountEntity | null>;
  findBySwiftCode(swiftCode: string): Promise<readonly VendorBankAccountEntity[]>;
  findPaginated(
    options: VendorBankAccountListOptions,
  ): Promise<VendorBankAccountPaginationResult>;
  existsByVendorAndAccountNumber(
    vendorId: string,
    accountNumber: string,
  ): Promise<boolean>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly verified: number;
    readonly defaultCount: number;
    readonly byCurrency: Readonly<Record<string, number>>;
  }>;
}
