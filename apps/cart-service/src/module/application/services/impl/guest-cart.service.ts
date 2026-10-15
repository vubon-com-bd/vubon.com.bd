/**
 * GuestCartService
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { randomUUID } from 'node:crypto';

import type { IGuestCartService } from '../interfaces/guest-cart.service.interface.js';

import {
  GUEST_CART_REPOSITORY,
  type GuestCartRepository,
} from '../../../domain/repositories/guest-cart.repository.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import {
  CART_MERGER_REPOSITORY,
  type CartMergerRepository,
} from '../../../domain/repositories/cart-merger.repository.interface.js';

import { GuestCartEntity } from '../../../domain/entities/guest-cart.entity.js';
import { CartMergerEntity } from '../../../domain/entities/cart-merger.entity.js';
import { GuestCartIdVO } from '../../../domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestTokenVO } from '../../../domain/value-objects/primitives/guest-token.vo.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';
import { CartMergerIdVO } from '../../../domain/value-objects/primitives/cart-merger-id.vo.js';
import { MergeStrategyVO } from '../../../domain/value-objects/primitives/merge-strategy.vo.js';

import {
  CartNotFoundApplicationError,
} from '../../errors/cart.errors.js';

import type {
  CreateGuestCartRequestDTO,
  MergeGuestCartRequestDTO,
} from '../../dtos/requests/guest/index.js';
import type {
  GuestCartResponseDTO,
  GuestCartPublicResponseDTO,
  GuestCartInitiateResponseDTO,
} from '../../dtos/responses/guest-cart-response.dto.js';
import type { MergeResponseDTO } from '../../dtos/responses/merge-response.dto.js';

@Injectable()
export class GuestCartService implements IGuestCartService {
  private readonly logger = new Logger(GuestCartService.name);

  constructor(
    @Inject(GUEST_CART_REPOSITORY)
    private readonly guestRepo: GuestCartRepository,
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    @Inject(CART_MERGER_REPOSITORY)
    private readonly mergerRepo: CartMergerRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(
    dto: CreateGuestCartRequestDTO,
    _actorId?: string,
  ): Promise<GuestCartInitiateResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();
    const token = this.generateToken();
    const expiresAt = this.computeExpiry(now, dto.ttlHours ?? 168);

    // Create underlying cart first (as guest)
    const cart = await this.cartRepo.findById(dto.sessionId ?? '');
    const cartId = cart ? cart.id : randomUUID();

    // NOTE: The actual cart creation handled by CartService in a saga.
    // Here we create the guest-cart wrapper.

    const guestCart = GuestCartEntity.create({
      id: GuestCartIdVO.create(id),
      now,
      props: {
        token: GuestTokenVO.create(token),
        cartId: CartIdVO.create(cartId),
        itemCount: 0,
        expiresAt,
      },
    });

    const saved = await this.guestRepo.save(guestCart);



    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Guest cart created: ${guestCart.id}`);

    return {
      success: true,
      guestCartId: guestCart.id,
      token,
      expiresAt,
    };
  }

  async merge(
    dto: MergeGuestCartRequestDTO,
    _actorId?: string,
  ): Promise<MergeResponseDTO> {
    const guest = await this.guestRepo.findByToken(dto.guestToken);
    if (!guest) throw new CartNotFoundApplicationError(dto.guestToken);

    const targetCart = await this.cartRepo.findActiveByUserId(dto.userId);
    if (!targetCart) throw new CartNotFoundApplicationError(dto.userId);

    const strategy = MergeStrategyVO.create(dto.strategy ?? 'sum_quantity');
    const now = new Date().toISOString();
    const mergerId = randomUUID();

    const merger = CartMergerEntity.create({
      id: CartMergerIdVO.create(mergerId),
      now,
      props: {
        sourceCartId: guest.cartId,
        targetCartId: targetCart.toIdVO,
        strategy,
        mergedAt: now,
      },
    });

    const savedMerger = await this.mergerRepo.save(merger);



    await this.eventBridge.publishFromEntity(savedMerger);
    // Mark guest cart as merged
    guest.markMerged(targetCart.id, now);
    const saved = await this.guestRepo.save(guest);


    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Guest cart merged: ${guest.id} → ${targetCart.id}`);

    return {
      mergerId: merger.id,
      sourceCartId: guest.cartId.value,
      targetCartId: targetCart.id,
      strategy: strategy.value,
      itemsMerged: 0,
      conflicts: 0,
      mergedItems: [],
      mergedAt: now,
    };
  }

  async getById(id: string): Promise<GuestCartResponseDTO> {
    const entity = await this.load(id);
    return this.toResponse(entity);
  }

  async getPublicById(id: string): Promise<GuestCartPublicResponseDTO> {
    const entity = await this.load(id);
    return this.toPublicResponse(entity);
  }

  async findByToken(token: string): Promise<GuestCartPublicResponseDTO | null> {
    const entity = await this.guestRepo.findByToken(token);
    return entity ? this.toPublicResponse(entity) : null;
  }

  async expire(id: string, _actorId?: string): Promise<GuestCartResponseDTO> {
    const entity = await this.load(id);
    const now = new Date().toISOString();
    entity.expire(now);
    const saved = await this.guestRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Guest cart ${saved.id} expired`);
    return this.toResponse(saved);
  }

  async abandon(id: string, _actorId?: string): Promise<GuestCartResponseDTO> {
    const entity = await this.load(id);
    const now = new Date().toISOString();
    entity.abandon(now);
    const saved = await this.guestRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Guest cart ${saved.id} abandoned`);
    return this.toResponse(saved);
  }

  // ═══════════════ Helpers ═══════════════

  private async load(id: string): Promise<GuestCartEntity> {
    const vo = GuestCartIdVO.create(id);
    const entity = await this.guestRepo.findByIdVO(vo);
    if (!entity) throw new CartNotFoundApplicationError(id);
    return entity;
  }

  private toResponse(entity: GuestCartEntity): GuestCartResponseDTO {
    return {
      id: entity.id,
      token: entity.token.value,
      cartId: entity.cartId.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      expiresAt: entity.expiresAt,
    };
  }

  private toPublicResponse(entity: GuestCartEntity): GuestCartPublicResponseDTO {
    return {
      id: entity.id,
      token: entity.token.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      expiresAt: entity.expiresAt,
    };
  }

  private generateToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    const bytes = new Uint8Array(32);
    globalThis.crypto.getRandomValues(bytes);
    let out = '';
    for (let i = 0; i < bytes.length; i++) out += chars[bytes[i] % chars.length];
    return out;
  }

  private computeExpiry(now: string, hours: number): string {
    const d = new Date(now);
    d.setHours(d.getHours() + hours);
    return d.toISOString();
  }
}
