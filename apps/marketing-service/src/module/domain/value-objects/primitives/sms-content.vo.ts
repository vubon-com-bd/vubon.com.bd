import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const SMS_MAX_LENGTH = 160;

export class SmsContentVO extends BaseCodeVO {
  static create(raw: string): SmsContentVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('SmsContent cannot be empty');
    }
    if (raw.length > SMS_MAX_LENGTH) {
      throw new Error(`SmsContent exceeds ${SMS_MAX_LENGTH} chars`);
    }
    return new SmsContentVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
