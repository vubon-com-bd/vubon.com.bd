/**
 * Vendor event helpers — id generator, timestamp, aggregate type
 * @module vendor-service/domain/events
 */
import type { Timestamp } from '@vubon/shared-types/common';

export const VENDOR_AGGREGATE_TYPE = 'Vendor';

let counter = 0;

/**
 * Current timestamp as numeric epoch (shared-types Timestamp is numeric).
 * Event payload fields that need ISO strings will use `new Date().toISOString()`.
 */
export function now(): Timestamp {
  return Date.now() as Timestamp;
}

/** ISO-8601 UTC timestamp — for payload fields that expect strings. */
export function nowIso(): string {
  return new Date().toISOString();
}

/** Unique event id — safe for Node & browser (no crypto global needed). */
export function newEventId(): string {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 10);
  counter = (counter + 1) % 1_000_000;
  return `evt_${t}_${counter.toString(36)}_${r}`;
}
