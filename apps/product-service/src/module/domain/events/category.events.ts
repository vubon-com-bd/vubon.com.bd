import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Category';

export class CategoryCreatedEvent extends BaseDomainEvent<
  'category.created',
  { categoryId: string; name: string; slug: string }
> {
  constructor(aggregateId: string, categoryId: string, name: string, slug: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'category.created',
      aggregateId,
      aggregateType: AGG,
      payload: { categoryId, name, slug },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CategoryUpdatedEvent extends BaseDomainEvent<
  'category.updated',
  { categoryId: string; fields: readonly string[] }
> {
  constructor(aggregateId: string, categoryId: string, fields: readonly string[], version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'category.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { categoryId, fields },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CategoryDeletedEvent extends BaseDomainEvent<
  'category.deleted',
  { categoryId: string }
> {
  constructor(aggregateId: string, categoryId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'category.deleted',
      aggregateId,
      aggregateType: AGG,
      payload: { categoryId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
