import { Injectable } from '@nestjs/common';
import { VendorCommission as PrismaVendorCommission } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorCommissionEntity } from '../../../../domain/entities/vendor-commission.entity';
import { CommissionIdVO } from '../../../../domain/value-objects/primitives/commission-id.vo';
import { CommissionRateVO } from '../../../../domain/value-objects/primitives/commission-rate.vo';
import { CommissionTypeVO } from '../../../../domain/value-objects/primitives/commission-type.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { PayoutAmountVO } from '../../../../domain/value-objects/primitives/payout-amount.vo';
import type { VendorCommissionRepository } from '../../../../domain/repositories/vendor-commission.repository.interface';

@Injectable()
export class VendorCommissionPrismaRepository
  extends BasePrismaRepository<VendorCommissionEntity, CommissionIdVO>
  implements VendorCommissionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorCommission): VendorCommissionEntity {
    return VendorCommissionEntity.reconstitute(
      CommissionIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        orderId: OrderIdVO.create(raw.orderId),
        rate: CommissionRateVO.create(String(raw.rate)),
        type: CommissionTypeVO.create(raw.type),
        orderAmount: PayoutAmountVO.create(raw.orderAmount, raw.currency),
        commissionAmount: PayoutAmountVO.create(raw.commissionAmount, raw.currency),
        isSettled: raw.isSettled,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: CommissionIdVO): Promise<VendorCommissionEntity | null> {
    const raw = await this.prisma.vendorCommission.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorCommissionEntity[]> {
    const rows = await this.prisma.vendorCommission.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorCommissionEntity): Promise<VendorCommissionEntity> {
    const orderAmountNum =
      typeof entity.orderAmount.value === 'object'
        ? (entity.orderAmount.value as { amount: number }).amount
        : entity.orderAmount.value;
    const commissionAmountNum =
      typeof entity.commissionAmount.value === 'object'
        ? (entity.commissionAmount.value as { amount: number }).amount
        : entity.commissionAmount.value;

    const data = {
      vendorId: entity.vendorId.value,
      orderId: entity.orderId.value,
      rate: entity.rate.numeric,
      type: entity.type.value,
      orderAmount: orderAmountNum,
      commissionAmount: commissionAmountNum,
      currency: entity.orderAmount.currency,
      isSettled: entity.isSettled,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorCommission.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CommissionIdVO): Promise<void> {
    await this.prisma.vendorCommission.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorCommissionEntity[]> {
    const rows = await this.prisma.vendorCommission.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByOrderId(orderId: OrderIdVO): Promise<VendorCommissionEntity | null> {
    const raw = await this.prisma.vendorCommission.findFirst({
      where: { orderId: orderId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findUnsettled(vendorId: VendorIdVO): Promise<readonly VendorCommissionEntity[]> {
    const rows = await this.prisma.vendorCommission.findMany({
      where: { vendorId: vendorId.value, isSettled: false },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
