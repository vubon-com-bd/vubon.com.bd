import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'CartMerger';

export class CartMergedEvent extends BaseDomainEvent<'cart.merged', { mergerId: string; sourceCartId: string; targetCartId: string; userId: string }> {
  constructor(mergerId: string, sourceCartId: string, targetCartId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.merged', aggregateId: mergerId, aggregateType: AGG, payload: { mergerId, sourceCartId, targetCartId, userId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class CartMergeConflictEvent extends BaseDomainEvent<'cart.merge_conflict', { mergerId: string; itemCount: number }> {
  constructor(mergerId: string, itemCount: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.merge_conflict', aggregateId: mergerId, aggregateType: AGG, payload: { mergerId, itemCount }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}
