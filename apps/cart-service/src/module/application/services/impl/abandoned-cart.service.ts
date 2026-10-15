/**
 * AbandonedCartService — detect, remind, recover, lost
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { randomUUID } from 'node:crypto';

import type {
  IAbandonedCartService,
  AbandonedCartListOptionsDTO,
  AbandonedCartListFilterDTO,
} from '../interfaces/abandoned-cart.service.interface.js';

import {
  ABANDONED_CART_REPOSITORY,
  type AbandonedCartRepository,
} from '../../../domain/repositories/abandoned-cart.repository.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';

import { AbandonedCartEntity } from '../../../domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '../../../domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';

import { AbandonedCartDetectorService } from '../../../domain/services/abandoned-cart-detector.service.js';

import {
  CartNotFoundApplicationError,
} from '../../errors/cart.errors.js';
import {
  CartNotFoundApplicationError as AbandonedNotFound,
} from '../../errors/cart.errors.js';

import type {
  AbandonedCartResponseDTO,
  AbandonedCartPublicResponseDTO,
  AbandonedCartListResponseDTO,
  AbandonedCartStatsResponseDTO,
} from '../../dtos/responses/abandoned-cart-response.dto.js';

@Injectable()
export class AbandonedCartService implements IAbandonedCartService {
  private readonly logger = new Logger(AbandonedCartService.name);

  constructor(
    @Inject(ABANDONED_CART_REPOSITORY)
    private readonly repo: AbandonedCartRepository,
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async detect(
    cartId: string,
    _actorId?: string,
  ): Promise<AbandonedCartResponseDTO> {
    const cartVO = CartIdVO.create(cartId);
    const cart = await this.cartRepo.findByIdVO(cartVO);
    if (!cart) throw new CartNotFoundApplicationError(cartId);

    const evalResult = AbandonedCartDetectorService.evaluate(cart);
    if (!evalResult.isAbandoned) {
      throw new AbandonedNotFound(cartId);
    }

    const now = new Date().toISOString();
    const id = randomUUID();

    const entity = AbandonedCartEntity.create({
      id: AbandonedCartIdVO.create(id),
      now,
      props: {
        cartId: cart.toIdVO,
        userId: cart.userId,
        itemCount: cart.itemCount,
        cartValue: cart.total,
        currency: cart.currency,
        abandonedAt: now,
        remindersSent: 0,
      },
    });

    const saved = await this.repo.save(entity);



    await this.eventBridge.publishFromEntity(saved);
    // Mark cart abandoned
    cart.abandon(now);
    const savedCart = await this.cartRepo.save(cart);


    await this.eventBridge.publishFromEntity(savedCart);
    this.logger.log(`Abandoned cart detected: ${saved.id} (cart=${cart.id})`);
    return this.toResponse(saved);
  }

  async sendReminder(
    abandonedCartId: string,
    channel: 'email' | 'sms' | 'push',
    _actorId?: string,
  ): Promise<AbandonedCartResponseDTO> {
    const entity = await this.load(abandonedCartId);
    const now = new Date().toISOString();

    entity.sendReminder(channel, now);
    const saved = await this.repo.save(entity);


    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Reminder sent via ${channel} for abandoned cart ${saved.id}`);
    return this.toResponse(saved);
  }

  async recover(
    abandonedCartId: string,
    orderId: string,
    _actorId?: string,
  ): Promise<AbandonedCartResponseDTO> {
    const entity = await this.load(abandonedCartId);
    const now = new Date().toISOString();

    entity.recover(orderId, now);
    const saved = await this.repo.save(entity);


    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Abandoned cart ${saved.id} recovered (order=${orderId})`);
    return this.toResponse(saved);
  }

  async markLost(
    abandonedCartId: string,
    reason: string,
    _actorId?: string,
  ): Promise<AbandonedCartResponseDTO> {
    const entity = await this.load(abandonedCartId);
    const now = new Date().toISOString();

    entity.markLost(reason, now);
    const saved = await this.repo.save(entity);


    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Abandoned cart ${saved.id} marked lost: ${reason}`);
    return this.toResponse(saved);
  }

  async getById(id: string): Promise<AbandonedCartResponseDTO> {
    const entity = await this.load(id);
    return this.toResponse(entity);
  }

  async getPublicById(id: string): Promise<AbandonedCartPublicResponseDTO> {
    const entity = await this.load(id);
    return this.toPublicResponse(entity);
  }

  async list(options: AbandonedCartListOptionsDTO): Promise<AbandonedCartListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return {
      items: result.items.map((i) => this.toResponse(i)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async getStats(filter?: AbandonedCartListFilterDTO): Promise<AbandonedCartStatsResponseDTO> {
    const stats = await this.repo.getStats(filter);
    return {
      total: stats.total,
      totalValue: stats.totalValue,
      averageValue: stats.averageValue,
      recoveredCount: stats.recoveredCount,
      recoveryRate: stats.recoveryRate,
      byStatus: stats.byStatus,
    };
  }

  // ═══════════════ Helpers ═══════════════

  private async load(id: string): Promise<AbandonedCartEntity> {
    const vo = AbandonedCartIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new AbandonedNotFound(id);
    return entity;
  }

  private toResponse(entity: AbandonedCartEntity): AbandonedCartResponseDTO {
    return {
      id: entity.id,
      cartId: entity.cartId.value,
      userId: entity.userId?.value,
      email: entity.email,
      status: entity.status.value,
      itemCount: entity.itemCount,
      cartValue: entity.cartValue,
      currency: entity.currency,
      abandonedAt: entity.abandonedAt,
      remindersSent: entity.remindersSent,
      lastReminderAt: entity.lastReminderAt,
      recoveredAt: entity.recoveredAt,
      recoveredOrderId: entity.recoveredOrderId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toPublicResponse(entity: AbandonedCartEntity): AbandonedCartPublicResponseDTO {
    return {
      id: entity.id,
      status: entity.status.value,
      itemCount: entity.itemCount,
      cartValue: entity.cartValue,
      currency: entity.currency,
      abandonedAt: entity.abandonedAt,
      remindersSent: entity.remindersSent,
    };
  }
}
