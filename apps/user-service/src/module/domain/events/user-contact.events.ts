/**
 * UserContact domain events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

interface EventParams<TPayload> {
  readonly id: string;
  readonly aggregateId: string;
  readonly payload: TPayload;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

export interface ContactAddedPayload {
  readonly userId: string;
  readonly contactId: string;
  readonly type: string;
}

export class ContactAddedEvent extends BaseDomainEvent<'contact.added', ContactAddedPayload> {
  constructor(p: EventParams<ContactAddedPayload>) {
    super({
      id: p.id,
      type: 'contact.added',
      aggregateId: p.aggregateId,
      aggregateType: 'UserContact',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface ContactUpdatedPayload {
  readonly userId: string;
  readonly contactId: string;
  readonly changedFields: readonly string[];
}

export class ContactUpdatedEvent extends BaseDomainEvent<
  'contact.updated',
  ContactUpdatedPayload
> {
  constructor(p: EventParams<ContactUpdatedPayload>) {
    super({
      id: p.id,
      type: 'contact.updated',
      aggregateId: p.aggregateId,
      aggregateType: 'UserContact',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface ContactRemovedPayload {
  readonly userId: string;
  readonly contactId: string;
}

export class ContactRemovedEvent extends BaseDomainEvent<
  'contact.removed',
  ContactRemovedPayload
> {
  constructor(p: EventParams<ContactRemovedPayload>) {
    super({
      id: p.id,
      type: 'contact.removed',
      aggregateId: p.aggregateId,
      aggregateType: 'UserContact',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface ContactVerifiedPayload {
  readonly userId: string;
  readonly contactId: string;
  readonly verifiedAt: string;
}

export class ContactVerifiedEvent extends BaseDomainEvent<
  'contact.verified',
  ContactVerifiedPayload
> {
  constructor(p: EventParams<ContactVerifiedPayload>) {
    super({
      id: p.id,
      type: 'contact.verified',
      aggregateId: p.aggregateId,
      aggregateType: 'UserContact',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}
