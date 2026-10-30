/**
 * CartItemRedisRepository — stub (Redis-backed CartItem)
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { CartItemNoteVO } from '../../../../domain/value-objects/primitives/cart-item-note.vo.js';
import { CartItemStatusVO } from '../../../../domain/value-objects/primitives/cart-item-status.vo.js';
import { CartItemQuantityVO } from '../../../../domain/value-objects/primitives/cart-item-quantity.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { Injectable, Logger } from '@nestjs/common';
import type {
  CartItemRepository,
  CartItemListFilter,
  CartItemListOptions,
  CartItemPaginationResult,
  CartItemStats,
} from '../../../../domain/repositories/cart-item.repository.interface.js';
import { CartItemEntity } from '../../../../domain/entities/cart-item.entity.js';
import { CartItemIdVO } from '../../../../domain/value-objects/primitives/cart-item-id.vo.js';
import { CartRedisService } from '../redis.service.js';
import { CartItemKeys } from '../keys/cart-item.keys.js';

const DEFAULT_TTL = 7 * 24 * 60 * 60;

@Injectable()
export class CartItemRedisRepository implements CartItemRepository {
  private readonly logger = new Logger(CartItemRedisRepository.name);

  constructor(private readonly redis: CartRedisService) {}

  async findById(id: string): Promise<CartItemEntity | null> {
    return this.findByIdVO(CartItemIdVO.reconstitute(id));
  }

  async findByIdVO(id: CartItemIdVO): Promise<CartItemEntity | null> {
    const raw = await this.redis.get<Record<string, unknown>>(CartItemKeys.byId(id.value));
    return raw ? this.fromRaw(raw) : null;
  }

  async findAll(): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(CartItemKeys.byId(id));
  }

  async findByCartId(cartId: string): Promise<readonly CartItemEntity[]> {
    const ids = (await this.redis.get<readonly string[]>(CartItemKeys.byCart(cartId))) ?? [];
    const out: CartItemEntity[] = [];
    for (const id of ids) {
      const item = await this.findById(id);
      if (item) out.push(item);
    }
    return out;
  }

  async findActiveByCartId(cartId: string): Promise<readonly CartItemEntity[]> {
    const items = await this.findByCartId(cartId);
    return items.filter((i) => i.isActive());
  }

  async countByCartId(cartId: string): Promise<number> {
    return (await this.findByCartId(cartId)).length;
  }

  async findByProductId(_productId: string): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async findInCartByProduct(
    cartId: string,
    productId: string,
    variantId?: string,
  ): Promise<CartItemEntity | null> {
    const id = await this.redis.get<string>(
      CartItemKeys.byCartProduct(cartId, productId, variantId),
    );
    return id ? this.findById(id) : null;
  }

  async existsInCart(cartId: string, productId: string, variantId?: string): Promise<boolean> {
    return this.redis.exists(CartItemKeys.byCartProduct(cartId, productId, variantId));
  }

  async findByStatus(_status: string): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async findUnavailableItems(): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async findPaginated(options: CartItemListOptions): Promise<CartItemPaginationResult> {
    let items: readonly CartItemEntity[] = [];
    if (options.filter?.cartId) {
      items = await this.findByCartId(options.filter.cartId);
    } else if (options.filter?.productId) {
      items = await this.findByProductId(options.filter.productId);
    } else {
      // Fallback: scan all (memory only supports this)
      items = await this.findAll();
    }
    const total = items.length;
    const start = (options.page - 1) * options.limit;
    const paginated = items.slice(start, start + options.limit);
    return {
      items: paginated,
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(_filter?: CartItemListFilter): Promise<CartItemStats> {
    return {
      total: 0,
      totalQuantity: 0,
      totalValue: 0,
      averageUnitPrice: 0,
      byStatus: {},
    };
  }

  async findStale(_inactiveMinutes: number): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async deleteByCartId(_cartId: string): Promise<number> {
    return 0;
  }

  async bulkUpdateStatus(_ids: readonly string[], _status: string): Promise<number> {
    return 0;
  }

  async softDelete(_id: string, _deletedBy?: string): Promise<void> {
    // N/A
  }

  async restore(_id: string): Promise<void> {
    // N/A
  }

  async save(entity: CartItemEntity): Promise<CartItemEntity> {
    const raw = {
      id: entity.id,
      cartId: entity.cartId.value,
      productId: entity.productId.value,
      variantId: entity.variantId?.value ?? null,
      quantity: entity.quantity.value,
      status: entity.status.value,
      unitPrice: entity.unitPrice,
      currency: entity.currency,
      note: entity.note?.value ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAtInternal,
    };
    await this.redis.set(CartItemKeys.byId(entity.id), raw, DEFAULT_TTL);
    await this.addToSet(CartItemKeys.byCart(entity.cartId.value), entity.id);
    await this.redis.set(
      CartItemKeys.byCartProduct(entity.cartId.value, entity.productId.value, entity.variantId?.value),
      entity.id,
      DEFAULT_TTL,
    );
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(CartItemKeys.byId(id));
  }

  private async addToSet(key: string, value: string): Promise<void> {
    const set = (await this.redis.get<readonly string[]>(key)) ?? [];
    if (!set.includes(value)) {
      await this.redis.set(key, [...set, value], DEFAULT_TTL);
    }
  }

  private fromRaw(raw: Record<string, unknown>): CartItemEntity {
    return CartItemEntity.reconstitute({
      id: raw['id'] as string,
      createdAt: raw['createdAt'] as string,
      updatedAt: raw['updatedAt'] as string,
      props: {
        cartId: CartIdVO.create(raw['cartId'] as string),
        productId: ProductIdVO.create(raw['productId'] as string),
        variantId: raw['variantId'] ? VariantIdVO.create(raw['variantId'] as string) : undefined,
        quantity: CartItemQuantityVO.create(raw['quantity'] as number),
        status: CartItemStatusVO.reconstitute(raw['status'] as string),
        unitPrice: raw['unitPrice'] as number,
        currency: raw['currency'] as string,
        note: raw['note'] ? CartItemNoteVO.create(raw['note'] as string) : undefined,
      },
    });
  }
}
