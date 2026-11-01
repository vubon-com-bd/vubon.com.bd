/**
 * Vendor Service Event Helpers
 * @module vendor-service/domain/events
 *
 * DRY helpers — সব event একই pattern follow করে।
 */
import type { Timestamp } from '@vubon/shared-types/common';

// ─── Aggregate Type Constants ──────────────
export const VENDOR_AGGREGATE_TYPE = {
  VENDOR: 'Vendor',
  CONTACT: 'VendorContact',
  ADDRESS: 'VendorAddress',
  BANK_ACCOUNT: 'VendorBankAccount',
  DOCUMENT: 'VendorDocument',
  VERIFICATION: 'VendorVerification',
  APPROVAL: 'VendorApproval',
  SUSPENSION: 'VendorSuspension',
  COMMISSION: 'VendorCommission',
  PAYOUT: 'VendorPayout',
  SETTLEMENT: 'VendorSettlement',
  PERFORMANCE: 'VendorPerformance',
  REVIEW: 'VendorReview',
  TEAM: 'VendorTeam',
  FEATURE: 'VendorFeature',
  SUBSCRIPTION: 'VendorSubscription',
  PERMISSION: 'VendorPermission',
} as const;

export type VendorAggregateType =
  (typeof VENDOR_AGGREGATE_TYPE)[keyof typeof VENDOR_AGGREGATE_TYPE];

// ─── Event Id / Timestamp Helpers ──────────
export function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function now(): Timestamp {
  return new Date().toISOString() as unknown as Timestamp;
}

// ─── Generic Event Params ──────────────────
export interface EventParams<TPayload> {
  readonly id?: string;
  readonly aggregateId: string;
  readonly payload: TPayload;
  readonly occurredAt?: Timestamp;
  readonly version?: number;
  readonly metadata?: {
    readonly correlationId?: string;
    readonly causationId?: string;
    readonly userId?: string;
    readonly source?: string;
  };
}

// ─── DRY Event Params Builder ──────────────
export function buildEventParams<TType extends string, TPayload>(
  type: TType,
  aggregateType: VendorAggregateType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}
