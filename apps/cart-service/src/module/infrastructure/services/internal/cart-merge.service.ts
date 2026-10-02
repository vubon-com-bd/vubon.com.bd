/**
 * CartMergeService (infrastructure) — orchestrates merge persistence
 * @module cart-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartMergeService as DomainMerge, type MergeResult } from '../../../domain/services/cart-merge.service.js';
import { MergeStrategyVO } from '../../../domain/value-objects/primitives/merge-strategy.vo.js';

export const CART_MERGE_SERVICE = Symbol('CART_MERGE_SERVICE');

@Injectable()
export class CartMergeService {
  private readonly logger = new Logger(CartMergeService.name);
  private readonly domain = new DomainMerge();

  executeMerge(params: {
    source: CartEntity;
    target: CartEntity;
    strategy: MergeStrategyVO;
    now: string;
  }): MergeResult {
    const result = this.domain.merge(
      params.source,
      params.target,
      params.strategy,
      params.now,
    );
    this.logger.log(
      `Merge: source=${params.source.id} target=${params.target.id} merged=${result.itemsMerged} conflicts=${result.conflicts.length}`,
    );
    return result;
  }
}
