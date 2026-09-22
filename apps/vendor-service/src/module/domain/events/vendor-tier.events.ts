import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'Vendor';

export class VendorTierUpgradedEvent extends BaseDomainEvent<
  'vendor.tier.upgraded',
  { vendorId: string; fromTier: string; toTier: string }
> {
  constructor(
    aggregateId: string,
    vendorId: string,
    fromTier: string,
    toTier: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.tier.upgraded',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { vendorId, fromTier, toTier },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class VendorTierDowngradedEvent extends BaseDomainEvent<
  'vendor.tier.downgraded',
  { vendorId: string; fromTier: string; toTier: string }
> {
  constructor(
    aggregateId: string,
    vendorId: string,
    fromTier: string,
    toTier: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.tier.downgraded',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { vendorId, fromTier, toTier },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
