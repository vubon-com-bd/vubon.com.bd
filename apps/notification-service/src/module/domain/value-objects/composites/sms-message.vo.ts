import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PhoneNumberVO } from '../primitives/phone-number.vo';

export interface SmsMessageProps {
  readonly from: string | null;
  readonly to: PhoneNumberVO;
  readonly body: string;
  readonly encoding: 'gsm7' | 'unicode';
  readonly parts: number;
}

export class SmsMessageVO extends BaseVO<SmsMessageProps> {
  private constructor(props: SmsMessageProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SmsMessageProps): SmsMessageVO {
    return new SmsMessageVO(props);
  }

  get from(): string | null { return this.value.from; }
  get to(): PhoneNumberVO { return this.value.to; }
  get body(): string { return this.value.body; }
  get encoding(): 'gsm7' | 'unicode' { return this.value.encoding; }
  get parts(): number { return this.value.parts; }
}
