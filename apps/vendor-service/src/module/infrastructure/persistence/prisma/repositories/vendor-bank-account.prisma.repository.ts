import { Injectable } from '@nestjs/common';
import { VendorBankAccount as PrismaVendorBankAccount } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorBankAccountEntity } from '../../../../domain/entities/vendor-bank-account.entity';
import { BankAccountIdVO } from '../../../../domain/value-objects/primitives/bank-account-id.vo';
import { BankAccountNumberVO } from '../../../../domain/value-objects/primitives/bank-account-number.vo';
import { BankNameVO } from '../../../../domain/value-objects/primitives/bank-name.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorBankAccountRepository } from '../../../../domain/repositories/vendor-bank-account.repository.interface';

@Injectable()
export class VendorBankAccountPrismaRepository
  extends BasePrismaRepository<VendorBankAccountEntity, BankAccountIdVO>
  implements VendorBankAccountRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorBankAccount): VendorBankAccountEntity {
    return VendorBankAccountEntity.reconstitute(
      BankAccountIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        accountNumber: BankAccountNumberVO.create(raw.accountNumber),
        bankName: BankNameVO.create(raw.bankName),
        accountHolderName: raw.accountHolderName,
        branchName: raw.branchName,
        routingNumber: raw.routingNumber,
        isDefault: raw.isDefault,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: BankAccountIdVO): Promise<VendorBankAccountEntity | null> {
    const raw = await this.prisma.vendorBankAccount.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorBankAccountEntity[]> {
    const rows = await this.prisma.vendorBankAccount.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorBankAccountEntity): Promise<VendorBankAccountEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      accountNumber: entity.accountNumber.value,
      bankName: entity.bankName.value,
      accountHolderName: entity.accountHolderName,
      branchName: entity.branchName,
      routingNumber: entity.routingNumber,
      isDefault: entity.isDefault,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorBankAccount.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: BankAccountIdVO): Promise<void> {
    await this.prisma.vendorBankAccount.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorBankAccountEntity[]> {
    const rows = await this.prisma.vendorBankAccount.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDefault(vendorId: VendorIdVO): Promise<VendorBankAccountEntity | null> {
    const raw = await this.prisma.vendorBankAccount.findFirst({
      where: { vendorId: vendorId.value, isDefault: true },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
