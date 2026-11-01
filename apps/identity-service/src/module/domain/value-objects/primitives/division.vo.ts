/**
 * Division Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { DIVISION } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID: readonly string[] = Object.values(DIVISION);

export class DivisionVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DivisionVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('Division cannot be empty', 'division');
    }
    const normalized = raw.trim().toLowerCase().replace(/\s+/g, '_');
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid Division "${normalized}". Allowed: ${VALID.join(', ')}`,
        'division',
      );
    }
    return new DivisionVO(normalized);
  }

  static dhaka(): DivisionVO { return new DivisionVO(DIVISION.DHAKA); }

  static reconstitute(raw: string): DivisionVO {
    return new DivisionVO(raw);
  }

  get isDhaka(): boolean { return this.value === DIVISION.DHAKA; }
}
