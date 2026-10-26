/**
 * TemplateType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_TEMPLATE_TYPE } from '@vubon/shared-constants/platform';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type TemplateTypeValue =
  (typeof NOTIFICATION_TEMPLATE_TYPE)[keyof typeof NOTIFICATION_TEMPLATE_TYPE];

const ALLOWED = Object.values(NOTIFICATION_TEMPLATE_TYPE) as readonly string[];

export class TemplateTypeVO extends BaseTypeVO<TemplateTypeValue> {
  private constructor(value: TemplateTypeValue) {
    super(value);
  }

  static create(raw: string): TemplateTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError(`Invalid template type "${String(raw)}"`, 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new ValidationError(
        `Invalid template type "${normalized}". Allowed: ${ALLOWED.join(', ')}`,
        'type',
      );
    }
    return new TemplateTypeVO(normalized as TemplateTypeValue);
  }

  static reconstitute(raw: string): TemplateTypeVO {
    return new TemplateTypeVO(raw as TemplateTypeValue);
  }

  static email(): TemplateTypeVO { return new TemplateTypeVO(NOTIFICATION_TEMPLATE_TYPE.EMAIL); }
  static sms(): TemplateTypeVO { return new TemplateTypeVO(NOTIFICATION_TEMPLATE_TYPE.SMS); }
  static push(): TemplateTypeVO { return new TemplateTypeVO(NOTIFICATION_TEMPLATE_TYPE.PUSH); }
  static inApp(): TemplateTypeVO { return new TemplateTypeVO(NOTIFICATION_TEMPLATE_TYPE.IN_APP); }
  static webhook(): TemplateTypeVO { return new TemplateTypeVO(NOTIFICATION_TEMPLATE_TYPE.WEBHOOK); }
  static whatsapp(): TemplateTypeVO { return new TemplateTypeVO(NOTIFICATION_TEMPLATE_TYPE.WHATSAPP); }

  isEmail(): boolean { return this.value === NOTIFICATION_TEMPLATE_TYPE.EMAIL; }
  isSms(): boolean { return this.value === NOTIFICATION_TEMPLATE_TYPE.SMS; }
  isPush(): boolean { return this.value === NOTIFICATION_TEMPLATE_TYPE.PUSH; }
  isInApp(): boolean { return this.value === NOTIFICATION_TEMPLATE_TYPE.IN_APP; }
  isWebhook(): boolean { return this.value === NOTIFICATION_TEMPLATE_TYPE.WEBHOOK; }
}
