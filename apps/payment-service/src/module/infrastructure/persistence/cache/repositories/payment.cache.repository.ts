import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { PaymentEntity } from '../../../../domain/entities/payment.entity';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PaymentAmountVO } from '../../../../domain/value-objects/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../../../../domain/value-objects/primitives/payment-currency.vo';
import { PaymentStatusVO } from '../../../../domain/value-objects/primitives/payment-status.vo';
import { PaymentTypeVO } from '../../../../domain/value-objects/primitives/payment-type.vo';
import { PaymentGatewayVO } from '../../../../domain/value-objects/primitives/payment-gateway.vo';

interface SerializedPayment {
  readonly id: string;
  readonly orderId: string;
  readonly userId: string;
  readonly type: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly gateway: string | null;
  readonly gatewayPaymentId: string | null;
  readonly capturedAt: string | null;
  readonly failureReason: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'payment:payment';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class PaymentCacheRepository extends BaseCacheRepository<PaymentEntity, PaymentIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: PaymentEntity): SerializedPayment {
    return {
      id: entity.id.value,
      orderId: entity.orderId.value,
      userId: entity.userId.value,
      type: entity.type.value,
      status: entity.status.value,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      gateway: entity.gateway?.value ?? null,
      gatewayPaymentId: entity.gatewayPaymentId,
      capturedAt: entity.capturedAt?.toISOString() ?? null,
      failureReason: entity.failureReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedPayment): PaymentEntity {
    return PaymentEntity.reconstitute(
      PaymentIdVO.create(data.id),
      {
        orderId: OrderIdVO.create(data.orderId),
        userId: UserIdVO.create(data.userId),
        type: PaymentTypeVO.create(data.type),
        status: PaymentStatusVO.create(data.status),
        amount: PaymentAmountVO.create(data.amount),
        currency: PaymentCurrencyVO.create(data.currency),
        gateway: data.gateway ? PaymentGatewayVO.create(data.gateway) : null,
        gatewayPaymentId: data.gatewayPaymentId,
        capturedAt: data.capturedAt ? new Date(data.capturedAt) : null,
        failureReason: data.failureReason,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: PaymentIdVO): Promise<PaymentEntity | null> {
    const raw = await this.redis.get<SerializedPayment>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly PaymentEntity[]> {
    return [];
  }

  async save(entity: PaymentEntity): Promise<PaymentEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: PaymentIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
