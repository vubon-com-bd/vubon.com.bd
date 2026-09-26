import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { EmailAddressVO } from '../primitives/email-address.vo';

export interface EmailMessageProps {
  readonly from: EmailAddressVO;
  readonly to: readonly EmailAddressVO[];
  readonly cc: readonly EmailAddressVO[];
  readonly bcc: readonly EmailAddressVO[];
  readonly replyTo: EmailAddressVO | null;
  readonly subject: string;
  readonly html: string | null;
  readonly text: string | null;
}

export class EmailMessageVO extends BaseVO<EmailMessageProps> {
  private constructor(props: EmailMessageProps) {
    super(
      Object.freeze({
        ...props,
        to: Object.freeze([...props.to]),
        cc: Object.freeze([...props.cc]),
        bcc: Object.freeze([...props.bcc]),
      }),
    );
  }

  static create(props: EmailMessageProps): EmailMessageVO {
    return new EmailMessageVO(props);
  }

  get from(): EmailAddressVO { return this.value.from; }
  get to(): readonly EmailAddressVO[] { return this.value.to; }
  get cc(): readonly EmailAddressVO[] { return this.value.cc; }
  get bcc(): readonly EmailAddressVO[] { return this.value.bcc; }
  get replyTo(): EmailAddressVO | null { return this.value.replyTo; }
  get subject(): string { return this.value.subject; }
  get html(): string | null { return this.value.html; }
  get text(): string | null { return this.value.text; }
}
