/**
 * CartRedisRepository — Redis-backed CartRepository
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type {
  CartRepository,
  CartListOptions,
  CartPaginationResult,
} from '../../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../../domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../domain/entities/cart-item.entity.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { CartUserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { CartSessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo.js';
import { CartStatusVO } from '../../../../domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../domain/value-objects/primitives/cart-type.vo.js';
import { CartItemQuantityVO } from '../../../../domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { CartVariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { CartVendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { CartTotalsCompositeVO } from '../../../../domain/value-objects/composites/cart-totals.vo.js';
import { CART_KEYS } from '../keys/cart.keys.js';

interface SerializedCartItem {
  id: string;
  productId: string;
  variantId?: string;
  vendorId?: string;
  sku: string;
  name: string;
  imageUrl?: string;
  unitPrice: number;
  compareAtPrice?: number;
  quantity: number;
  discountAmount: number;
  status: string;
  isAvailable: boolean;
  isSelected: boolean;
  attributes?: Record<string, string>;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

interface SerializedCart {
  id: string;
  type: string;
  status: string;
  userId?: string;
  sessionId?: string;
  currency: string;
  notes?: string;
  expiresAt: string;
  lastActivityAt: string;
  couponCode?: string;
  voucherCode?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  items: SerializedCartItem[];
}

@Injectable()
export class CartRedisRepository implements CartRepository {
  private readonly ttl = CACHE_TTL.SEVEN_DAYS;

  constructor(@Inject(RedisService) private readonly redis: RedisService) {}

  async findById(id: string): Promise<CartEntity | null> {
    const raw = await this.redis.get<SerializedCart>(CART_KEYS.base(id));
    return raw ? this.toDomain(raw) : null;
  }

  async findByIdVO(id: CartIdVO): Promise<CartEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly CartEntity[]> {
    return [];
  }

  async save(entity: CartEntity): Promise<CartEntity> {
    const data = this.toPersistence(entity);
    await this.redis.set(CART_KEYS.base(entity.id), data, this.ttl);
    if (entity.userId) {
      await this.redis.set(CART_KEYS.byUser(entity.userId.value), data, this.ttl);
    }
    if (entity.sessionId) {
      await this.redis.set(CART_KEYS.bySession(entity.sessionId.value), data, this.ttl);
    }
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(CART_KEYS.base(id));
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(CART_KEYS.base(id));
  }

  async findByUserId(userId: CartUserIdVO): Promise<CartEntity | null> {
    const raw = await this.redis.get<SerializedCart>(CART_KEYS.byUser(userId.value));
    return raw ? this.toDomain(raw) : null;
  }

  async findBySessionId(sessionId: CartSessionIdVO): Promise<CartEntity | null> {
    const raw = await this.redis.get<SerializedCart>(CART_KEYS.bySession(sessionId.value));
    return raw ? this.toDomain(raw) : null;
  }

  async findActiveByUserId(userId: CartUserIdVO): Promise<CartEntity | null> {
    const cart = await this.findByUserId(userId);
    return cart && cart.isActive() ? cart : null;
  }

  async findAllByUserId(userId: CartUserIdVO): Promise<readonly CartEntity[]> {
    const cart = await this.findByUserId(userId);
    return cart ? [cart] : [];
  }

  async findExpired(_before: string): Promise<readonly CartEntity[]> {
    return [];
  }

  async findInactive(_since: string): Promise<readonly CartEntity[]> {
    return [];
  }

  async findPaginated(_options: CartListOptions): Promise<CartPaginationResult> {
    return { items: [], total: 0, page: 1, limit: 20, totalPages: 0 };
  }

  async countByUserId(userId: CartUserIdVO): Promise<number> {
    const cart = await this.findByUserId(userId);
    return cart ? 1 : 0;
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.redis.del(CART_KEYS.base(id));
  }

  // ─── Serialization ─────────────────────────────────────────────────

  private toPersistence(cart: CartEntity): SerializedCart {
    return {
      id: cart.id,
      type: cart.type.value,
      status: cart.status.value,
      userId: cart.userId?.value,
      sessionId: cart.sessionId?.value,
      currency: cart.currency,
      notes: cart.notes,
      expiresAt: cart.expiresAt,
      lastActivityAt: cart.lastActivityAt,
      couponCode: cart.couponCode,
      voucherCode: cart.voucherCode,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      deletedAt: cart.deletedAt ?? null,
      items: cart.items.map((item) => this.itemToPersistence(item)),
    };
  }

  private itemToPersistence(item: CartItemEntity): SerializedCartItem {
    return {
      id: item.id,
      productId: item.productId.value,
      variantId: item.variantId?.value,
      vendorId: item.vendorId?.value,
      sku: item.sku,
      name: item.name,
      imageUrl: item.imageUrl,
      unitPrice: item.unitPrice,
      compareAtPrice: item.compareAtPrice,
      quantity: item.quantity.value,
      discountAmount: item.discountAmount,
      status: item.status.value,
      isAvailable: item.isAvailable,
      isSelected: item.isSelected,
      attributes: item.attributes as Record<string, string> | undefined,
      currency: item.currency,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  private toDomain(raw: SerializedCart): CartEntity {
    const items = (raw.items ?? []).map((it) => this.itemToDomain(it));

    return CartEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt ?? null,
      props: {
        type: CartTypeVO.reconstitute(raw.type),
        status: CartStatusVO.reconstitute(raw.status),
        userId: raw.userId ? CartUserIdVO.reconstitute(raw.userId) : undefined,
        sessionId: raw.sessionId ? CartSessionIdVO.reconstitute(raw.sessionId) : undefined,
        currency: raw.currency,
        notes: raw.notes,
        expiresAt: raw.expiresAt,
        lastActivityAt: raw.lastActivityAt,
        couponCode: raw.couponCode,
        voucherCode: raw.voucherCode,
      },
      totals: CartTotalsCompositeVO.empty(raw.currency),
      items,
    });
  }

  private itemToDomain(raw: SerializedCartItem): CartItemEntity {
    return CartItemEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      props: {
        productId: CartProductIdVO.reconstitute(raw.productId),
        variantId: raw.variantId ? CartVariantIdVO.reconstitute(raw.variantId) : undefined,
        vendorId: raw.vendorId ? CartVendorIdVO.reconstitute(raw.vendorId) : undefined,
        sku: raw.sku,
        name: raw.name,
        imageUrl: raw.imageUrl,
        unitPrice: raw.unitPrice,
        compareAtPrice: raw.compareAtPrice,
        quantity: CartItemQuantityVO.reconstitute(raw.quantity),
        discountAmount: raw.discountAmount,
        status: CartItemStatusVO.reconstitute(raw.status),
        isAvailable: raw.isAvailable,
        isSelected: raw.isSelected,
        attributes: raw.attributes,
        currency: raw.currency,
      },
    });
  }
}
