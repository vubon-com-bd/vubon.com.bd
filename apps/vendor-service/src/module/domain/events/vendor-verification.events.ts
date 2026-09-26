import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorVerification';

export class VerificationSubmittedEvent extends BaseDomainEvent<
  'vendor.verification.submitted',
  { verificationId: string; vendorId: string; documentCount: number }
> {
  constructor(
    aggregateId: string,
    verificationId: string,
    vendorId: string,
    documentCount: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.verification.submitted',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { verificationId, vendorId, documentCount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class VendorVerifiedEvent extends BaseDomainEvent<
  'vendor.verified',
  { verificationId: string; vendorId: string }
> {
  constructor(
    aggregateId: string,
    verificationId: string,
    vendorId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.verified',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { verificationId, vendorId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
