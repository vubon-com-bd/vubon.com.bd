/**
 * CartService — orchestrates cart use cases
 * @module cart-service/application/services/impl
 *
 * Pattern:
 *  - @Injectable + @Inject(TOKEN)
 *  - Logger per class
 *  - Idempotency check
 *  - Typed errors
 *  - Rich logging
 *  - Helper methods (loadCart)
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { randomUUID } from 'node:crypto';

import type {
  ICartService,
  CartListOptionsDTO,
  CartListFilterDTO,
} from '../interfaces/cart.service.interface.js';
import { CART_SERVICE } from '../interfaces/cart.service.interface.js';

import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';
import { CART_ITEM_REPOSITORY, type CartItemRepository } from '../../../domain/repositories/cart-item.repository.interface.js';
import { CartStatusVO } from '../../../domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo.js';
import { IdempotencyKeyVO } from '../../../domain/value-objects/primitives/idempotency-key.vo.js';

import { CartMapper } from '../../mappers/cart.mapper.js';

import {
  CartNotFoundApplicationError,
  CartAlreadyExistsApplicationError,
  CartIdempotencyConflictError,
  CartCreationError,
  CartModificationError,
  CartClearError,
  CartDeleteError,
  CartNotModifiableApplicationError,
} from '../../errors/cart.errors.js';

import type {
  CreateCartRequestDTO,
  UpdateCartRequestDTO,
  ClearCartRequestDTO,
  DeleteCartRequestDTO,
  RecoverCartRequestDTO,
} from '../../dtos/requests/cart/index.js';

import type {
  CartResponseDTO,
  CartPublicResponseDTO,
  CartSummaryResponseDTO,
  CartListResponseDTO,
  CartDetailResponseDTO,
  CartCountResponseDTO,
  CartStatsResponseDTO,
  CartInitiateResponseDTO,
  CartActionResponseDTO,
} from '../../dtos/responses/cart-response.dto.js';

@Injectable()
export class CartService implements ICartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    @Inject(CART_REPOSITORY)
    private readonly repo: CartRepository,
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════

  async create(
    dto: CreateCartRequestDTO,
    userId?: string,
    _actorId?: string,
  ): Promise<CartInitiateResponseDTO> {
    const now = new Date().toISOString();

    // ─── Idempotency check ───
    if (dto.idempotencyKey) {
      const key = IdempotencyKeyVO.create(dto.idempotencyKey);
      const existing = await this.repo.findByIdempotencyKey(key);
      if (existing) {
        this.logger.debug(`Idempotent hit: ${key.value}`);
        return {
          success: true,
          cartId: existing.id,
          type: existing.type.value,
          status: existing.status.value,
          createdAt: existing.createdAt,
        };
      }
    }

    // ─── Guard: user already has active cart ───
    if (userId) {
      const existingActive = await this.repo.findActiveByUserId(userId);
      if (existingActive) {
        throw new CartAlreadyExistsApplicationError(userId);
      }
    }

    // ─── Create entity ───
    const id = randomUUID();
    let entity: CartEntity;
    try {
      entity = CartEntity.create({
        id: CartIdVO.create(id),
        now,
        props: {
          type: CartTypeVO.create(dto.type ?? 'user'),
          userId: userId ? UserIdVO.create(userId) : undefined,
          sessionId: dto.sessionId ? SessionIdVO.create(dto.sessionId) : undefined,
          currency: dto.currency ?? 'BDT',
          notes: dto.notes,
          expiresAt: this.computeExpiry(dto.type ?? 'user', now),
          idempotencyKey: dto.idempotencyKey
            ? IdempotencyKeyVO.create(dto.idempotencyKey)
            : undefined,
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CartCreationError(msg);
    }

    const saved = await this.repo.save(entity);



    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Cart ${saved.id} created — type=${saved.type.value}`);

    return {
      success: true,
      cartId: saved.id,
      type: saved.type.value,
      status: saved.status.value,
      createdAt: saved.createdAt,
    };
  }

  async update(
    dto: UpdateCartRequestDTO,
    actorId?: string,
  ): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const now = new Date().toISOString();

    try {
      if (dto.notes !== undefined) cart.updateNotes(dto.notes, now);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CartModificationError(cart.id, msg);
    }

    const saved = await this.repo.save(cart);


    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Cart ${saved.id} updated by ${actorId ?? 'system'}`);
    return CartMapper.toResponse(saved);
  }

  async clear(
    dto: ClearCartRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const now = new Date().toISOString();

    try {
      cart.clear(now);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CartClearError(cart.id, msg);
    }

    const saved = await this.repo.save(cart);


    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Cart ${cart.id} cleared by ${actorId ?? 'system'}`);

    return {
      success: true,
      cartId: cart.id,
      message: 'Cart cleared',
      at: now,
    };
  }

  async delete(
    dto: DeleteCartRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const now = new Date().toISOString();

    try {
      await this.repo.softDelete(cart.id, actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CartDeleteError(cart.id, msg);
    }

    this.logger.log(`Cart ${cart.id} deleted by ${actorId ?? 'system'}`);

    return {
      success: true,
      cartId: cart.id,
      message: 'Cart deleted',
      at: now,
    };
  }

  async recover(
    dto: RecoverCartRequestDTO,
    actorId?: string,
  ): Promise<CartResponseDTO> {
    // NOTE: Recovery handled by abandoned-cart service; this proxies the call.
    const cartId = dto.abandonedCartId; // placeholder — replaced by real lookup
    const cart = await this.loadCart(cartId);
    const now = new Date().toISOString();

    if (cart.isFinal()) {
      throw new CartNotModifiableApplicationError(cart.id, cart.status.value);
    }

    cart.activate(now);
    const saved = await this.repo.save(cart);


    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Cart ${saved.id} recovered by ${actorId ?? 'system'}`);
    return CartMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════

  async getById(id: string): Promise<CartResponseDTO> {
    const cart = await this.loadCart(id);
    return CartMapper.toResponse(cart);
  }

  async getPublic(id: string): Promise<CartPublicResponseDTO> {
    const cart = await this.loadCart(id);
    return CartMapper.toPublicResponse(cart);
  }

  async getDetail(id: string): Promise<CartDetailResponseDTO> {
    const cart = await this.loadCart(id);
    const items = await this.itemRepo.findByCartId(id);
    return CartMapper.toDetail(cart, items);
  }

  async getSummary(id: string): Promise<CartSummaryResponseDTO> {
    const cart = await this.loadCart(id);
    return CartMapper.toSummary(cart);
  }

  async getByUserId(userId: string): Promise<CartResponseDTO | null> {
    const cart = await this.repo.findActiveByUserId(userId);
    return cart ? CartMapper.toResponse(cart) : null;
  }

  async list(options: CartListOptionsDTO): Promise<CartListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return CartMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  async count(filter?: CartListFilterDTO): Promise<CartCountResponseDTO> {
    const stats = await this.repo.getStats(filter);
    return {
      total: stats.total,
      byStatus: stats.byStatus,
    };
  }

  async getStats(filter?: CartListFilterDTO): Promise<CartStatsResponseDTO> {
    const stats = await this.repo.getStats(filter);
    return {
      total: stats.total,
      totalValue: stats.totalValue,
      averageValue: stats.averageValue,
      averageItemCount: stats.averageItemCount,
      currency: 'BDT',
      byStatus: stats.byStatus,
      byType: stats.byType,
    };
  }

  // ═══════════════ HELPERS ═══════════════

  private async loadCart(id: string): Promise<CartEntity> {
    const vo = CartIdVO.create(id);
    const cart = await this.repo.findByIdVO(vo);
    if (!cart) throw new CartNotFoundApplicationError(id);
    return cart;
  }

  private computeExpiry(type: string, now: string): string {
    const hours = type === 'guest' ? 168 : 720;
    const d = new Date(now);
    d.setHours(d.getHours() + hours);
    return d.toISOString();
  }
}
