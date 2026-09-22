import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { CartItemKeys } from '../keys/cart-item.keys';
import { CartItemEntity } from '../../../../domain/entities/cart-item.entity';
import { CartItemIdVO } from '../../../../domain/value-objects/primitives/cart-item-id.vo';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo';
import { CartItemQuantityVO } from '../../../../domain/value-objects/primitives/cart-item-quantity.vo';
import { CartItemStatusVO } from '../../../../domain/value-objects/primitives/cart-item-status.vo';
import { CartItemNoteVO } from '../../../../domain/value-objects/primitives/cart-item-note.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import type { CartItemRepository } from '../../../../domain/repositories/cart-item.repository.interface';

interface SerializedCartItem {
  readonly id: string;
  readonly productId: string;
  readonly variantId: string | null;
  readonly vendorId: string | null;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly totalPrice: number;
  readonly currency: string;
  readonly status: string;
  readonly note: string | null;
  readonly selected: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'cart:item';
const TTL_SECONDS = 86400 * 7;

@Injectable()
export class CartItemRedisRepository
  extends BaseCacheRepository<CartItemEntity, CartItemIdVO>
  implements CartItemRepository
{
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: CartItemEntity): SerializedCartItem {
    return {
      id: entity.id.value,
      productId: entity.productId.value,
      variantId: entity.variantId?.value ?? null,
      vendorId: entity.vendorId?.value ?? null,
      quantity: entity.quantity.quantity,
      unitPrice: entity.unitPrice,
      totalPrice: entity.totalPrice,
      currency: entity.currency,
      status: entity.status.value,
      note: entity.note?.value ?? null,
      selected: entity.selected,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedCartItem): CartItemEntity {
    return CartItemEntity.reconstitute(
      CartItemIdVO.create(data.id),
      {
        productId: ProductIdVO.create(data.productId),
        variantId: data.variantId ? VariantIdVO.create(data.variantId) : null,
        vendorId: data.vendorId ? VendorIdVO.create(data.vendorId) : null,
        quantity: CartItemQuantityVO.create(data.quantity),
        unitPrice: data.unitPrice,
        totalPrice: data.totalPrice,
        currency: data.currency,
        status: CartItemStatusVO.create(data.status),
        note: data.note ? CartItemNoteVO.create(data.note) : null,
        selected: data.selected,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: CartItemIdVO): Promise<CartItemEntity | null> {
    const raw = await this.redis.get<SerializedCartItem>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async save(entity: CartItemEntity): Promise<CartItemEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: CartItemIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByCartId(_cartId: CartIdVO): Promise<readonly CartItemEntity[]> {
    return [];
  }

  async findByProduct(_cartId: CartIdVO, _productId: ProductIdVO): Promise<CartItemEntity | null> {
    return null;
  }

  async deleteByCartId(cartId: CartIdVO): Promise<void> {
    await this.redis.del(CartItemKeys.items(cartId.value));
  }
}
