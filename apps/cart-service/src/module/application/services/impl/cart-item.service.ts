/**
 * CartItemService — orchestrates cart item use cases
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import type {
  ICartItemService,
  CartItemListOptionsDTO,
  CartItemListResponseDTO,
} from '../interfaces/cart-item.service.interface.js';
import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../../domain/repositories/cart-item.repository.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';

import { CartItemEntity } from '../../../domain/entities/cart-item.entity.js';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartItemIdVO } from '../../../domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '../../../domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../domain/value-objects/primitives/cart-item-status.vo.js';
import { CartItemNoteVO } from '../../../domain/value-objects/primitives/cart-item-note.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../domain/value-objects/primitives/variant-id.vo.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';

import { CartItemMapper } from '../../mappers/cart-item.mapper.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { UserClient } from '../../../infrastructure/services/external/user.client.js';
import { ProductClient } from '../../../infrastructure/services/external/product.client.js';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { CartItemAddedEvent, CartItemQuantityChangedEvent, CartItemRemovedEvent } from '../../../domain/events/cart-item.events.js';

import {
  CartItemNotFoundApplicationError,
  CartItemAlreadyExistsApplicationError,
  AddItemError,
  UpdateItemError,
  RemoveItemError,
} from '../../errors/cart-item.errors.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

import type {
  AddItemRequestDTO,
  UpdateItemRequestDTO,
  RemoveItemRequestDTO,
  UpdateQuantityRequestDTO,
  SelectItemRequestDTO,
  MoveToSavedRequestDTO,
} from '../../dtos/requests/item/index.js';

import type {
  CartItemResponseDTO,
  CartItemPublicResponseDTO,
} from '../../dtos/responses/cart-item-response.dto.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@Injectable()
export class CartItemService implements ICartItemService {
  private readonly logger = new Logger(CartItemService.name);

  constructor(
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    private readonly eventBridge: DomainEventBridgeService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
    private readonly productClient: ProductClient,
  ) {}

  // ═══════════════ COMMANDS ═══════════════

  async add(
    dto: AddItemRequestDTO,
    _actorId?: string,
  ): Promise<CartItemResponseDTO> {
    const cart = await this.loadCart(dto.cartId);

    // ─── Duplicate check ───
    const existing = await this.itemRepo.findInCartByProduct(
      cart.id,
      dto.productId,
      dto.variantId,
    );
    if (existing) {
      const itemStatus = (existing as unknown as { _status?: unknown })._status;
      this.logger.log(`[DEBUG] existing item _status type: ${typeof itemStatus} ctor: ${itemStatus?.constructor?.name}`);
      this.logger.log(`[DEBUG] isRemoved method exists: ${typeof existing.isRemoved}`);
    }
    if (existing && !existing.isRemoved()) {
      throw new CartItemAlreadyExistsApplicationError(
        cart.id,
        dto.productId,
        dto.variantId,
      );
    }

    // ─── Fetch product price (enterprise: real-time snapshot at add time) ───
    let unitPrice = 0;
    try {
      const product = await this.productClient.getById(dto.productId);
      if (product) {
        unitPrice = product.price ?? 0;
        this.logger.log(`Fetched price for product ${dto.productId}: ${unitPrice} ${product.currency}`);
      } else {
        this.logger.warn(`Product ${dto.productId} not found — using price 0`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown';
      this.logger.warn(`Price fetch failed for ${dto.productId}: ${msg}`);
    }

    const now = new Date().toISOString();
    const id = randomUUID();

    let entity: CartItemEntity;
    try {
      entity = CartItemEntity.create({
        id: CartItemIdVO.create(id),
        now,
        props: {
          cartId: CartIdVO.create(cart.id),
          productId: ProductIdVO.create(dto.productId),
          variantId: dto.variantId ? VariantIdVO.create(dto.variantId) : undefined,
          quantity: CartItemQuantityVO.create(dto.quantity),
          status: CartItemStatusVO.active(),
          unitPrice,
          currency: cart.currency,
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new AddItemError(dto.productId, msg);
    }

    const saved = await this.itemRepo.save(entity);
    cart.applyItemCountDelta(1, now);

    // ─── Recalculate cart totals from all items ───
    try {
      const allItems = await this.itemRepo.findByCartId(cart.id);
      const subtotal = allItems
        .filter((i) => !i.isRemoved())
        .reduce((sum, i) => sum + (i.unitPrice ?? 0) * i.quantity.value, 0);
      cart.updateTotals({
        subtotal,
        discount: cart.discountAmount,
        tax: cart.taxAmount,
        shipping: cart.shippingAmount,
      }, now);
      this.logger.log(`Cart totals recalculated: subtotal=${subtotal}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown';
      this.logger.warn(`Cart totals recalc failed: ${msg}`);
    }

    await this.cartRepo.save(cart);
    await this.eventBridge.publishFromEntity(cart);
    
    // Fetch user email for notification
    let userEmail: string | undefined;
    if (cart.userId?.value) {
      try {
        const user = await this.userClient.getById(cart.userId.value);
        userEmail = user?.email;
      } catch (err) {
        this.logger.warn(`Failed to fetch email: ${err}`);
      }
    }
    
    // Manual CartItemAdded event
    await this.eventBus.publish(
      new CartItemAddedEvent({
        aggregateId: saved.id,
        payload: {
          cartId: cart.id,
          itemId: saved.id,
          userId: cart.userId?.value,
          userEmail,
          productId: dto.productId,
          variantId: dto.variantId,
          quantity: dto.quantity,
          unitPrice: saved.unitPrice ?? 0,
          currency: cart.currency,
          addedAt: now,
        },
        version: 1,
      }),
    );

    this.logger.log(
      `Item ${saved.id} added to cart ${cart.id} — product=${dto.productId} qty=${dto.quantity}`,
    );
    return CartItemMapper.toResponse(saved);
  }

  async update(
    dto: UpdateItemRequestDTO,
    _actorId?: string,
  ): Promise<CartItemResponseDTO> {
    const item = await this.loadItem(dto.itemId);
    const now = new Date().toISOString();

    try {
      if (dto.quantity !== undefined) {
        item.changeQuantity(CartItemQuantityVO.create(dto.quantity), now);
      }
      if (dto.note !== undefined) {
        item.updateNote(CartItemNoteVO.create(dto.note), now);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new UpdateItemError(item.id, msg);
    }

    const saved = await this.itemRepo.save(item);
    this.logger.log(`Item ${saved.id} updated`);
    return CartItemMapper.toResponse(saved);
  }

  async updateQuantity(
    dto: UpdateQuantityRequestDTO,
    actorId?: string,
  ): Promise<CartItemResponseDTO> {
    return this.update(
      { cartId: dto.cartId, itemId: dto.itemId, quantity: dto.quantity },
      actorId,
    );
  }

  async remove(
    dto: RemoveItemRequestDTO,
    _actorId?: string,
  ): Promise<CartActionResponseDTO> {
    const item = await this.loadItem(dto.itemId);
    const now = new Date().toISOString();

    try {
      item.markRemoved(now);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new RemoveItemError(item.id, msg);
    }

    await this.itemRepo.save(item);

    const cart = await this.cartRepo.findById(dto.cartId);
    if (cart) {
      cart.applyItemCountDelta(-1, now);

      // ─── Recalculate cart totals ───
      try {
        const allItems = await this.itemRepo.findByCartId(cart.id);
        const subtotal = allItems
          .filter((i) => !i.isRemoved())
          .reduce((sum, i) => sum + (i.unitPrice ?? 0) * i.quantity.value, 0);
        cart.updateTotals({
          subtotal,
          discount: cart.discountAmount,
          tax: cart.taxAmount,
          shipping: cart.shippingAmount,
        }, now);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown';
        this.logger.warn(`Cart totals recalc failed on remove: ${msg}`);
      }
      await this.cartRepo.save(cart);
    }

    this.logger.log(`Item ${item.id} removed from cart ${dto.cartId}`);

    return {
      success: true,
      cartId: dto.cartId,
      message: 'Item removed',
      at: now,
    };
  }

  async select(
    dto: SelectItemRequestDTO,
    _actorId?: string,
  ): Promise<CartActionResponseDTO> {
    const now = new Date().toISOString();
    // Selection tracked on cart-item; here we just log
    this.logger.log(
      `Selection toggle: cart=${dto.cartId} items=${dto.itemIds.length} selected=${dto.selected}`,
    );
    return {
      success: true,
      cartId: dto.cartId,
      message: `Selected ${dto.itemIds.length} item(s)`,
      at: now,
    };
  }

  async moveToSaved(
    dto: MoveToSavedRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO> {
    // Mark the item as saved — actual saved-for-later creation handled by sibling service
    const item = await this.loadItem(dto.itemId);
    const now = new Date().toISOString();
    item.changeStatus(CartItemStatusVO.create('saved'), now);
    await this.itemRepo.save(item);
    this.logger.log(`Item ${item.id} moved to saved by ${actorId ?? 'system'}`);
    return {
      success: true,
      cartId: dto.cartId,
      message: 'Item moved to saved for later',
      at: now,
    };
  }

  // ═══════════════ QUERIES ═══════════════

  async getById(id: string): Promise<CartItemResponseDTO> {
    const item = await this.loadItem(id);
    return CartItemMapper.toResponse(item);
  }

  async getPublic(id: string): Promise<CartItemPublicResponseDTO> {
    const item = await this.loadItem(id);
    return CartItemMapper.toPublicResponse(item);
  }

  async listByCart(cartId: string): Promise<readonly CartItemResponseDTO[]> {
    const items = await this.itemRepo.findByCartId(cartId);
    return items.map((i: CartItemEntity) => CartItemMapper.toResponse(i));
  }

  async list(options: CartItemListOptionsDTO): Promise<CartItemListResponseDTO> {
    const result = await this.itemRepo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return {
      items: result.items.map((i: CartItemEntity) => CartItemMapper.toSummary(i)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async countByCart(cartId: string): Promise<number> {
    return this.itemRepo.countByCartId(cartId);
  }

  // ═══════════════ HELPERS ═══════════════

  private async loadItem(id: string): Promise<CartItemEntity> {
    const vo = CartItemIdVO.create(id);
    const item = await this.itemRepo.findByIdVO(vo);
    if (!item) throw new CartItemNotFoundApplicationError(id);
    return item;
  }

  private async loadCart(id: string): Promise<CartEntity> {
    const vo = CartIdVO.create(id);
    const cart = await this.cartRepo.findByIdVO(vo);
    if (!cart) throw new CartNotFoundApplicationError(id);
    return cart;
  }
}
