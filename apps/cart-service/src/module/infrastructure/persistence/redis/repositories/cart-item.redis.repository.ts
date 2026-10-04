/**
 * CartItemRedisRepository
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { CartItemRepository } from '../../../../domain/repositories/cart-item.repository.interface.js';
import { CartItemEntity } from '../../../../domain/entities/cart-item.entity.js';
import { CartItemIdVO } from '../../../../domain/value-objects/primitives/cart-item-id.vo.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { CartProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { CartItemQuantityVO } from '../../../../domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO as ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { CartVariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { CartVendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { CART_ITEM_KEYS } from '../keys/cart-item.keys.js';

interface SerializedItem {
  id: string;
  cartId: string;
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

@Injectable()
export class CartItemRedisRepository implements CartItemRepository {
  private readonly ttl = CACHE_TTL.SEVEN_DAYS;

  constructor(
    @Inject(RedisService) private readonly redis: RedisService,
  ) {}

  async findById(id: string): Promise<CartItemEntity | null> {
    const parts = id.split(':');
    if (parts.length < 2) return null;
    const cartId = parts[0];
    const raw = await this.redis.get<SerializedItem>(CART_ITEM_KEYS.base(cartId, id));
    return raw ? this.toDomain(raw) : null;
  }

  async findByIdVO(id: CartItemIdVO): Promise<CartItemEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async save(entity: CartItemEntity): Promise<CartItemEntity> {
    const cartId = this.cartIdFromEntity(entity);
    const data = this.toPersistence(entity, cartId);
    await this.redis.set(CART_ITEM_KEYS.base(cartId, entity.id), data, this.ttl);
    return entity;
  }

  async delete(id: string): Promise<void> {
    const parts = id.split(':');
    if (parts.length < 2) return;
    await this.redis.del(CART_ITEM_KEYS.base(parts[0], id));
  }

  async exists(id: string): Promise<boolean> {
    const parts = id.split(':');
    if (parts.length < 2) return false;
    return this.redis.exists(CART_ITEM_KEYS.base(parts[0], id));
  }

  async findByCartId(cartId: CartIdVO): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async findByProduct(
    _cartId: CartIdVO,
    _productId: CartProductIdVO,
    _variantId?: string,
  ): Promise<CartItemEntity | null> {
    return null;
  }

  async findAvailableByCartId(_cartId: CartIdVO): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async findUnavailableByCartId(_cartId: CartIdVO): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async countByCartId(_cartId: CartIdVO): Promise<number> {
    return 0;
  }

  async deleteByCartId(_cartId: CartIdVO): Promise<number> {
    return 0;
  }

  async markRemoved(id: string): Promise<void> {
    void id;
  }

  private cartIdFromEntity(_entity: CartItemEntity): string {
    return 'unknown';
  }

  private toPersistence(item: CartItemEntity, cartId: string): SerializedItem {
    return {
      id: item.id,
      cartId,
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

  private toDomain(raw: SerializedItem): CartItemEntity {
    return CartItemEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      props: {
        productId: ProductIdVO.reconstitute(raw.productId),
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

void CartItemIdVO;
