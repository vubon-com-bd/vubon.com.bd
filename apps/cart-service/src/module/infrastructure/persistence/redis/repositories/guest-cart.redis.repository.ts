import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { GuestCartKeys } from '../keys/guest-cart.keys';
import { GuestCartEntity } from '../../../../domain/entities/guest-cart.entity';
import { GuestCartIdVO } from '../../../../domain/value-objects/primitives/guest-cart-id.vo';
import { GuestCartStatusVO } from '../../../../domain/value-objects/primitives/guest-cart-status.vo';
import { GuestTokenVO } from '../../../../domain/value-objects/primitives/guest-token.vo';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo';
import type { GuestCartRepository } from '../../../../domain/repositories/guest-cart.repository.interface';

interface SerializedGuestCart {
  readonly id: string;
  readonly cartId: string;
  readonly token: string;
  readonly status: string;
  readonly itemCount: number;
  readonly expiresAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'cart:guest';
const TTL_SECONDS = 86400 * 3;

@Injectable()
export class GuestCartRedisRepository
  extends BaseCacheRepository<GuestCartEntity, GuestCartIdVO>
  implements GuestCartRepository
{
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: GuestCartEntity): SerializedGuestCart {
    return {
      id: entity.id.value,
      cartId: entity.cartId.value,
      token: entity.token.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      expiresAt: entity.expiresAt.toISOString(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedGuestCart): GuestCartEntity {
    return GuestCartEntity.reconstitute(
      GuestCartIdVO.create(data.id),
      {
        cartId: CartIdVO.create(data.cartId),
        token: GuestTokenVO.create(data.token),
        status: GuestCartStatusVO.create(data.status),
        itemCount: data.itemCount,
        expiresAt: new Date(data.expiresAt),
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: GuestCartIdVO): Promise<GuestCartEntity | null> {
    const raw = await this.redis.get<SerializedGuestCart>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly GuestCartEntity[]> {
    return [];
  }

  async save(entity: GuestCartEntity): Promise<GuestCartEntity> {
    const serialized = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), serialized, TTL_SECONDS);
    await this.redis.set(GuestCartKeys.byToken(entity.token.value), serialized, TTL_SECONDS);
    return entity;
  }

  async delete(id: GuestCartIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByToken(token: GuestTokenVO): Promise<GuestCartEntity | null> {
    const raw = await this.redis.get<SerializedGuestCart>(GuestCartKeys.byToken(token.value));
    return raw ? this.deserialize(raw) : null;
  }

  async findExpired(before: Date): Promise<readonly GuestCartEntity[]> {
    void before;
    return [];
  }
}
