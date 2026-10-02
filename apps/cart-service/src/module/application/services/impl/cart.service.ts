/**
 * CartService — implements ICartService
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { ICartService } from '../interfaces/cart.service.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartStatusVO } from '../../../domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { CartSessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo.js';
import { CartCalculationService } from '../../../domain/services/cart-calculation.service.js';
import { CART_STATUS, CART_LIMIT } from '@vubon/shared-constants/business/cart';
import { CartMapper } from '../../mappers/cart.mapper.js';
import type { CreateCartRequestDTO } from '../../dtos/requests/cart/create-cart.dto.js';
import type { UpdateCartRequestDTO } from '../../dtos/requests/cart/update-cart.dto.js';
import type { ClearCartRequestDTO } from '../../dtos/requests/cart/clear-cart.dto.js';
import type { DeleteCartRequestDTO } from '../../dtos/requests/cart/delete-cart.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import type { CartSummaryResponseDTO } from '../../dtos/responses/cart-summary-response.dto.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

@Injectable()
export class CartService implements ICartService {
  private readonly calc = new CartCalculationService();

  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
  ) {}

  async create(dto: CreateCartRequestDTO, _actorId?: string): Promise<CartResponseDTO> {
    const now = new Date().toISOString();
    const currency = dto.currency ?? 'BDT';
    const type = CartTypeVO.create(dto.type ?? 'user');
    const expiresAt =
      dto.expiresAt ??
      new Date(Date.now() + CART_LIMIT.EXPIRY_HOURS * 60 * 60 * 1000).toISOString();

    const cart = CartEntity.create({
      id: randomUUID(),
      now,
      props: {
        type,
        status: CartStatusVO.create(CART_STATUS.ACTIVE),
        userId: dto.userId ? CartUserIdVO.create(dto.userId) : undefined,
        sessionId: dto.sessionId ? CartSessionIdVO.create(dto.sessionId) : undefined,
        currency,
        notes: dto.notes,
        expiresAt,
        lastActivityAt: now,
      },
    });

    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async update(dto: UpdateCartRequestDTO, cartId: string): Promise<CartResponseDTO> {
    const cart = await this.loadCart(cartId);
    const now = new Date().toISOString();
    (cart as unknown as { updatedAt: string }).updatedAt = now;
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
    void dto;
  }

  async clear(dto: ClearCartRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    cart.clear(dto.clearedBy);
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async delete(dto: DeleteCartRequestDTO): Promise<void> {
    const cart = await this.loadCart(dto.cartId);
    cart.softDelete(dto.deletedBy);
    await this.cartRepo.save(cart);
    await this.cartRepo.softDelete(dto.cartId, dto.deletedBy);
  }

  async getById(cartId: string): Promise<CartResponseDTO> {
    const cart = await this.loadCart(cartId);
    return CartMapper.toResponse(cart);
  }

  async getByUserId(userId: string): Promise<CartResponseDTO | null> {
    const cart = await this.cartRepo.findByUserId(CartUserIdVO.create(userId));
    return cart ? CartMapper.toResponse(cart) : null;
  }

  async getSummary(cartId: string): Promise<CartSummaryResponseDTO> {
    const cart = await this.loadCart(cartId);
    return CartMapper.toSummaryResponse(cart);
  }

  async recalculateTotals(cartId: string): Promise<CartTotalsResponseDTO> {
    const cart = await this.loadCart(cartId);
    cart.recalculateTotals({});
    await this.cartRepo.save(cart);
    return CartMapper.totalsToResponse(cart.totals);
  }

  private async loadCart(cartId: string): Promise<CartEntity> {
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new CartNotFoundApplicationError(cartId);
    return cart;
  }
}
