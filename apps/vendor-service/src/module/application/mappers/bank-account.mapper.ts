/**
 * BankAccountMapper
 * @module vendor-service/application/mappers
 */
import type { VendorBankAccountEntity } from '../../domain/entities/vendor-bank-account.entity.js';
import type {
  BankAccountResponseDTO,
  BankAccountSummaryResponseDTO,
  BankAccountListResponseDTO,
} from '../dtos/responses/bank-account-response.dto.js';

export class BankAccountMapper {
  static toResponse(entity: VendorBankAccountEntity): BankAccountResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      bankName: entity.bankName.value,
      accountNumber: entity.accountNumber.value,
      maskedAccountNumber: entity.accountNumber.masked(),
      accountHolderName: entity.accountHolderName,
      branchName: entity.branchName,
      routingNumber: entity.routingNumber,
      swiftCode: entity.swiftCode,
      iban: entity.iban,
      accountType: entity.accountType,
      currency: entity.currency,
      isDefault: entity.isDefault,
      isVerified: entity.isVerified,
      verifiedAt: entity.verifiedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: VendorBankAccountEntity): BankAccountSummaryResponseDTO {
    return {
      id: entity.id,
      bankName: entity.bankName.value,
      maskedAccountNumber: entity.accountNumber.masked(),
      currency: entity.currency,
      isDefault: entity.isDefault,
      isVerified: entity.isVerified,
    };
  }

  static toListResponse(
    entities: readonly VendorBankAccountEntity[],
  ): BankAccountListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total: entities.length,
    };
  }
}
