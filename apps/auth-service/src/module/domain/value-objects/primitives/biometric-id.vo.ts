/**
 * BiometricIdVO — Opaque biometric enrollment identifier
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const PATTERN = /^[A-Za-z0-9_\-]+$/;
const MIN = 8;
const MAX = 256;

export class BiometricIdVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): BiometricIdVO {
    if (typeof raw !== 'string') {
      throw new Error('Biometric ID must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN || trimmed.length > MAX) {
      throw new Error(`Biometric ID must be ${MIN}–${MAX} chars`);
    }
    if (!PATTERN.test(trimmed)) {
      throw new Error('Biometric ID contains invalid characters');
    }
    return new BiometricIdVO(trimmed);
  }
}
