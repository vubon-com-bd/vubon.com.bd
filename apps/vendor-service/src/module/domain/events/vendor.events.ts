import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'Vendor';

export class VendorRegisteredEvent extends BaseDomainEvent<
  'vendor.registered',
  { vendorId: string; ownerId: string; businessName: string }
> {
  constructor(
    aggregateId: string,
    vendorId: string,
    ownerId: string,
    businessName: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.registered',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { vendorId, ownerId, businessName },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class VendorUpdatedEvent extends BaseDomainEvent<
  'vendor.updated',
  { vendorId: string; fields: readonly string[] }
> {
  constructor(
    aggregateId: string,
    vendorId: string,
    fields: readonly string[],
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.updated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { vendorId, fields },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class VendorDeletedEvent extends BaseDomainEvent<
  'vendor.deleted',
  { vendorId: string }
> {
  constructor(
    aggregateId: string,
    vendorId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.deleted',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { vendorId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ProfileUpdatedEvent extends BaseDomainEvent<
  'vendor.profile.updated',
  { vendorId: string }
> {
  constructor(
    aggregateId: string,
    vendorId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.profile.updated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { vendorId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class BankAccountAddedEvent extends BaseDomainEvent<
  'vendor.bank-account.added',
  { vendorId: string; bankAccountId: string }
> {
  constructor(
    aggregateId: string,
    vendorId: string,
    bankAccountId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.bank-account.added',
      aggregateId,
      aggregateType: 'VendorBankAccount',
      payload: { vendorId, bankAccountId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
