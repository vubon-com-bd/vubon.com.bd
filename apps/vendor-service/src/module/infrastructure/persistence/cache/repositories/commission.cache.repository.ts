import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { VendorCommissionEntity } from '../../../../domain/entities/vendor-commission.entity';
import { CommissionIdVO } from '../../../../domain/value-objects/primitives/commission-id.vo';
import { CommissionRateVO } from '../../../../domain/value-objects/primitives/commission-rate.vo';
import { CommissionTypeVO } from '../../../../domain/value-objects/primitives/commission-type.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { PayoutAmountVO } from '../../../../domain/value-objects/primitives/payout-amount.vo';

interface SerializedCommission {
  readonly id: string;
  readonly vendorId: string;
  readonly orderId: string;
  readonly rate: number;
  readonly type: string;
  readonly orderAmount: number;
  readonly commissionAmount: number;
  readonly currency: string;
  readonly isSettled: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'vendor:commission';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class CommissionCacheRepository extends BaseCacheRepository<VendorCommissionEntity, CommissionIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: VendorCommissionEntity): SerializedCommission {
    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      orderId: entity.orderId.value,
      rate: entity.rate.numeric,
      type: entity.type.value,
      orderAmount: entity.orderAmount.value.amount,
      commissionAmount: entity.commissionAmount.value.amount,
      currency: entity.orderAmount.value.currency,
      isSettled: entity.isSettled,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedCommission): VendorCommissionEntity {
    return VendorCommissionEntity.reconstitute(
      CommissionIdVO.create(data.id),
      {
        vendorId: VendorIdVO.create(data.vendorId),
        orderId: OrderIdVO.create(data.orderId),
        rate: CommissionRateVO.create(String(data.rate)),
        type: CommissionTypeVO.create(data.type),
        orderAmount: PayoutAmountVO.create(data.orderAmount, data.currency),
        commissionAmount: PayoutAmountVO.create(data.commissionAmount, data.currency),
        isSettled: data.isSettled,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: CommissionIdVO): Promise<VendorCommissionEntity | null> {
    const raw = await this.redis.get<SerializedCommission>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly VendorCommissionEntity[]> {
    return [];
  }

  async save(entity: VendorCommissionEntity): Promise<VendorCommissionEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: CommissionIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
