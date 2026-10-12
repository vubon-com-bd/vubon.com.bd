/**
 * OtpCode Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidOtpFormatError } from '../../errors/verification.errors.js';

export class OtpCodeVO extends BaseCodeVO {
  private static readonly LENGTH = 6;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OtpCodeVO {
    if (typeof raw !== 'string') {
      throw new InvalidOtpFormatError(OtpCodeVO.LENGTH);
    }
    const trimmed = raw.trim();
    if (trimmed.length !== OtpCodeVO.LENGTH || !/^\d+$/.test(trimmed)) {
      throw new InvalidOtpFormatError(OtpCodeVO.LENGTH);
    }
    return new OtpCodeVO(trimmed);
  }

  static reconstitute(raw: string): OtpCodeVO {
    return new OtpCodeVO(raw);
  }

  get length(): number {
    return this.value.length;
  }
}
