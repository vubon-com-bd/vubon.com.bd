/**
 * RecoveryCodeVO — One-time account recovery code
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Format XXXX-XXXX (uppercase alphanumeric)
 * - 8 significant chars
 * - Redacted in serialization
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const PATTERN = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;

export class RecoveryCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): RecoveryCodeVO {
    if (typeof raw !== 'string') {
      throw new Error('Recovery code must be a string');
    }
    const normalized = raw.trim().toUpperCase().replace(/\s/g, '');
    if (!PATTERN.test(normalized)) {
      throw new Error('Recovery code must match XXXX-XXXX');
    }
    return new RecoveryCodeVO(normalized);
  }

  get masked(): string {
    return `****-${this.value.slice(-4)}`;
  }

  override toJSON(): string {
    return this.masked;
  }

  override toString(): string {
    return this.masked;
  }
}
