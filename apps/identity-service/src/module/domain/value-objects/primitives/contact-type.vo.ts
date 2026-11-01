/**
 * ContactType Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { USER_CONTACT_TYPE } from '@vubon/shared-constants/user';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID: readonly string[] = Object.values(USER_CONTACT_TYPE);

export class ContactTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ContactTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ContactType cannot be empty', 'contactType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid ContactType "${normalized}". Allowed: ${VALID.join(', ')}`,
        'contactType',
      );
    }
    return new ContactTypeVO(normalized);
  }

  static email(): ContactTypeVO { return new ContactTypeVO(USER_CONTACT_TYPE.EMAIL); }
  static phone(): ContactTypeVO { return new ContactTypeVO(USER_CONTACT_TYPE.PHONE); }
  static whatsapp(): ContactTypeVO { return new ContactTypeVO(USER_CONTACT_TYPE.WHATSAPP); }
  static telegram(): ContactTypeVO { return new ContactTypeVO(USER_CONTACT_TYPE.TELEGRAM); }
  static website(): ContactTypeVO { return new ContactTypeVO(USER_CONTACT_TYPE.WEBSITE); }

  static reconstitute(raw: string): ContactTypeVO {
    return new ContactTypeVO(raw);
  }

  isEmail(): boolean { return this.value === USER_CONTACT_TYPE.EMAIL; }
  isPhone(): boolean {
    return this.value === USER_CONTACT_TYPE.PHONE || this.value === USER_CONTACT_TYPE.WHATSAPP;
  }
  isMessaging(): boolean {
    return [
      USER_CONTACT_TYPE.WHATSAPP,
      USER_CONTACT_TYPE.TELEGRAM,
      USER_CONTACT_TYPE.MESSENGER,
      USER_CONTACT_TYPE.SKYPE,
    ].includes(this.value as never);
  }
}
