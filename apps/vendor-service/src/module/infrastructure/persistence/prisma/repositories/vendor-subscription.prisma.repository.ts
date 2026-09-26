import { Injectable } from '@nestjs/common';
import { VendorSubscription as PrismaVendorSubscription } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorSubscriptionEntity } from '../../../../domain/entities/vendor-subscription.entity';
import { SubscriptionIdVO } from '../../../../domain/value-objects/primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '../../../../domain/value-objects/primitives/subscription-plan.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { PayoutAmountVO } from '../../../../domain/value-objects/primitives/payout-amount.vo';
import type { VendorSubscriptionRepository } from '../../../../domain/repositories/vendor-subscription.repository.interface';

@Injectable()
export class VendorSubscriptionPrismaRepository
  extends BasePrismaRepository<VendorSubscriptionEntity, SubscriptionIdVO>
  implements VendorSubscriptionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorSubscription): VendorSubscriptionEntity {
    return VendorSubscriptionEntity.reconstitute(
      SubscriptionIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        plan: SubscriptionPlanVO.create(raw.plan),
        price: PayoutAmountVO.create(raw.price, raw.currency),
        startedAt: raw.startedAt,
        expiresAt: raw.expiresAt,
        autoRenew: raw.autoRenew,
        cancelledAt: raw.cancelledAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: SubscriptionIdVO): Promise<VendorSubscriptionEntity | null> {
    const raw = await this.prisma.vendorSubscription.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.prisma.vendorSubscription.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorSubscriptionEntity): Promise<VendorSubscriptionEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      plan: entity.plan.value,
      price: entity.price.amount,
      currency: entity.price.currency,
      startedAt: entity.startedAt,
      expiresAt: entity.expiresAt,
      autoRenew: entity.autoRenew,
      cancelledAt: entity.cancelledAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorSubscription.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SubscriptionIdVO): Promise<void> {
    await this.prisma.vendorSubscription.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.prisma.vendorSubscription.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(vendorId: VendorIdVO): Promise<VendorSubscriptionEntity | null> {
    const raw = await this.prisma.vendorSubscription.findFirst({
      where: {
        vendorId: vendorId.value,
        cancelledAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
