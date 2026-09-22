import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { PaymentMethodEntity } from '../../../../domain/entities/payment-method.entity';
import { PaymentMethodIdVO } from '../../../../domain/value-objects/primitives/payment-method-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PaymentMethodTypeVO } from '../../../../domain/value-objects/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '../../../../domain/value-objects/primitives/payment-method-provider.vo';

interface SerializedMethod {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly provider: string | null;
  readonly cardToken: string | null;
  readonly cardLast4: string | null;
  readonly cardBrand: string | null;
  readonly cardExpiry: string | null;
  readonly isDefault: boolean;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'payment:method';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class MethodCacheRepository extends BaseCacheRepository<PaymentMethodEntity, PaymentMethodIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: PaymentMethodEntity): SerializedMethod {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      provider: entity.provider?.value ?? null,
      cardToken: entity.cardToken,
      cardLast4: entity.cardLast4,
      cardBrand: entity.cardBrand,
      cardExpiry: entity.cardExpiry,
      isDefault: entity.isDefault,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedMethod): PaymentMethodEntity {
    return PaymentMethodEntity.reconstitute(
      PaymentMethodIdVO.create(data.id),
      {
        userId: UserIdVO.create(data.userId),
        type: PaymentMethodTypeVO.create(data.type),
        provider: data.provider ? PaymentMethodProviderVO.create(data.provider) : null,
        cardToken: data.cardToken,
        cardLast4: data.cardLast4,
        cardBrand: data.cardBrand,
        cardExpiry: data.cardExpiry,
        isDefault: data.isDefault,
        isActive: data.isActive,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: PaymentMethodIdVO): Promise<PaymentMethodEntity | null> {
    const raw = await this.redis.get<SerializedMethod>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly PaymentMethodEntity[]> {
    return [];
  }

  async save(entity: PaymentMethodEntity): Promise<PaymentMethodEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: PaymentMethodIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
