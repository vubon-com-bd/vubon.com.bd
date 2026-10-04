/**
 * GuestCartRedisRepository
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { GuestCartRepository } from '../../../../domain/repositories/guest-cart.repository.interface.js';
import { GuestCartEntity } from '../../../../domain/entities/guest-cart.entity.js';
import { GuestCartIdVO } from '../../../../domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestCartStatusVO } from '../../../../domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../../../../domain/value-objects/primitives/guest-token.vo.js';
import { GUEST_CART_KEYS } from '../keys/guest-cart.keys.js';

interface SerializedGuest {
  id: string;
  token: string;
  status: string;
  itemCount: number;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  mergedIntoCartId?: string;
}

@Injectable()
export class GuestCartRedisRepository implements GuestCartRepository {
  private readonly ttl = CACHE_TTL.SEVEN_DAYS;

  constructor(
    @Inject(RedisService) private readonly redis: RedisService,
  ) {}

  async findById(id: string): Promise<GuestCartEntity | null> {
    const raw = await this.redis.get<SerializedGuest>(GUEST_CART_KEYS.base(id));
    return raw ? this.toDomain(raw) : null;
  }

  async findByIdVO(id: GuestCartIdVO): Promise<GuestCartEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly GuestCartEntity[]> {
    return [];
  }

  async save(entity: GuestCartEntity): Promise<GuestCartEntity> {
    const data = this.toPersistence(entity);
    await this.redis.set(GUEST_CART_KEYS.base(entity.id), data, this.ttl);
    await this.redis.set(GUEST_CART_KEYS.byToken(entity.token.value), data, this.ttl);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(GUEST_CART_KEYS.base(id));
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(GUEST_CART_KEYS.base(id));
  }

  async findByToken(token: GuestTokenVO): Promise<GuestCartEntity | null> {
    const raw = await this.redis.get<SerializedGuest>(GUEST_CART_KEYS.byToken(token.value));
    return raw ? this.toDomain(raw) : null;
  }

  async findActiveByToken(token: GuestTokenVO): Promise<GuestCartEntity | null> {
    const guest = await this.findByToken(token);
    return guest && !guest.isExpired() ? guest : null;
  }

  async findExpired(_before: string): Promise<readonly GuestCartEntity[]> {
    return [];
  }

  async findMergeable(): Promise<readonly GuestCartEntity[]> {
    return [];
  }

  async deleteExpired(_before: string): Promise<number> {
    return 0;
  }

  private toPersistence(g: GuestCartEntity): SerializedGuest {
    return {
      id: g.id,
      token: g.token.value,
      status: g.status.value,
      itemCount: g.itemCount,
      expiresAt: g.expiresAt,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt,
      mergedIntoCartId: g.mergedIntoCartId,
    };
  }

  private toDomain(raw: SerializedGuest): GuestCartEntity {
    return GuestCartEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      props: {
        token: GuestTokenVO.reconstitute(raw.token),
        status: GuestCartStatusVO.reconstitute(raw.status),
        itemCount: raw.itemCount,
        expiresAt: raw.expiresAt,
        mergedIntoCartId: raw.mergedIntoCartId,
      },
    });
  }
}
