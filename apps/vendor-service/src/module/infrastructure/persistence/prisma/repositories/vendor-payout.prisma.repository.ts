import { Injectable } from '@nestjs/common';
import { VendorPayout as PrismaVendorPayout } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorPayoutEntity } from '../../../../domain/entities/vendor-payout.entity';
import { PayoutIdVO } from '../../../../domain/value-objects/primitives/payout-id.vo';
import { PayoutAmountVO } from '../../../../domain/value-objects/primitives/payout-amount.vo';
import { PayoutStatusVO } from '../../../../domain/value-objects/primitives/payout-status.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { BankAccountIdVO } from '../../../../domain/value-objects/primitives/bank-account-id.vo';
import type { VendorPayoutRepository } from '../../../../domain/repositories/vendor-payout.repository.interface';

@Injectable()
export class VendorPayoutPrismaRepository
  extends BasePrismaRepository<VendorPayoutEntity, PayoutIdVO>
  implements VendorPayoutRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorPayout): VendorPayoutEntity {
    return VendorPayoutEntity.reconstitute(
      PayoutIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        bankAccountId: BankAccountIdVO.create(raw.bankAccountId),
        amount: PayoutAmountVO.create(raw.amount, raw.currency),
        status: PayoutStatusVO.create(raw.status),
        requestedAt: raw.requestedAt,
        processedAt: raw.processedAt,
        failureReason: raw.failureReason,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: PayoutIdVO): Promise<VendorPayoutEntity | null> {
    const raw = await this.prisma.vendorPayout.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.prisma.vendorPayout.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorPayoutEntity): Promise<VendorPayoutEntity> {
    const amountNum =
      typeof entity.amount.value === 'object'
        ? (entity.amount.value as { amount: number }).amount
        : entity.amount.value;

    const data = {
      vendorId: entity.vendorId.value,
      bankAccountId: entity.bankAccountId.value,
      amount: amountNum,
      currency: entity.amount.currency,
      status: entity.status.value,
      requestedAt: entity.requestedAt,
      processedAt: entity.processedAt,
      failureReason: entity.failureReason,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorPayout.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PayoutIdVO): Promise<void> {
    await this.prisma.vendorPayout.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.prisma.vendorPayout.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findPending(): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.prisma.vendorPayout.findMany({
      where: { status: 'pending' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
