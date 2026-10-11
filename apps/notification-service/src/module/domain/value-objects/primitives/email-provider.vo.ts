/**
 * EmailProvider Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { EMAIL_PROVIDER } from '@vubon/shared-constants/platform/notification';
import { InvalidEmailProviderError } from '../../errors/delivery.errors.js';

type EmailProviderValue = (typeof EMAIL_PROVIDER)[keyof typeof EMAIL_PROVIDER];
const ALLOWED = Object.values(EMAIL_PROVIDER) as readonly string[];

export class EmailProviderVO extends BaseTypeVO<EmailProviderValue> {
  private constructor(value: EmailProviderValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): EmailProviderVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidEmailProviderError(raw, ALLOWED);
    }
    return new EmailProviderVO(raw as EmailProviderValue);
  }

  static reconstitute(raw: string): EmailProviderVO {
    return new EmailProviderVO(raw as EmailProviderValue);
  }

  static smtp(): EmailProviderVO { return new EmailProviderVO(EMAIL_PROVIDER.SMTP); }
  static sendgrid(): EmailProviderVO { return new EmailProviderVO(EMAIL_PROVIDER.SENDGRID); }
  static mailgun(): EmailProviderVO { return new EmailProviderVO(EMAIL_PROVIDER.MAILGUN); }
  static ses(): EmailProviderVO { return new EmailProviderVO(EMAIL_PROVIDER.SES); }
  static postmark(): EmailProviderVO { return new EmailProviderVO(EMAIL_PROVIDER.POSTMARK); }
  static resend(): EmailProviderVO { return new EmailProviderVO(EMAIL_PROVIDER.RESEND); }
  static brevo(): EmailProviderVO { return new EmailProviderVO(EMAIL_PROVIDER.BREVO); }
  static custom(): EmailProviderVO { return new EmailProviderVO(EMAIL_PROVIDER.CUSTOM); }

  supportsBulk(): boolean {
    return (
      this.value === EMAIL_PROVIDER.SENDGRID ||
      this.value === EMAIL_PROVIDER.SES ||
      this.value === EMAIL_PROVIDER.MAILGUN ||
      this.value === EMAIL_PROVIDER.POSTMARK ||
      this.value === EMAIL_PROVIDER.BREVO
    );
  }
}
