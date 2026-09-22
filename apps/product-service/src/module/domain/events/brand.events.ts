import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Brand';

export class BrandCreatedEvent extends BaseDomainEvent<
  'brand.created',
  { brandId: string; name: string; slug: string }
> {
  constructor(aggregateId: string, brandId: string, name: string, slug: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'brand.created',
      aggregateId,
      aggregateType: AGG,
      payload: { brandId, name, slug },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class BrandUpdatedEvent extends BaseDomainEvent<
  'brand.updated',
  { brandId: string; fields: readonly string[] }
> {
  constructor(aggregateId: string, brandId: string, fields: readonly string[], version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'brand.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { brandId, fields },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class BrandDeletedEvent extends BaseDomainEvent<
  'brand.deleted',
  { brandId: string }
> {
  constructor(aggregateId: string, brandId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'brand.deleted',
      aggregateId,
      aggregateType: AGG,
      payload: { brandId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
