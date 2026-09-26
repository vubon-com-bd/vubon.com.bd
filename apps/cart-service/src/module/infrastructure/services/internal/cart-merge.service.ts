import { Injectable } from '@nestjs/common';
import { CartMergeService as DomainMergeService } from '../../../domain/services/cart-merge.service';
import type { CartItemEntity } from '../../../domain/entities/cart-item.entity';

export interface MergeOutput {
  readonly merged: readonly CartItemEntity[];
  readonly addedCount: number;
  readonly mergedCount: number;
  readonly conflicts: number;
}

@Injectable()
export class CartMergeService {
  constructor(private readonly domainMerge: DomainMergeService) {}

  merge(
    source: readonly CartItemEntity[],
    target: readonly CartItemEntity[],
    strategy: 'merge' | 'keep_target' | 'keep_source' | 'max_quantity' = 'merge',
  ): MergeOutput {
    return this.domainMerge.merge(source, target, strategy);
  }
}
