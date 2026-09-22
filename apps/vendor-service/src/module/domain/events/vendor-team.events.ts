import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorTeam';

export class TeamMemberAddedEvent extends BaseDomainEvent<
  'vendor.team.member.added',
  { memberId: string; vendorId: string; userId: string; role: string }
> {
  constructor(
    aggregateId: string,
    memberId: string,
    vendorId: string,
    userId: string,
    role: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.team.member.added',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { memberId, vendorId, userId, role },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TeamMemberRemovedEvent extends BaseDomainEvent<
  'vendor.team.member.removed',
  { memberId: string; vendorId: string; userId: string }
> {
  constructor(
    aggregateId: string,
    memberId: string,
    vendorId: string,
    userId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.team.member.removed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { memberId, vendorId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
