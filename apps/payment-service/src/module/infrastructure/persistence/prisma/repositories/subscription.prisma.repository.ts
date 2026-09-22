import { Injectable } from '@nestjs/common';
import { Subscription as PrismaSubscription } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SubscriptionEntity } from '../../../../domain/entities/subscription.entity';
import { SubscriptionIdVO } from '../../../../domain/value-objects/primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '../../../../domain/value-objects/primitives/subscription-plan.vo';
import { SubscriptionStatusVO } from '../../../../domain/value-objects/primitives/subscription-status.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { SubscriptionRepository } from '../../../../domain/repositories/subscription.repository.interface';

@Injectable()
export class SubscriptionPrismaRepository
  extends BasePrismaRepository<SubscriptionEntity, SubscriptionIdVO>
  implements SubscriptionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSubscription): SubscriptionEntity {
    return SubscriptionEntity.reconstitute(
      SubscriptionIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        plan: SubscriptionPlanVO.create(raw.plan),
        status: SubscriptionStatusVO.create(raw.status),
        paymentMethodId: raw.paymentMethodId,
        currentPeriodFrom: raw.currentPeriodFrom,
        currentPeriodTo: raw.currentPeriodTo,
        cancelledAt: raw.cancelledAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: SubscriptionIdVO): Promise<SubscriptionEntity | null> {
    const raw = await this.prisma.subscription.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SubscriptionEntity[]> {
    const rows = await this.prisma.subscription.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SubscriptionEntity): Promise<SubscriptionEntity> {
    const data = {
      userId: entity.userId.value,
      plan: entity.plan.value,
      status: entity.status.value,
      paymentMethodId: entity.paymentMethodId,
      currentPeriodFrom: entity.currentPeriodFrom,
      currentPeriodTo: entity.currentPeriodTo,
      cancelledAt: entity.cancelledAt,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.subscription.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SubscriptionIdVO): Promise<void> {
    await this.prisma.subscription.delete({ where: { id: id.value } });
  }

  async findActiveByUser(userId: UserIdVO): Promise<readonly SubscriptionEntity[]> {
    const rows = await this.prisma.subscription.findMany({
      where: { userId: userId.value, status: 'active' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDueForRenewal(before: Date): Promise<readonly SubscriptionEntity[]> {
    const rows = await this.prisma.subscription.findMany({
      where: { status: 'active', currentPeriodTo: { lte: before } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
