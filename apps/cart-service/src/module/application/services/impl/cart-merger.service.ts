/**
 * CartMergerService — plan and execute merges
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { randomUUID } from 'node:crypto';

import type { ICartMergerService } from '../interfaces/cart-merger.service.interface.js';

import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../../domain/repositories/cart-item.repository.interface.js';
import {
  CART_MERGER_REPOSITORY,
  type CartMergerRepository,
} from '../../../domain/repositories/cart-merger.repository.interface.js';

import { CartMergerEntity } from '../../../domain/entities/cart-merger.entity.js';
import { CartMergerIdVO } from '../../../domain/value-objects/primitives/cart-merger-id.vo.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';
import { MergeStrategyVO } from '../../../domain/value-objects/primitives/merge-strategy.vo.js';

import { CartMergeService } from '../../../domain/services/cart-merge.service.js';

import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

import type {
  MergeResponseDTO,
  MergeSummaryResponseDTO,
} from '../../dtos/responses/merge-response.dto.js';

@Injectable()
export class CartMergerService implements ICartMergerService {
  private readonly logger = new Logger(CartMergerService.name);

  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
    @Inject(CART_MERGER_REPOSITORY)
    private readonly mergerRepo: CartMergerRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async plan(
    sourceCartId: string,
    targetCartId: string,
    strategyStr?: string,
  ): Promise<MergeResponseDTO> {
    const source = await this.loadCart(sourceCartId);
    const target = await this.loadCart(targetCartId);
    const strategy = MergeStrategyVO.create(strategyStr ?? 'sum_quantity');

    const sourceItems = await this.itemRepo.findByCartId(source.id);
    const targetItems = await this.itemRepo.findByCartId(target.id);

    const plan = CartMergeService.plan(targetItems, sourceItems, strategy);
    const now = new Date().toISOString();

    return {
      mergerId: 'plan-' + randomUUID(),
      sourceCartId: source.id,
      targetCartId: target.id,
      strategy: strategy.value,
      itemsMerged: plan.itemsMerged,
      conflicts: plan.conflicts,
      mergedItems: plan.mergedItems.map((m) => ({
        productId: m.productId,
        variantId: m.variantId,
        sourceItemId: m.sourceItemId,
        targetItemId: m.targetItemId,
        resolvedQuantity: m.resolvedQuantity,
        isConflict: m.isConflict,
      })),
      mergedAt: now,
    };
  }

  async execute(
    sourceCartId: string,
    targetCartId: string,
    strategyStr?: string,
    _actorId?: string,
  ): Promise<MergeSummaryResponseDTO> {
    const source = await this.loadCart(sourceCartId);
    const target = await this.loadCart(targetCartId);
    const strategy = MergeStrategyVO.create(strategyStr ?? 'sum_quantity');

    CartMergeService.assertCanMerge(source, target);

    const sourceItems = await this.itemRepo.findByCartId(source.id);
    const targetItems = await this.itemRepo.findByCartId(target.id);

    const plan = CartMergeService.plan(targetItems, sourceItems, strategy);

    const now = new Date().toISOString();
    const mergerId = randomUUID();

    const merger = CartMergerEntity.create({
      id: CartMergerIdVO.create(mergerId),
      now,
      props: {
        sourceCartId: source.toIdVO,
        targetCartId: target.toIdVO,
        strategy,
        mergedAt: now,
      },
    });

    merger.complete(plan.itemsMerged, now);
    const savedMerger = await this.mergerRepo.save(merger);


    await this.eventBridge.publishFromEntity(savedMerger);
    // Mark source merged
    source.markMerged(target.id, now);
    const savedSource = await this.cartRepo.save(source);


    await this.eventBridge.publishFromEntity(savedSource);
    this.logger.log(
      `Merge executed: ${source.id} → ${target.id} (items=${plan.itemsMerged}, conflicts=${plan.conflicts})`,
    );

    return {
      success: true,
      mergerId: merger.id,
      itemsMerged: plan.itemsMerged,
      conflicts: plan.conflicts,
      mergedAt: now,
    };
  }

  async getById(mergerId: string): Promise<MergeResponseDTO> {
    const vo = CartMergerIdVO.create(mergerId);
    const entity = await this.mergerRepo.findByIdVO(vo);
    if (!entity) throw new CartNotFoundApplicationError(mergerId);

    return {
      mergerId: entity.id,
      sourceCartId: entity.sourceCartId.value,
      targetCartId: entity.targetCartId.value,
      strategy: entity.strategy.value,
      itemsMerged: entity.itemsMerged,
      conflicts: entity.conflicts,
      mergedItems: [],
      mergedAt: entity.mergedAt,
    };
  }

  async findByCartId(cartId: string): Promise<readonly MergeSummaryResponseDTO[]> {
    const items = await this.mergerRepo.findByCartId(cartId);
    return items.map((m) => ({
      success: true as const,
      mergerId: m.id,
      itemsMerged: m.itemsMerged,
      conflicts: m.conflicts,
      mergedAt: m.mergedAt,
    }));
  }

  // ═══════════════ Helpers ═══════════════

  private async loadCart(id: string) {
    const vo = CartIdVO.create(id);
    const cart = await this.cartRepo.findByIdVO(vo);
    if (!cart) throw new CartNotFoundApplicationError(id);
    return cart;
  }
}
