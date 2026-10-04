/**
 * SavedForLaterService — implements ISavedForLaterService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { ISavedForLaterService } from '../interfaces/saved-for-later.service.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import {
  SAVED_FOR_LATER_REPOSITORY,
  type SavedForLaterRepository,
} from '../../../domain/repositories/saved-for-later.repository.interface.js';
import { SavedForLaterEntity } from '../../../domain/entities/saved-for-later.entity.js';
import { CartUserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { CartProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { CartVariantIdVO } from '../../../domain/value-objects/primitives/variant-id.vo.js';
import { SavedItemStatusVO } from '../../../domain/value-objects/primitives/saved-item-status.vo.js';
import { SAVED_ITEM_STATUS } from '@vubon/shared-constants/business/cart';
import type { SaveForLaterRequestDTO } from '../../dtos/requests/saved/save-for-later.dto.js';
import type { MoveToCartRequestDTO } from '../../dtos/requests/saved/move-to-cart.dto.js';
import type { RemoveSavedRequestDTO } from '../../dtos/requests/saved/remove-saved.dto.js';
import type {
  SavedForLaterResponseDTO,
  SavedListResponseDTO,
} from '../../dtos/responses/saved-for-later-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';
import { CartItemNotFoundApplicationError } from '../../errors/cart-item.errors.js';

@Injectable()
export class SavedForLaterService implements ISavedForLaterService {
  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
    @Inject(SAVED_FOR_LATER_REPOSITORY) private readonly savedRepo: SavedForLaterRepository,
  ) {}

  async save(dto: SaveForLaterRequestDTO): Promise<SavedForLaterResponseDTO> {
    const cart = await this.cartRepo.findById(dto.cartId);
    if (!cart) throw new CartNotFoundApplicationError(dto.cartId);
    const item = cart.findItem(dto.itemId);
    if (!item) throw new CartItemNotFoundApplicationError(dto.itemId);

    const now = new Date().toISOString();
    const entity = SavedForLaterEntity.create({
      id: randomUUID(),
      now,
      props: {
        userId: CartUserIdVO.create(dto.userId),
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity.value,
        status: SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE),
        notes: dto.notes,
      },
    });
    const saved = await this.savedRepo.save(entity);
    cart.removeItem(dto.itemId, dto.userId, now);
    await this.cartRepo.save(cart);
    return this.toResponse(saved);
  }

  async moveToCart(dto: MoveToCartRequestDTO): Promise<void> {
    const saved = await this.savedRepo.findById(dto.savedItemId);
    if (!saved) throw new CartItemNotFoundApplicationError(dto.savedItemId);
    const cart = await this.cartRepo.findById(dto.cartId);
    if (!cart) throw new CartNotFoundApplicationError(dto.cartId);
    const now = new Date().toISOString();
    saved.moveToCart(cart.id, now);
    await this.savedRepo.save(saved);
  }

  async remove(dto: RemoveSavedRequestDTO): Promise<void> {
    const saved = await this.savedRepo.findById(dto.savedItemId);
    if (!saved) return;
    saved.remove();
    await this.savedRepo.delete(dto.savedItemId);
  }

  async listByUser(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<SavedListResponseDTO> {
    const result = await this.savedRepo.findPaginated(
      CartUserIdVO.create(userId),
      { page, limit },
    );
    return {
      items: result.items.map((s) => this.toResponse(s)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  private toResponse(e: SavedForLaterEntity): SavedForLaterResponseDTO {
    return {
      id: e.id,
      userId: e.userId.value,
      productId: e.productId.value,
      variantId: e.variantId?.value,
      quantity: e.quantity,
      status: e.status.value,
      notes: e.notes,
      addedAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
}

void CartProductIdVO;
void CartVariantIdVO;
