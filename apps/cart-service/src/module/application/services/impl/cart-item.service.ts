/**
 * CartItemService — implements ICartItemService
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { ICartItemService } from '../interfaces/cart-item.service.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../domain/entities/cart-item.entity.js';
import { CartItemQuantityVO } from '../../../domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { CartVariantIdVO } from '../../../domain/value-objects/primitives/variant-id.vo.js';
import { CartVendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';
import { CartMapper } from '../../mappers/cart.mapper.js';
import { CartItemMapper } from '../../mappers/cart-item.mapper.js';
import type { AddItemRequestDTO } from '../../dtos/requests/item/add-item.dto.js';
import type { UpdateItemRequestDTO } from '../../dtos/requests/item/update-item.dto.js';
import type { RemoveItemRequestDTO } from '../../dtos/requests/item/remove-item.dto.js';
import type { UpdateQuantityRequestDTO } from '../../dtos/requests/item/update-quantity.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import type { CartItemStandaloneResponseDTO } from '../../dtos/responses/cart-item-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';
import { CartItemNotFoundApplicationError } from '../../errors/cart-item.errors.js';

@Injectable()
export class CartItemService implements ICartItemService {
  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
  ) {}

  async add(dto: AddItemRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const now = new Date().toISOString();
    const item = CartItemEntity.create({
      id: randomUUID(),
      now,
      props: {
        productId: CartProductIdVO.create(dto.productId),
        variantId: dto.variantId ? CartVariantIdVO.create(dto.variantId) : undefined,
        vendorId: dto.vendorId ? CartVendorIdVO.create(dto.vendorId) : undefined,
        sku: dto.sku,
        name: dto.name,
        imageUrl: dto.imageUrl,
        unitPrice: dto.unitPrice,
        compareAtPrice: dto.compareAtPrice,
        quantity: CartItemQuantityVO.create(dto.quantity),
        discountAmount: 0,
        status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
        isAvailable: true,
        attributes: dto.attributes,
        currency: dto.currency,
      },
    });
    cart.addItem(item, now);
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async update(dto: UpdateItemRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const item = cart.findItem(dto.itemId);
    if (!item) throw new CartItemNotFoundApplicationError(dto.itemId);
    const now = new Date().toISOString();
    if (dto.quantity !== undefined) {
      item.changeQuantity(CartItemQuantityVO.create(dto.quantity), now);
    }
    if (dto.unitPrice !== undefined) item.updateUnitPrice(dto.unitPrice, now);
    if (dto.discountAmount !== undefined) item.applyDiscount(dto.discountAmount, now);
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async remove(dto: RemoveItemRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    cart.removeItem(dto.itemId, dto.removedBy);
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async updateQuantity(dto: UpdateQuantityRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    cart.changeItemQuantity(dto.itemId, CartItemQuantityVO.create(dto.quantity));
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async getItem(cartId: string, itemId: string): Promise<CartItemStandaloneResponseDTO> {
    const cart = await this.loadCart(cartId);
    const item = cart.findItem(itemId);
    if (!item) throw new CartItemNotFoundApplicationError(itemId);
    return CartItemMapper.toResponse(item, cartId);
  }

  async listItems(cartId: string): Promise<readonly CartItemStandaloneResponseDTO[]> {
    const cart = await this.loadCart(cartId);
    return CartItemMapper.toResponseList(cart.items, cartId);
  }

  private async loadCart(cartId: string): Promise<CartEntity> {
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new CartNotFoundApplicationError(cartId);
    return cart;
  }
}
