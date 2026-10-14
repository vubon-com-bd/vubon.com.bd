/**
 * VendorBankAccountPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorBankAccountEntity } from '../../../../domain/entities/vendor-bank-account.entity.js';
import { VendorBankAccountVO } from '../../../../domain/value-objects/composites/vendor-bank-account.vo.js';
import { BankAccountIdVO } from '../../../../domain/value-objects/primitives/bank-account-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { BankNameVO } from '../../../../domain/value-objects/primitives/bank-name.vo.js';
import { BankAccountNumberVO } from '../../../../domain/value-objects/primitives/bank-account-number.vo.js';

export interface VendorBankAccountPrismaRow {
  id: string;
  vendorId: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branchName: string | null;
  routingNumber: string | null;
  swiftCode: string | null;
  iban: string | null;
  accountType: string;
  currency: string;
  isDefault: boolean;
  isVerified: boolean;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class VendorBankAccountPrismaMapper {
  static toDomain(raw: VendorBankAccountPrismaRow): VendorBankAccountEntity {
    const vo = VendorBankAccountVO.reconstitute({
      id: BankAccountIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      bankName: BankNameVO.reconstitute(raw.bankName),
      accountNumber: BankAccountNumberVO.reconstitute(raw.accountNumber),
      accountHolderName: raw.accountHolderName,
      branchName: raw.branchName ?? undefined,
      routingNumber: raw.routingNumber ?? undefined,
      swiftCode: raw.swiftCode ?? undefined,
      iban: raw.iban ?? undefined,
      accountType: raw.accountType as never,
      currency: raw.currency,
      isDefault: raw.isDefault,
      isVerified: raw.isVerified,
      verifiedAt: raw.verifiedAt ? new Date(raw.verifiedAt).toISOString() : undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorBankAccountEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorBankAccountEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      bankName: vo.bankName.value,
      accountNumber: vo.accountNumber.value,
      accountHolderName: vo.accountHolderName,
      branchName: vo.branchName ?? null,
      routingNumber: vo.routingNumber ?? null,
      swiftCode: vo.swiftCode ?? null,
      iban: vo.iban ?? null,
      accountType: vo.accountType,
      currency: vo.currency,
      isDefault: vo.isDefault,
      isVerified: vo.isVerified,
      verifiedAt: vo.verifiedAt ? new Date(vo.verifiedAt) : null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
