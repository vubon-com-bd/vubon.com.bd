/**
 * Event Payload Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics event-এর actual data (properties)।
 * Business Rule:
 * - Max 100 keys (DoS protection)
 * - Max 50KB serialized (DoS protection)
 * - Sensitive keys allowed না (password, token, secret, cvv, ssn)
 * - Nested depth max 5
 * - Immutable (deep-frozen)
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import type { JsonValue } from '@vubon/shared-types/common';

const MAX_KEYS = 100;
const MAX_BYTES = 50 * 1024;
const MAX_DEPTH = 5;

const SENSITIVE_KEYS: readonly string[] = [
  'password',
  'passwd',
  'pwd',
  'token',
  'access_token',
  'refresh_token',
  'secret',
  'api_key',
  'apikey',
  'private_key',
  'cvv',
  'cvc',
  'ssn',
  'credit_card',
  'card_number',
  'pin',
];

export type EventPayloadValue = Readonly<Record<string, JsonValue>>;

export class EventPayloadVO extends BaseCodeVO {
  private readonly _payload: EventPayloadValue;

  private constructor(payload: EventPayloadValue) {
    super(JSON.stringify(payload));
    this._payload = payload;
    Object.freeze(this);
  }

  /**
   * Object থেকে EventPayloadVO তৈরি
   */
  static create(input: Record<string, unknown>): EventPayloadVO {
    if (input === null || typeof input !== 'object' || Array.isArray(input)) {
      throw new Error('EventPayload must be a plain object');
    }

    const keys = Object.keys(input);

    if (keys.length > MAX_KEYS) {
      throw new Error(
        `EventPayload has too many keys (max ${MAX_KEYS}, got ${keys.length})`
      );
    }

    // Sensitive key check (deep)
    EventPayloadVO.assertNoSensitiveKeys(input, 0);

    // Serialize to validate size + JSON-safety
    let serialized: string;
    try {
      serialized = JSON.stringify(input);
    } catch {
      throw new Error('EventPayload contains circular references');
    }

    const bytes = new TextEncoder().encode(serialized).length;

    if (bytes > MAX_BYTES) {
      throw new Error(
        `EventPayload too large (max ${MAX_BYTES} bytes, got ${bytes})`
      );
    }

    // Deep freeze
    const frozen = EventPayloadVO.deepFreeze(input);

    return new EventPayloadVO(frozen as EventPayloadValue);
  }

  /**
   * Empty payload তৈরি করে
   */
  static empty(): EventPayloadVO {
    return EventPayloadVO.create({});
  }

  /**
   * Underlying payload object
   */
  get payload(): EventPayloadValue {
    return this._payload;
  }

  /**
   * Serialized JSON string
   */
  get raw(): string {
    return this.value;
  }

  /**
   * Size in bytes
   */
  sizeInBytes(): number {
    return new TextEncoder().encode(this.value).length;
  }

  /**
   * Key count
   */
  keyCount(): number {
    return Object.keys(this._payload).length;
  }

  /**
   * Empty কিনা
   */
  isEmpty(): boolean {
    return this.keyCount() === 0;
  }

  /**
   * Specific key আছে কিনা
   */
  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._payload, key);
  }

  /**
   * Value get (top-level only)
   */
  get<T = JsonValue>(key: string): T | undefined {
    return this._payload[key] as T | undefined;
  }

  // ─── Private helpers ────────────────────────────────

  private static assertNoSensitiveKeys(
    obj: Record<string, unknown>,
    depth: number
  ): void {
    if (depth > MAX_DEPTH) {
      throw new Error(`EventPayload nesting too deep (max ${MAX_DEPTH})`);
    }

    for (const key of Object.keys(obj)) {
      const lowerKey = key.toLowerCase();
      if (SENSITIVE_KEYS.some((s) => lowerKey.includes(s))) {
        throw new Error(`EventPayload contains sensitive key: "${key}"`);
      }

      const val = obj[key];
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        EventPayloadVO.assertNoSensitiveKeys(
          val as Record<string, unknown>,
          depth + 1
        );
      } else if (Array.isArray(val)) {
        for (const item of val) {
          if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
            EventPayloadVO.assertNoSensitiveKeys(
              item as Record<string, unknown>,
              depth + 1
            );
          }
        }
      }
    }
  }

  private static deepFreeze<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;

    Object.freeze(obj);

    for (const key of Object.keys(obj as object)) {
      const val = (obj as Record<string, unknown>)[key];
      if (val !== null && typeof val === 'object' && !Object.isFrozen(val)) {
        EventPayloadVO.deepFreeze(val);
      }
    }

    return obj;
  }
}
