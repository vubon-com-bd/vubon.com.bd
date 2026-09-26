import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { VendorSubscriptionEntity } from '../../../../domain/entities/vendor-subscription.entity';
import { SubscriptionIdVO } from '../../../../domain/value-objects/primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '../../../../domain/value-objects/primitives/subscription-plan.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { PayoutAmountVO } from '../../../../domain/value-objects/primitives/payout-amount.vo';

interface SerializedSubscription {
  readonly id: string;
  readonly vendorId: string;
  readonly plan: string;
  readonly price: number;
  readonly currency: string;
  readonly startedAt: string;
  readonly expiresAt: string;
  readonly autoRenew: boolean;
  readonly cancelledAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'vendor:subscription';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class SubscriptionCacheRepository extends BaseCacheRepository<VendorSubscriptionEntity, SubscriptionIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: VendorSubscriptionEntity): SerializedSubscription {
    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      plan: entity.plan.value,
      price: entity.price.value.amount,
      currency: entity.price.value.currency,
      startedAt: entity.startedAt.toISOString(),
      expiresAt: entity.expiresAt.toISOString(),
      autoRenew: entity.autoRenew,
      cancelledAt: entity.cancelledAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedSubscription): VendorSubscriptionEntity {
    return VendorSubscriptionEntity.reconstitute(
      SubscriptionIdVO.create(data.id),
      {
        vendorId: VendorIdVO.create(data.vendorId),
        plan: SubscriptionPlanVO.create(data.plan),
        price: PayoutAmountVO.create(data.price, data.currency),
        startedAt: new Date(data.startedAt),
        expiresAt: new Date(data.expiresAt),
        autoRenew: data.autoRenew,
        cancelledAt: data.cancelledAt ? new Date(data.cancelledAt) : null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: SubscriptionIdVO): Promise<VendorSubscriptionEntity | null> {
    const raw = await this.redis.get<SerializedSubscription>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly VendorSubscriptionEntity[]> {
    return [];
  }

  async save(entity: VendorSubscriptionEntity): Promise<VendorSubscriptionEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: SubscriptionIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
