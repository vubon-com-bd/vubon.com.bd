/**
 * UserType Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { USER_TYPE } from '@vubon/shared-constants/user';
import { InvalidUserTypeError } from '../../errors/user.errors.js';

const VALID_TYPES: readonly string[] = Object.values(USER_TYPE);

export class UserTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidUserTypeError(String(raw), VALID_TYPES);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new InvalidUserTypeError(normalized, VALID_TYPES);
    }
    return new UserTypeVO(normalized);
  }

  static individual(): UserTypeVO { return new UserTypeVO(USER_TYPE.INDIVIDUAL); }
  static business(): UserTypeVO { return new UserTypeVO(USER_TYPE.BUSINESS); }
  static vendor(): UserTypeVO { return new UserTypeVO(USER_TYPE.VENDOR); }
  static admin(): UserTypeVO { return new UserTypeVO(USER_TYPE.ADMIN); }
  static staff(): UserTypeVO { return new UserTypeVO(USER_TYPE.STAFF); }
  static guest(): UserTypeVO { return new UserTypeVO(USER_TYPE.GUEST); }
  static system(): UserTypeVO { return new UserTypeVO(USER_TYPE.SYSTEM); }

  static reconstitute(raw: string): UserTypeVO {
    return new UserTypeVO(raw);
  }

  isIndividual(): boolean { return this.value === USER_TYPE.INDIVIDUAL; }
  isBusiness(): boolean { return this.value === USER_TYPE.BUSINESS; }
  isVendor(): boolean { return this.value === USER_TYPE.VENDOR; }
  isAdmin(): boolean { return this.value === USER_TYPE.ADMIN; }
  isStaff(): boolean { return this.value === USER_TYPE.STAFF; }
  isGuest(): boolean { return this.value === USER_TYPE.GUEST; }
  isSystem(): boolean { return this.value === USER_TYPE.SYSTEM; }

  requiresKyc(): boolean {
    return this.isBusiness() || this.isVendor();
  }
  requiresVerification(): boolean {
    return !this.isSystem();
  }
}
