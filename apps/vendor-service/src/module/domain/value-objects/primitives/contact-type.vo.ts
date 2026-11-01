/**
 * ContactType Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Vendor contact channel types.
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export const CONTACT_TYPE = {
  EMAIL: 'email',
  PHONE: 'phone',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  WEBSITE: 'website',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  OTHER: 'other',
} as const;

export type ContactTypeValue = (typeof CONTACT_TYPE)[keyof typeof CONTACT_TYPE];

const VALID_TYPES = new Set<string>(Object.values(CONTACT_TYPE));

export class ContactTypeVO extends BaseTypeVO<ContactTypeValue> {
  private constructor(value: ContactTypeValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_TYPES;
  }

  static create(raw: string): ContactTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ContactType must be a string', 'contactType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.has(normalized)) {
      throw new ValidationError(
        `Invalid ContactType: "${normalized}". Allowed: ${[...VALID_TYPES].join(', ')}`,
        'contactType',
      );
    }
    return new ContactTypeVO(normalized as ContactTypeValue);
  }

  static reconstitute(raw: string): ContactTypeVO {
    return new ContactTypeVO(raw as ContactTypeValue);
  }

  // ─── Predicates ───
  isEmail(): boolean { return this.value === 'email'; }
  isPhone(): boolean { return this.value === 'phone'; }
  isWhatsapp(): boolean { return this.value === 'whatsapp'; }
  isTelegram(): boolean { return this.value === 'telegram'; }
  isWebsite(): boolean { return this.value === 'website'; }
  isSocial(): boolean {
    return (
      this.value === 'facebook' ||
      this.value === 'instagram' ||
      this.value === 'linkedin'
    );
  }

  /** Contact type is verifiable (via OTP/callback) */
  isVerifiable(): boolean {
    return this.isEmail() || this.isPhone();
  }

  /** Contact type is public-facing */
  isPublic(): boolean {
    return (
      this.isWhatsapp() ||
      this.isWebsite() ||
      this.isSocial()
    );
  }
}
