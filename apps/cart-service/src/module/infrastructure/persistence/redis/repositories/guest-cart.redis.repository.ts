/**
 * GuestCartRedisRepository — stub
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  GuestCartRepository,
  GuestCartListFilter,
  GuestCartListOptions,
  GuestCartPaginationResult,
  GuestCartStats,
} from '../../../../domain/repositories/guest-cart.repository.interface.js';
import { GuestCartEntity } from '../../../../domain/entities/guest-cart.entity.js';
import { GuestCartIdVO } from '../../../../domain/value-objects/primitives/guest-cart-id.vo.js';
import { CartRedisService } from '../redis.service.js';
import { GuestCartKeys } from '../keys/guest-cart.keys.js';

const DEFAULT_TTL = 7 * 24 * 60 * 60;

@Injectable()
export class GuestCartRedisRepository implements GuestCartRepository {
  constructor(private readonly redis: CartRedisService) {}

  async findById(id: string): Promise<GuestCartEntity | null> {
    return this.findByIdVO(GuestCartIdVO.reconstitute(id));
  }

  async findByIdVO(id: GuestCartIdVO): Promise<GuestCartEntity | null> {
    const raw = await this.redis.get<Record<string, unknown>>(GuestCartKeys.byId(id.value));
    return raw ? this.fromRaw(raw) : null;
  }

  async findAll(): Promise<readonly GuestCartEntity[]> {
    const ids = (await this.redis.get<readonly string[]>(GuestCartKeys.allIds())) ?? [];
    const out: GuestCartEntity[] = [];
    for (const id of ids) {
      const g = await this.findById(id);
      if (g) out.push(g);
    }
    return out;
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(GuestCartKeys.byId(id));
  }

  async findByToken(token: string): Promise<GuestCartEntity | null> {
    const id = await this.redis.get<string>(GuestCartKeys.byToken(token));
    return id ? this.findById(id) : null;
  }

  async findByCartId(cartId: string): Promise<GuestCartEntity | null> {
    const id = await this.redis.get<string>(GuestCartKeys.byCart(cartId));
    return id ? this.findById(id) : null;
  }

  async findByStatus(_status: string): Promise<readonly GuestCartEntity[]> {
    return [];
  }

  async findExpired(_beforeDate: Date): Promise<readonly GuestCartEntity[]> {
    return [];
  }

  async findMergable(): Promise<readonly GuestCartEntity[]> {
    const all = await this.findAll();
    return all.filter((g) => g.canMerge());
  }

  async findStaleAbandonable(_inactiveHours: number): Promise<readonly GuestCartEntity[]> {
    return [];
  }

  async findPaginated(_options: GuestCartListOptions): Promise<GuestCartPaginationResult> {
    throw new Error('Not implemented');
  }

  async getStats(_filter?: GuestCartListFilter): Promise<GuestCartStats> {
    throw new Error('Not implemented');
  }

  async bulkUpdateStatus(_ids: readonly string[], _status: string): Promise<number> {
    return 0;
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.redis.del(GuestCartKeys.byId(id));
  }

  async restore(_id: string): Promise<void> {
    // N/A
  }

  async save(entity: GuestCartEntity): Promise<GuestCartEntity> {
    const raw = {
      id: entity.id,
      token: entity.token.value,
      cartId: entity.cartId.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      expiresAt: entity.expiresAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
    await this.redis.set(GuestCartKeys.byId(entity.id), raw, DEFAULT_TTL);
    await this.redis.set(GuestCartKeys.byToken(entity.token.value), entity.id, DEFAULT_TTL);
    await this.redis.set(GuestCartKeys.byCart(entity.cartId.value), entity.id, DEFAULT_TTL);
    await this.addToSet(GuestCartKeys.allIds(), entity.id);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(GuestCartKeys.byId(id));
  }

  private async addToSet(key: string, value: string): Promise<void> {
    const set = (await this.redis.get<readonly string[]>(key)) ?? [];
    if (!set.includes(value)) {
      await this.redis.set(key, [...set, value], DEFAULT_TTL);
    }
  }

  private fromRaw(raw: Record<string, unknown>): GuestCartEntity {
    return GuestCartEntity.reconstitute({
      id: raw['id'] as string,
      createdAt: raw['createdAt'] as string,
      updatedAt: raw['updatedAt'] as string,
      status: raw['status'] as string,
      props: {
        token: { value: raw['token'] } as never,
        cartId: { value: raw['cartId'] } as never,
        itemCount: raw['itemCount'] as number,
        expiresAt: raw['expiresAt'] as string,
      },
    });
  }
}
