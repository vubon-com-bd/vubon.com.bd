/**
 * Vendor Return Policy domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorReturnPolicy';

export const VENDOR_RETURN_POLICY_EVENT_TYPE = {
  CONFIGURED: 'vendor.return_policy.configured',
  TYPE_CHANGED: 'vendor.return_policy.type_changed',
  WINDOW_CHANGED: 'vendor.return_policy.window_changed',
  EXCLUSION_ADDED: 'vendor.return_policy.exclusion_added',
  EXCLUSION_REMOVED: 'vendor.return_policy.exclusion_removed',
} as const;

export interface VendorReturnPolicyConfiguredPayload {
  readonly policyId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly windowDays: number;
  readonly freeReturn: boolean;
  readonly configuredAt: string;
}
export interface VendorReturnPolicyTypeChangedPayload {
  readonly policyId: string;
  readonly vendorId: string;
  readonly fromType: string;
  readonly toType: string;
  readonly changedAt: string;
}
export interface VendorReturnPolicyWindowChangedPayload {
  readonly policyId: string;
  readonly vendorId: string;
  readonly fromDays: number;
  readonly toDays: number;
  readonly changedAt: string;
}
export interface VendorReturnPolicyExclusionPayload {
  readonly policyId: string;
  readonly vendorId: string;
  readonly term: string;
  readonly changedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};
function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VendorReturnPolicyConfiguredEvent extends BaseDomainEvent<typeof VENDOR_RETURN_POLICY_EVENT_TYPE.CONFIGURED, VendorReturnPolicyConfiguredPayload> {
  constructor(p: EventParams<VendorReturnPolicyConfiguredPayload>) { super(buildParams(VENDOR_RETURN_POLICY_EVENT_TYPE.CONFIGURED, p)); }
}
export class VendorReturnPolicyTypeChangedEvent extends BaseDomainEvent<typeof VENDOR_RETURN_POLICY_EVENT_TYPE.TYPE_CHANGED, VendorReturnPolicyTypeChangedPayload> {
  constructor(p: EventParams<VendorReturnPolicyTypeChangedPayload>) { super(buildParams(VENDOR_RETURN_POLICY_EVENT_TYPE.TYPE_CHANGED, p)); }
}
export class VendorReturnPolicyWindowChangedEvent extends BaseDomainEvent<typeof VENDOR_RETURN_POLICY_EVENT_TYPE.WINDOW_CHANGED, VendorReturnPolicyWindowChangedPayload> {
  constructor(p: EventParams<VendorReturnPolicyWindowChangedPayload>) { super(buildParams(VENDOR_RETURN_POLICY_EVENT_TYPE.WINDOW_CHANGED, p)); }
}
export class VendorReturnPolicyExclusionAddedEvent extends BaseDomainEvent<typeof VENDOR_RETURN_POLICY_EVENT_TYPE.EXCLUSION_ADDED, VendorReturnPolicyExclusionPayload> {
  constructor(p: EventParams<VendorReturnPolicyExclusionPayload>) { super(buildParams(VENDOR_RETURN_POLICY_EVENT_TYPE.EXCLUSION_ADDED, p)); }
}
export class VendorReturnPolicyExclusionRemovedEvent extends BaseDomainEvent<typeof VENDOR_RETURN_POLICY_EVENT_TYPE.EXCLUSION_REMOVED, VendorReturnPolicyExclusionPayload> {
  constructor(p: EventParams<VendorReturnPolicyExclusionPayload>) { super(buildParams(VENDOR_RETURN_POLICY_EVENT_TYPE.EXCLUSION_REMOVED, p)); }
}
