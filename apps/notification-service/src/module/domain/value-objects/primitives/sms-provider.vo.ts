/**
 * SmsProvider Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { SMS_PROVIDER } from '@vubon/shared-constants/platform/notification';
import { InvalidSmsProviderError } from '../../errors/delivery.errors.js';

type SmsProviderValue = (typeof SMS_PROVIDER)[keyof typeof SMS_PROVIDER];
const ALLOWED = Object.values(SMS_PROVIDER) as readonly string[];

export class SmsProviderVO extends BaseTypeVO<SmsProviderValue> {
  private constructor(value: SmsProviderValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): SmsProviderVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidSmsProviderError(raw, ALLOWED);
    }
    return new SmsProviderVO(raw as SmsProviderValue);
  }

  static reconstitute(raw: string): SmsProviderVO {
    return new SmsProviderVO(raw as SmsProviderValue);
  }

  static twilio(): SmsProviderVO { return new SmsProviderVO(SMS_PROVIDER.TWILIO); }
  static vonage(): SmsProviderVO { return new SmsProviderVO(SMS_PROVIDER.VONAGE); }
  static awsSns(): SmsProviderVO { return new SmsProviderVO(SMS_PROVIDER.AWS_SNS); }
  static msg91(): SmsProviderVO { return new SmsProviderVO(SMS_PROVIDER.MSG91); }
  static sslwireless(): SmsProviderVO { return new SmsProviderVO(SMS_PROVIDER.SSLWIRELESS); }
  static banglalink(): SmsProviderVO { return new SmsProviderVO(SMS_PROVIDER.BANGLALINK); }
  static robi(): SmsProviderVO { return new SmsProviderVO(SMS_PROVIDER.ROBI); }
  static grameenphone(): SmsProviderVO { return new SmsProviderVO(SMS_PROVIDER.GRAMEENPHONE); }
  static custom(): SmsProviderVO { return new SmsProviderVO(SMS_PROVIDER.CUSTOM); }

  isBangladeshi(): boolean {
    return (
      this.value === SMS_PROVIDER.SSLWIRELESS ||
      this.value === SMS_PROVIDER.BANGLALINK ||
      this.value === SMS_PROVIDER.ROBI ||
      this.value === SMS_PROVIDER.GRAMEENPHONE
    );
  }

  isInternational(): boolean {
    return !this.isBangladeshi();
  }
}
