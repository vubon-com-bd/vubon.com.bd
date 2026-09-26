import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorApproval';

export class VendorApprovedEvent extends BaseDomainEvent<
  'vendor.approved',
  { approvalId: string; vendorId: string; reviewedBy: string }
> {
  constructor(
    aggregateId: string,
    approvalId: string,
    vendorId: string,
    reviewedBy: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.approved',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { approvalId, vendorId, reviewedBy },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class VendorRejectedEvent extends BaseDomainEvent<
  'vendor.rejected',
  { approvalId: string; vendorId: string; reviewedBy: string; reason: string }
> {
  constructor(
    aggregateId: string,
    approvalId: string,
    vendorId: string,
    reviewedBy: string,
    reason: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.rejected',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { approvalId, vendorId, reviewedBy, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
