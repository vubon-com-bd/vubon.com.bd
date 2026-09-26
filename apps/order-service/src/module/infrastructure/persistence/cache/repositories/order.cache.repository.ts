import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { OrderEntity } from '../../../../domain/entities/order.entity';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { OrderNumberVO } from '../../../../domain/value-objects/primitives/order-number.vo';
import { OrderStatusVO } from '../../../../domain/value-objects/primitives/order-status.vo';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo';

interface SerializedOrder {
  readonly id: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly vendorId: string | null;
  readonly status: string;
  readonly total: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'order:order';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class OrderCacheRepository extends BaseCacheRepository<OrderEntity, OrderIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  async findById(id: OrderIdVO): Promise<OrderEntity | null> {
    const raw = await this.redis.get<SerializedOrder>(this.keyFor(id));
    void raw;
    return null;
  }

  async findAll(): Promise<readonly OrderEntity[]> {
    return [];
  }

  async save(entity: OrderEntity): Promise<OrderEntity> {
    const data: SerializedOrder = {
      id: entity.id.value,
      orderNumber: entity.orderNumber.value,
      customerId: entity.customerId.value,
      vendorId: entity.vendorId?.value ?? null,
      status: entity.status.value,
      total: entity.total.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
    await this.redis.set(this.keyFor(entity.id), data, TTL_SECONDS);
    return entity;
  }

  async delete(id: OrderIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByNumber(number: OrderNumberVO): Promise<OrderEntity | null> {
    void number;
    return null;
  }

  async findByCustomer(customerId: CustomerIdVO): Promise<readonly OrderEntity[]> {
    void customerId;
    return [];
  }
}
