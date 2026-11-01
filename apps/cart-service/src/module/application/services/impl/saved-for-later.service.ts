/**
 * SavedForLaterService
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { randomUUID } from 'node:crypto';

import type {
  ISavedForLaterService,
  SavedListOptionsDTO,
} from '../interfaces/saved-for-later.service.interface.js';

import {
  SAVED_FOR_LATER_REPOSITORY,
  type SavedForLaterRepository,
} from '../../../domain/repositories/saved-for-later.repository.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../../domain/repositories/cart-item.repository.interface.js';

import { SavedForLaterEntity } from '../../../domain/entities/saved-for-later.entity.js';
import { SavedItemIdVO } from '../../../domain/value-objects/primitives/saved-item-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';
import { CartItemIdVO } from '../../../domain/value-objects/primitives/cart-item-id.vo.js';

import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';
import {
  CartItemNotFoundApplicationError,
} from '../../errors/cart-item.errors.js';

import type {
  SaveForLaterRequestDTO,
  MoveToCartRequestDTO,
  RemoveSavedRequestDTO,
} from '../../dtos/requests/saved/index.js';
import type {
  SavedForLaterResponseDTO,
  SavedForLaterPublicResponseDTO,
  SavedForLaterListResponseDTO,
} from '../../dtos/responses/saved-for-later-response.dto.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@Injectable()
export class SavedForLaterService implements ISavedForLaterService {
  private readonly logger = new Logger(SavedForLaterService.name);

  constructor(
    @Inject(SAVED_FOR_LATER_REPOSITORY)
    private readonly savedRepo: SavedForLaterRepository,
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async save(
    dto: SaveForLaterRequestDTO,
    actorId?: string,
  ): Promise<SavedForLaterResponseDTO> {
    // Load the source item to derive user/product info
    const item = await this.itemRepo.findById(dto.itemId);
    if (!item) throw new CartItemNotFoundApplicationError(dto.itemId);

    const cart = await this.cartRepo.findById(dto.cartId);
    if (!cart) throw new CartNotFoundApplicationError(dto.cartId);

    const userId = cart.userId?.value;
    if (!userId) {
      throw new CartNotFoundApplicationError(dto.cartId);
    }

    const now = new Date().toISOString();
    const id = randomUUID();

    const entity = SavedForLaterEntity.create({
      id: SavedItemIdVO.create(id),
      now,
      props: {
        userId: UserIdVO.create(userId),
        productId: ProductIdVO.create(item.productId.value),
        variantId: item.variantId,
        note: dto.note,
        savedAt: now,
      },
    });

    const saved = await this.savedRepo.save(entity);

    await this.eventBridge.publishFromEntity(saved);

    // Remove item from cart
    item.markRemoved(now);
    cart.applyItemCountDelta(-1, now);
    const savedCart = await this.cartRepo.save(cart);


    await this.eventBridge.publishFromEntity(savedCart);
    this.logger.log(`Item ${item.id} moved to saved for user ${userId} by ${actorId ?? 'system'}`);
    return this.toResponse(saved);
  }

  async moveToCart(
    dto: MoveToCartRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO> {
    const entity = await this.loadSaved(dto.savedItemId);
    const cart = await this.cartRepo.findById(dto.cartId);
    if (!cart) throw new CartNotFoundApplicationError(dto.cartId);

    const now = new Date().toISOString();
    entity.moveToCart(now);
    const saved = await this.savedRepo.save(entity);


    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Saved item ${saved.id} moved to cart ${cart.id} by ${actorId ?? 'system'}`);

    return {
      success: true,
      cartId: cart.id,
      message: 'Saved item moved to cart',
      at: now,
    };
  }

  async remove(
    dto: RemoveSavedRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO> {
    const entity = await this.loadSaved(dto.savedItemId);
    const now = new Date().toISOString();

    entity.remove(now);
    const saved = await this.savedRepo.save(entity);


    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Saved item ${saved.id} removed by ${actorId ?? 'system'}`);

    return {
      success: true,
      cartId: '',
      message: 'Saved item removed',
      at: now,
    };
  }

  async getById(id: string): Promise<SavedForLaterResponseDTO> {
    const entity = await this.loadSaved(id);
    return this.toResponse(entity);
  }

  async getPublicById(id: string): Promise<SavedForLaterPublicResponseDTO> {
    const entity = await this.loadSaved(id);
    return this.toPublicResponse(entity);
  }

  async listByUser(userId: string): Promise<readonly SavedForLaterPublicResponseDTO[]> {
    const items = await this.savedRepo.findActiveByUserId(userId);
    return items.map((i) => this.toPublicResponse(i));
  }

  async list(options: SavedListOptionsDTO): Promise<SavedForLaterListResponseDTO> {
    const result = await this.savedRepo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return {
      items: result.items.map((i) => this.toPublicResponse(i)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  // ═══════════════ Helpers ═══════════════

  private async loadSaved(id: string): Promise<SavedForLaterEntity> {
    const vo = SavedItemIdVO.create(id);
    const entity = await this.savedRepo.findByIdVO(vo);
    if (!entity) {
      throw new CartItemNotFoundApplicationError(id);
    }
    return entity;
  }

  private toResponse(entity: SavedForLaterEntity): SavedForLaterResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId.value,
      productId: entity.productId.value,
      variantId: entity.variantId?.value,
      status: entity.status.value,
      note: entity.note,
      savedAt: entity.savedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toPublicResponse(entity: SavedForLaterEntity): SavedForLaterPublicResponseDTO {
    return {
      id: entity.id,
      productId: entity.productId.value,
      variantId: entity.variantId?.value,
      status: entity.status.value,
      note: entity.note,
      savedAt: entity.savedAt,
    };
  }
}
