import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { PaymentGatewayEntity } from '../../../../domain/entities/payment-gateway.entity';
import { PaymentGatewayVO } from '../../../../domain/value-objects/primitives/payment-gateway.vo';

interface SerializedGateway {
  readonly id: string;
  readonly gateway: string;
  readonly status: string;
  readonly env: string;
  readonly isLocal: boolean;
  readonly supportedCurrencies: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'payment:gateway';
const TTL_SECONDS = 60 * 60; // 1 hour

@Injectable()
export class GatewayCacheRepository extends BaseCacheRepository<PaymentGatewayEntity, string> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: PaymentGatewayEntity): SerializedGateway {
    return {
      id: entity.id,
      gateway: entity.gateway.value,
      status: entity.status,
      env: entity.env,
      isLocal: entity.isLocal,
      supportedCurrencies: entity.supportedCurrencies,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedGateway): PaymentGatewayEntity {
    return PaymentGatewayEntity.reconstitute(
      data.id,
      {
        gateway: PaymentGatewayVO.create(data.gateway),
        status: data.status,
        env: data.env,
        isLocal: data.isLocal,
        supportedCurrencies: data.supportedCurrencies,
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: string): Promise<PaymentGatewayEntity | null> {
    const raw = await this.redis.get<SerializedGateway>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly PaymentGatewayEntity[]> {
    return [];
  }

  async save(entity: PaymentGatewayEntity): Promise<PaymentGatewayEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
