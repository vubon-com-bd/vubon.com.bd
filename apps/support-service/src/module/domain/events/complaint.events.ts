/**
 * Complaint Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { ComplaintIdVO } from '../value-objects/primitives/complaint-id.vo';
import { ComplaintTypeVO } from '../value-objects/primitives/complaint-type.vo';
import { ComplaintSeverityVO } from '../value-objects/primitives/complaint-severity.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

interface MetaFields {
  readonly id: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

const meta = (
  aggregateId: string,
  aggregateType: string,
  version: number,
  occurredAt: number,
): MetaFields => ({
  id: `${aggregateId}-${version}-${occurredAt}`,
  aggregateId,
  aggregateType,
  occurredAt: toTimestamp(occurredAt),
  version,
});

export interface ComplaintReceivedPayload {
  readonly userId: string;
  readonly type: string;
  readonly severity: string;
}

export class ComplaintReceivedEvent extends BaseDomainEvent<
  'support.complaint.received',
  ComplaintReceivedPayload
> {
  constructor(
    id: ComplaintIdVO,
    userId: UserIdVO,
    type: ComplaintTypeVO,
    severity: ComplaintSeverityVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'complaint', version, occurredAt),
      type: 'support.complaint.received',
      payload: { userId: userId.value, type: type.value, severity: severity.value },
    });
  }
}

export interface ComplaintResolvedPayload {
  readonly resolution: string;
  readonly resolverId: string;
}

export class ComplaintResolvedEvent extends BaseDomainEvent<
  'support.complaint.resolved',
  ComplaintResolvedPayload
> {
  constructor(
    id: ComplaintIdVO,
    resolverId: UserIdVO,
    resolution: string,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'complaint', version, occurredAt),
      type: 'support.complaint.resolved',
      payload: { resolverId: resolverId.value, resolution },
    });
  }
}
