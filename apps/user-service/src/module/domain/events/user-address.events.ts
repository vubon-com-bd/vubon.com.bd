/**
 * UserAddress domain events
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

export interface AddressAddedPayload {
  readonly userId: string;
  readonly addressId: string;
  readonly division: string;
  readonly district: string;
}

export class AddressAddedEvent extends BaseDomainEvent<'address.added', AddressAddedPayload> {
  constructor(p: EventParams<AddressAddedPayload>) {
    super({
      id: p.id,
      type: 'address.added',
      aggregateId: p.aggregateId,
      aggregateType: 'UserAddress',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface AddressUpdatedPayload {
  readonly userId: string;
  readonly addressId: string;
  readonly changedFields: readonly string[];
}

export class AddressUpdatedEvent extends BaseDomainEvent<
  'address.updated',
  AddressUpdatedPayload
> {
  constructor(p: EventParams<AddressUpdatedPayload>) {
    super({
      id: p.id,
      type: 'address.updated',
      aggregateId: p.aggregateId,
      aggregateType: 'UserAddress',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface AddressRemovedPayload {
  readonly userId: string;
  readonly addressId: string;
}

export class AddressRemovedEvent extends BaseDomainEvent<
  'address.removed',
  AddressRemovedPayload
> {
  constructor(p: EventParams<AddressRemovedPayload>) {
    super({
      id: p.id,
      type: 'address.removed',
      aggregateId: p.aggregateId,
      aggregateType: 'UserAddress',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface AddressSetDefaultPayload {
  readonly userId: string;
  readonly addressId: string;
}

export class AddressSetDefaultEvent extends BaseDomainEvent<
  'address.default.set',
  AddressSetDefaultPayload
> {
  constructor(p: EventParams<AddressSetDefaultPayload>) {
    super({
      id: p.id,
      type: 'address.default.set',
      aggregateId: p.aggregateId,
      aggregateType: 'UserAddress',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}
