/**
 * Widget Config Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Widget-এর configuration (JSON-based)।
 * Business Rule:
 * - Max 20KB serialized
 * - Max 5 nested depth
 * - Sensitive keys blocked
 * - Immutable (deep-frozen)
 * - Safe for chart config, table config, filters
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import type { JsonValue } from '@vubon/shared-types/common';

const MAX_BYTES = 20 * 1024;
const MAX_DEPTH = 5;
const MAX_KEYS = 50;

const SENSITIVE_KEYS: readonly string[] = [
  'password',
  'token',
  'secret',
  'api_key',
  'apikey',
  'cvv',
  'ssn',
];

export type WidgetConfigValue = Readonly<Record<string, JsonValue>>;

export class WidgetConfigVO extends BaseCodeVO {
  private readonly _config: WidgetConfigValue;

  private constructor(config: WidgetConfigValue) {
    super(JSON.stringify(config));
    this._config = config;
    Object.freeze(this);
  }

  static create(input: Record<string, unknown>): WidgetConfigVO {
    if (input === null || typeof input !== 'object' || Array.isArray(input)) {
      throw new Error('WidgetConfig must be a plain object');
    }

    const keys = Object.keys(input);
    if (keys.length > MAX_KEYS) {
      throw new Error(`WidgetConfig has too many keys (max ${MAX_KEYS})`);
    }

    WidgetConfigVO.assertSafe(input, 0);

    let serialized: string;
    try {
      serialized = JSON.stringify(input);
    } catch {
      throw new Error('WidgetConfig contains circular references');
    }

    const bytes = new TextEncoder().encode(serialized).length;
    if (bytes > MAX_BYTES) {
      throw new Error(
        `WidgetConfig too large (max ${MAX_BYTES} bytes, got ${bytes})`
      );
    }

    const frozen = WidgetConfigVO.deepFreeze(input);
    return new WidgetConfigVO(frozen as WidgetConfigValue);
  }

  static empty(): WidgetConfigVO {
    return WidgetConfigVO.create({});
  }

  get config(): WidgetConfigValue {
    return this._config;
  }

  keyCount(): number {
    return Object.keys(this._config).length;
  }

  isEmpty(): boolean {
    return this.keyCount() === 0;
  }

  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._config, key);
  }

  get<T = JsonValue>(key: string): T | undefined {
    return this._config[key] as T | undefined;
  }

  sizeInBytes(): number {
    return new TextEncoder().encode(this.value).length;
  }

  // ─── Private helpers ─────────────────────────────

  private static assertSafe(obj: Record<string, unknown>, depth: number): void {
    if (depth > MAX_DEPTH) {
      throw new Error(`WidgetConfig nesting too deep (max ${MAX_DEPTH})`);
    }

    for (const key of Object.keys(obj)) {
      const lowerKey = key.toLowerCase();
      if (SENSITIVE_KEYS.some((s) => lowerKey.includes(s))) {
        throw new Error(`WidgetConfig contains sensitive key: "${key}"`);
      }

      const val = obj[key];
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        WidgetConfigVO.assertSafe(val as Record<string, unknown>, depth + 1);
      } else if (Array.isArray(val)) {
        for (const item of val) {
          if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
            WidgetConfigVO.assertSafe(item as Record<string, unknown>, depth + 1);
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
        WidgetConfigVO.deepFreeze(val);
      }
    }
    return obj;
  }
}
