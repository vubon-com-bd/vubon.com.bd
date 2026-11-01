/**
 * SmsMessageVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * SMS channel message — GSM-7 / Unicode aware।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SMS } from '@vubon/shared-constants/platform';

import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';

export interface SmsMessageVOProps {
  readonly to: PhoneNumberVO;
  readonly from?: string;
  readonly message: string;
  readonly type: 'transactional' | 'promotional' | 'otp' | 'alert' | 'notification';
}

export class SmsMessageVO extends BaseVO<SmsMessageVOProps> {
  private constructor(props: SmsMessageVOProps) {
    super(Object.freeze(props));
  }

  static create(props: SmsMessageVOProps): SmsMessageVO {
    const vo = new SmsMessageVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: SmsMessageVOProps): SmsMessageVO {
    return new SmsMessageVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.message || v.message.trim().length === 0) {
      throw new ValidationError('SMS message cannot be empty', 'message');
    }
    const encoded = this.encodeLength(v.message);
    const segments = this.calculateSegments(v.message);
    if (segments > SMS.MAX_MULTIPART) {
      throw new ValidationError(
        `SMS message requires ${segments} segments, max ${SMS.MAX_MULTIPART}`,
        'message',
      );
    }
    if (v.from !== undefined) {
      if (v.from.length > SMS.SENDER_ID_MAX_LENGTH) {
        throw new ValidationError(
          `SMS senderId exceeds ${SMS.SENDER_ID_MAX_LENGTH} chars`,
          'from',
        );
      }
    }
    if (encoded === 'unicode' && !SMS.SUPPORT_UNICODE) {
      throw new ValidationError('Unicode SMS not supported', 'message');
    }
  }

  private encodeLength(message: string): 'gsm' | 'unicode' {
    // GSM-7 basic charset (simplified detection)
    return /^[\x00-\x7F]*$/.test(message) ? 'gsm' : 'unicode';
  }

  private calculateSegments(message: string): number {
    const encoding = this.encodeLength(message);
    const maxLen = encoding === 'gsm' ? SMS.MAX_LENGTH : SMS.MAX_LENGTH_UNICODE;
    return Math.ceil(message.length / maxLen) || 1;
  }

  get to(): PhoneNumberVO { return this.value.to; }
  get from(): string | undefined { return this.value.from; }
  get message(): string { return this.value.message; }
  get type(): SmsMessageVOProps['type'] { return this.value.type; }

  get length(): number { return this.value.message.length; }
  get encoding(): 'gsm' | 'unicode' { return this.encodeLength(this.value.message); }
  get segments(): number { return this.calculateSegments(this.value.message); }
  get isMultipart(): boolean { return this.segments > 1; }
  get isEmpty(): boolean { return this.value.message.trim().length === 0; }

  withMessage(message: string): SmsMessageVO {
    return SmsMessageVO.create({ ...this.value, message });
  }
}
