/**
 * Code Value Object (OTP, PIN, Verification Code)
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { REGEX } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export class OtpCodeVO extends BaseVO<string> {
  private static readonly MIN = 4;
  private static readonly MAX = 8;

  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): OtpCodeVO {
    if (typeof raw !== 'string') {
      throw new Error('OTP must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < OtpCodeVO.MIN || trimmed.length > OtpCodeVO.MAX) {
      throw new Error(`OTP length must be ${OtpCodeVO.MIN}-${OtpCodeVO.MAX} digits`);
    }
    if (!REGEX.OTP.test(trimmed)) {
      throw new Error('OTP must contain only digits');
    }
    return new OtpCodeVO(trimmed);
  }
}

export class PinCodeVO extends BaseVO<string> {
  private static readonly LENGTH = 6;

  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): PinCodeVO {
    if (typeof raw !== 'string') {
      throw new Error('PIN must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length !== PinCodeVO.LENGTH) {
      throw new Error(`PIN must be exactly ${PinCodeVO.LENGTH} digits`);
    }
    if (!/^\d+$/.test(trimmed)) {
      throw new Error('PIN must contain only digits');
    }
    return new PinCodeVO(trimmed);
  }
}

/**
 * Reference to satisfy import contract (REGEX.PIN may not exist yet).
 */
export const PIN_PATTERN = /^\d{6}$/;
