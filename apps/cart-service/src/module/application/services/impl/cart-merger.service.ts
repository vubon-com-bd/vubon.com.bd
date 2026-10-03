/**
 * CartMergerService — implements ICartMergerService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { ICartMergerService } from '../interfaces/cart-merger.service.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import {
  GUEST_CART_REPOSITORY,
  type GuestCartRepository,
} from '../../../domain/repositories/guest-cart.repository.interface.js';
import {
  CART_MERGER_REPOSITORY,
  type CartMergerRepository,
} from '../../../domain/repositories/cart-merger.repository.interface.js';
import { CartMergerEntity } from '../../../domain/entities/cart-merger.entity.js';
import { MergeStrategyVO } from '../../../domain/value-objects/primitives/merge-strategy.vo.js';
import { CartMergeService } from '../../../domain/services/cart-merge.service.js';
import { GuestTokenVO } from '../../../domain/value-objects/primitives/guest-token.vo.js';
import { CartUserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import type { MergeGuestCartRequestDTO } from '../../dtos/requests/guest/merge-guest-cart.dto.js';
import type { MergeResponseDTO } from '../../dtos/responses/merge-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

@Injectable()
export class CartMergerService implements ICartMergerService {
  private readonly merger = new CartMergeService();

  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
    @Inject(GUEST_CART_REPOSITORY) private readonly guestRepo: GuestCartRepository,
    @Inject(CART_MERGER_REPOSITORY) private readonly mergeRepo: CartMergerRepository,
  ) {}

  async mergeGuestCart(dto: MergeGuestCartRequestDTO): Promise<MergeResponseDTO> {
    const target = await this.cartRepo.findById(dto.targetCartId);
    if (!target) throw new CartNotFoundApplicationError(dto.targetCartId);
    const guest = await this.guestRepo.findByToken(GuestTokenVO.create(dto.guestToken));
    if (!guest) throw new CartNotFoundApplicationError(dto.guestToken);
    const source = await this.cartRepo.findById(guest.id);
    if (!source) throw new CartNotFoundApplicationError(guest.id);

    const strategy = dto.strategy
      ? MergeStrategyVO.create(dto.strategy)
      : MergeStrategyVO.default();
    const now = new Date().toISOString();
    const result = this.merger.merge(source, target, strategy, now);
    target['_items'] = [...result.mergedItems];
    await this.cartRepo.save(target);

    const merger = CartMergerEntity.create({
      id: randomUUID(),
      now,
      props: {
        sourceCartId: source.toIdVO,
        targetCartId: target.toIdVO,
        strategy,
        itemsMerged: result.itemsMerged,
        conflicts: result.conflicts.length,
        mergedAt: now,
        mergedBy: dto.userId,
      },
    });
    const saved = await this.mergeRepo.save(merger);
    guest.markMerged(target.id, dto.userId, result.itemsMerged, now);
    await this.guestRepo.save(guest);
    void CartUserIdVO;
    return this.toResponse(saved, result.conflicts);
  }

  async getById(id: string): Promise<MergeResponseDTO | null> {
    const merger = await this.mergeRepo.findById(id);
    return merger ? this.toResponse(merger, []) : null;
  }

  private toResponse(
    m: CartMergerEntity,
    conflicts: readonly { productId: string; variantId?: string; sourceQty: number; targetQty: number; mergedQty: number; reason: string }[],
  ): MergeResponseDTO {
    return {
      mergerId: m.id,
      sourceCartId: m.sourceCartId.value,
      targetCartId: m.targetCartId.value,
      strategy: m.strategy.value,
      itemsMerged: m.itemsMerged,
      itemsDropped: 0,
      conflicts: conflicts.map((c) => ({ ...c })),
      mergedAt: m.mergedAt,
    };
  }
}
