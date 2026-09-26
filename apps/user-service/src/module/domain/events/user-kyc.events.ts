import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'UserKyc';

export class KycSubmittedEvent extends BaseDomainEvent<
  'user.kyc.submitted',
  { userId: string; kycId: string }
> {
  constructor(aggregateId: string, userId: string, kycId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.kyc.submitted',
      aggregateId,
      aggregateType: AGG,
      payload: { userId, kycId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class KycVerifiedEvent extends BaseDomainEvent<
  'user.kyc.verified',
  { userId: string; kycId: string }
> {
  constructor(aggregateId: string, userId: string, kycId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.kyc.verified',
      aggregateId,
      aggregateType: AGG,
      payload: { userId, kycId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class KycRejectedEvent extends BaseDomainEvent<
  'user.kyc.rejected',
  { userId: string; kycId: string; reason: string }
> {
  constructor(aggregateId: string, userId: string, kycId: string, reason: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.kyc.rejected',
      aggregateId,
      aggregateType: AGG,
      payload: { userId, kycId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
