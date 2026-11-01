/**
 * DispatchNumber Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Format: DSP + 12 alphanumeric chars = 15 chars
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'DSP';
const PATTERN = /^DSP[A-Z0-9]{12}$/;

export class DispatchNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DispatchNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DispatchNumber cannot be empty', 'dispatchNumber');
    }
    const normalized = raw.trim().toUpperCase();
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        'DispatchNumber must match DSP[A-Z0-9]{12}',
        'dispatchNumber',
      );
    }
    return new DispatchNumberVO(normalized);
  }

  static reconstitute(raw: string): DispatchNumberVO {
    return new DispatchNumberVO(raw);
  }

  get prefix(): string {
    return PREFIX;
  }
}
