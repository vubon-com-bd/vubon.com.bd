/**
 * CartRedisRepository — implements CartRepository
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  CartRepository,
  CartListOptions,
  CartPaginationResult,
  CartStats,
  CartListFilter,
} from '../../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../../domain/entities/cart.entity.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { IdempotencyKeyVO } from '../../../../domain/value-objects/primitives/idempotency-key.vo.js';

import { CartRedisService } from '../redis.service.js';
import { CartKeys } from '../keys/cart.keys.js';
import {
  CartPrismaMapper,
  type PrismaCartRow,
} from '../../prisma/mappers/cart.prisma.mapper.js';
import { CartVoucherEntity } from '../../../../domain/entities/cart-voucher.entity.js';
import { CartTaxEntity } from '../../../../domain/entities/cart-tax.entity.js';
import { CartShippingEntity } from '../../../../domain/entities/cart-shipping.entity.js';
import { VoucherCodeVO } from '../../../../domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../../../../domain/value-objects/primitives/voucher-status.vo.js';
import { CartTaxIdVO } from '../../../../domain/value-objects/primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '../../../../domain/value-objects/primitives/cart-tax-rate.vo.js';
import { CartShippingIdVO } from '../../../../domain/value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '../../../../domain/value-objects/primitives/cart-shipping-method.vo.js';
import { AddressIdVO } from '../../../../domain/value-objects/primitives/address-id.vo.js';

const DEFAULT_TTL = 7 * 24 * 60 * 60;

@Injectable()
export class CartRedisRepository implements CartRepository {
  private readonly logger = new Logger(CartRedisRepository.name);

  constructor(private readonly redis: CartRedisService) {}

  async findById(id: string): Promise<CartEntity | null> {
    return this.findByIdVO(CartIdVO.reconstitute(id));
  }

  async findByIdVO(id: CartIdVO): Promise<CartEntity | null> {
    const raw = await this.redis.get<Record<string, unknown>>(CartKeys.byId(id.value));
    if (!raw) return null;
    try {
      return CartPrismaMapper.toDomain({
        id: raw['id'] as string,
        userId: (raw['userId'] as string | null) ?? null,
        sessionId: (raw['sessionId'] as string | null) ?? null,
        type: raw['type'] as string,
        status: raw['status'] as string,
        itemCount: raw['itemCount'] as number,
        subtotal: raw['subtotal'],
        discountAmount: raw['discountAmount'],
        taxAmount: raw['taxAmount'],
        shippingAmount: raw['shippingAmount'],
        total: raw['total'],
        currency: raw['currency'] as string,
        couponId: (raw['couponId'] as string | null) ?? null,
        voucherId: (raw['voucherId'] as string | null) ?? null,
        notes: (raw['notes'] as string | null) ?? null,
        idempotencyKey: (raw['idempotencyKey'] as string | null) ?? null,
        expiresAt: new Date(raw['expiresAt'] as string),
        lastActivityAt: new Date(raw['lastActivityAt'] as string),
        createdAt: new Date(raw['createdAt'] as string),
        updatedAt: new Date(raw['updatedAt'] as string),
        deletedAt: raw['deletedAt'] ? new Date(raw['deletedAt'] as string) : null,
      } as PrismaCartRow);
    } catch (e) {
      this.logger.warn(`findByIdVO(${id.value}) failed: ${(e as Error).message}`);
      return null;
    }
  }

  async findAll(): Promise<readonly CartEntity[]> {
    const ids = (await this.redis.get<readonly string[]>(CartKeys.allIds())) ?? [];
    const out: CartEntity[] = [];
    for (const id of ids) {
      const c = await this.findById(id);
      if (c) out.push(c);
    }
    return out;
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(CartKeys.byId(id));
  }

  async findByUserId(userId: string): Promise<readonly CartEntity[]> {
    const ids = (await this.redis.get<readonly string[]>(CartKeys.byUser(userId))) ?? [];
    const out: CartEntity[] = [];
    for (const id of ids) {
      const c = await this.findById(id);
      if (c) out.push(c);
    }
    return out;
  }

  async findActiveByUserId(userId: string): Promise<CartEntity | null> {
    const id = await this.redis.get<string>(CartKeys.activeByUser(userId));
    return id ? this.findById(id) : null;
  }

  async findBySessionId(sessionId: string): Promise<readonly CartEntity[]> {
    const ids =
      (await this.redis.get<readonly string[]>(CartKeys.bySession(sessionId))) ?? [];
    const out: CartEntity[] = [];
    for (const id of ids) {
      const c = await this.findById(id);
      if (c) out.push(c);
    }
    return out;
  }

  async findActiveBySessionId(sessionId: string): Promise<CartEntity | null> {
    const carts = await this.findBySessionId(sessionId);
    return carts.find((c) => c.isActive()) ?? null;
  }

  async findByStatus(status: string): Promise<readonly CartEntity[]> {
    const ids = (await this.redis.get<readonly string[]>(CartKeys.byStatus(status))) ?? [];
    const out: CartEntity[] = [];
    for (const id of ids) {
      const c = await this.findById(id);
      if (c) out.push(c);
    }
    return out;
  }

  async findByIdempotencyKey(key: IdempotencyKeyVO): Promise<CartEntity | null> {
    const id = await this.redis.get<string>(CartKeys.byIdempotencyKey(key.value));
    return id ? this.findById(id) : null;
  }

  async findPaginated(options: CartListOptions): Promise<CartPaginationResult> {
    const all = await this.findAll();
    const filtered = this.applyFilter(all, options.filter);
    const sorted = this.applySort(filtered, options.sortBy, options.sortDir);
    const start = (options.page - 1) * options.limit;
    const items = sorted.slice(start, start + options.limit);
    return {
      items,
      total: sorted.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(sorted.length / options.limit),
    };
  }

  async getStats(filter?: CartListFilter): Promise<CartStats> {
    const all = this.applyFilter(await this.findAll(), filter);
    let totalValue = 0;
    let totalItems = 0;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};

    for (const c of all) {
      totalValue += c.total;
      totalItems += c.itemCount;
      byStatus[c.status.value] = (byStatus[c.status.value] ?? 0) + 1;
      byType[c.type.value] = (byType[c.type.value] ?? 0) + 1;
    }

    const count = all.length;
    return {
      total: count,
      totalValue: Math.round(totalValue * 100) / 100,
      averageValue: count ? Math.round((totalValue / count) * 100) / 100 : 0,
      averageItemCount: count ? Math.round((totalItems / count) * 100) / 100 : 0,
      byStatus,
      byType,
    };
  }

  async findStale(inactiveMinutes: number): Promise<readonly CartEntity[]> {
    const cutoff = Date.now() - inactiveMinutes * 60 * 1000;
    const all = await this.findAll();
    return all.filter((c) => c.isActive() && new Date(c.lastActivityAt).getTime() < cutoff);
  }

  async findExpired(beforeDate: Date): Promise<readonly CartEntity[]> {
    const all = await this.findAll();
    return all.filter(
      (c) => !c.isFinal() && new Date(c.expiresAt).getTime() <= beforeDate.getTime(),
    );
  }

  async findAbandonable(thresholdHours: number): Promise<readonly CartEntity[]> {
    const cutoff = Date.now() - thresholdHours * 60 * 60 * 1000;
    const all = await this.findAll();
    return all.filter(
      (c) =>
        c.isActive() && c.itemCount > 0 && new Date(c.lastActivityAt).getTime() < cutoff,
    );
  }

  async findRetryable(_maxRetries?: number): Promise<readonly CartEntity[]> {
    return [];
  }

  async countByUserId(userId: string): Promise<number> {
    return (await this.findByUserId(userId)).length;
  }

  async countByStatus(status: string): Promise<number> {
    return (await this.findByStatus(status)).length;
  }

  async countActiveByUserId(userId: string): Promise<number> {
    const carts = await this.findByUserId(userId);
    return carts.filter((c) => c.isActive()).length;
  }

  async save(entity: CartEntity): Promise<CartEntity> {
    const raw = CartPrismaMapper.toPersistence(entity);
    await this.redis.set(CartKeys.byId(entity.id), raw, DEFAULT_TTL);

    if (entity.userId) {
      await this.addToSet(CartKeys.byUser(entity.userId.value), entity.id);
      if (entity.isActive()) {
        await this.redis.set(
          CartKeys.activeByUser(entity.userId.value),
          entity.id,
          DEFAULT_TTL,
        );
      }
    }
    if (entity.sessionId) {
      await this.addToSet(CartKeys.bySession(entity.sessionId.value), entity.id);
    }
    await this.addToSet(CartKeys.byStatus(entity.status.value), entity.id);
    await this.addToSet(CartKeys.allIds(), entity.id);

    if (entity.idempotencyKey) {
      await this.redis.set(
        CartKeys.byIdempotencyKey(entity.idempotencyKey.value),
        entity.id,
        DEFAULT_TTL,
      );
    }
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(CartKeys.byId(id));
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    const cart = await this.findById(id);
    if (cart) {
      cart.clear();
      await this.save(cart);
    }
  }

  async restore(_id: string): Promise<void> {
    // N/A
  }

  async bulkUpdateStatus(ids: readonly string[], status: string): Promise<number> {
    let count = 0;
    for (const id of ids) {
      const c = await this.findById(id);
      if (c) {
        if (status === 'cleared') c.clear();
        else if (status === 'abandoned') c.abandon();
        else if (status === 'expired') c.expire();
        await this.save(c);
        count += 1;
      }
    }
    return count;
  }

  private async addToSet(key: string, value: string): Promise<void> {
    const set = (await this.redis.get<readonly string[]>(key)) ?? [];
    if (!set.includes(value)) {
      await this.redis.set(key, [...set, value], DEFAULT_TTL);
    }
  }

  private applyFilter(
    carts: readonly CartEntity[],
    filter?: CartListFilter,
  ): readonly CartEntity[] {
    if (!filter) return carts;
    return carts.filter((c) => {
      if (filter.userId && c.userId?.value !== filter.userId) return false;
      if (filter.sessionId && c.sessionId?.value !== filter.sessionId) return false;
      if (filter.status && c.status.value !== filter.status) return false;
      if (filter.type && c.type.value !== filter.type) return false;
      if (filter.currency && c.currency !== filter.currency) return false;
      if (filter.minTotal !== undefined && c.total < filter.minTotal) return false;
      if (filter.maxTotal !== undefined && c.total > filter.maxTotal) return false;
      return true;
    });
  }

  private applySort(
    carts: readonly CartEntity[],
    sortBy: string = 'createdAt',
    sortDir: string = 'desc',
  ): readonly CartEntity[] {
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...carts].sort((a, b) => {
      let va: number, vb: number;
      switch (sortBy) {
        case 'total':
          va = a.total;
          vb = b.total;
          break;
        case 'itemCount':
          va = a.itemCount;
          vb = b.itemCount;
          break;
        case 'updatedAt':
          va = new Date(a.updatedAt).getTime();
          vb = new Date(b.updatedAt).getTime();
          break;
        default:
          va = new Date(a.createdAt).getTime();
          vb = new Date(b.createdAt).getTime();
      }
      return (va - vb) * dir;
    });
  }
}
