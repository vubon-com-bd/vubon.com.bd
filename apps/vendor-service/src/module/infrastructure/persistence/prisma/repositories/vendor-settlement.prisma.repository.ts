import { Injectable } from '@nestjs/common';
import { VendorSettlement as PrismaVendorSettlement } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorSettlementEntity } from '../../../../domain/entities/vendor-settlement.entity';
import { SettlementIdVO } from '../../../../domain/value-objects/primitives/settlement-id.vo';
import { SettlementStatusVO } from '../../../../domain/value-objects/primitives/settlement-status.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { PayoutAmountVO } from '../../../../domain/value-objects/primitives/payout-amount.vo';
import type { VendorSettlementRepository } from '../../../../domain/repositories/vendor-settlement.repository.interface';

@Injectable()
export class VendorSettlementPrismaRepository
  extends BasePrismaRepository<VendorSettlementEntity, SettlementIdVO>
  implements VendorSettlementRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorSettlement): VendorSettlementEntity {
    return VendorSettlementEntity.reconstitute(
      SettlementIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        status: SettlementStatusVO.create(raw.status),
        totalAmount: PayoutAmountVO.create(raw.totalAmount, raw.currency),
        commissionAmount: PayoutAmountVO.create(raw.commissionAmount, raw.currency),
        netAmount: PayoutAmountVO.create(raw.netAmount, raw.currency),
        periodStart: raw.periodStart,
        periodEnd: raw.periodEnd,
        settledAt: raw.settledAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: SettlementIdVO): Promise<VendorSettlementEntity | null> {
    const raw = await this.prisma.vendorSettlement.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.prisma.vendorSettlement.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorSettlementEntity): Promise<VendorSettlementEntity> {
    const currency = entity.totalAmount.currency;
    const data = {
      status: entity.status.value,
      totalAmount: entity.totalAmount.amount,
      commissionAmount: entity.commissionAmount.amount,
      netAmount: entity.netAmount.amount,
      currency,
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      settledAt: entity.settledAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorSettlement.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, vendorId: entity.vendorId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SettlementIdVO): Promise<void> {
    await this.prisma.vendorSettlement.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.prisma.vendorSettlement.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDue(): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.prisma.vendorSettlement.findMany({
      where: { status: 'pending', periodEnd: { lte: new Date() } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
