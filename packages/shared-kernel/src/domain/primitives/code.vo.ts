import { BaseVO } from '../base/base.vo';

export abstract class BaseCodeVO extends BaseVO<string> {
  protected constructor(value: string) {
    super(value);
  }

  protected static validateNonEmpty(raw: string, field = 'code'): void {
    if (!raw || raw.trim().length === 0) {
      throw new Error(`${field} cannot be empty`);
    }
  }

  get length(): number {
    return this.value.length;
  }
}

export class OtpCodeVO extends BaseCodeVO {
  private static readonly MIN = 4;
  private static readonly MAX = 8;

  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): OtpCodeVO {
    BaseCodeVO.validateNonEmpty(raw, 'OTP');
    if (raw.length < OtpCodeVO.MIN || raw.length > OtpCodeVO.MAX) {
      throw new Error(`OTP must be between ${OtpCodeVO.MIN} and ${OtpCodeVO.MAX} chars`);
    }
    if (!/^\d+$/.test(raw)) {
      throw new Error('OTP must contain digits only');
    }
    return new OtpCodeVO(raw);
  }
}

export class PinCodeVO extends BaseCodeVO {
  private static readonly LENGTH = 6;

  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): PinCodeVO {
    BaseCodeVO.validateNonEmpty(raw, 'PIN');
    if (raw.length !== PinCodeVO.LENGTH) {
      throw new Error(`PIN must be exactly ${PinCodeVO.LENGTH} digits`);
    }
    if (!/^\d+$/.test(raw)) {
      throw new Error('PIN must contain digits only');
    }
    return new PinCodeVO(raw);
  }
}

export const PIN_PATTERN = /^\d{6}$/;
