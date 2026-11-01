/**
 * District Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { DISTRICT } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID: readonly string[] = Object.values(DISTRICT);

export class DistrictVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DistrictVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('District cannot be empty', 'district');
    }
    const normalized = raw.trim().toLowerCase().replace(/\s+/g, '_');
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid District "${normalized}"`,
        'district',
      );
    }
    return new DistrictVO(normalized);
  }

  static dhaka(): DistrictVO { return new DistrictVO(DISTRICT.DHAKA); }

  static reconstitute(raw: string): DistrictVO {
    return new DistrictVO(raw);
  }

  get isDhaka(): boolean { return this.value === DISTRICT.DHAKA; }
}
