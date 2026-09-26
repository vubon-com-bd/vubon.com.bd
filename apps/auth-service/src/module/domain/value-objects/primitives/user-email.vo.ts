/**
 * UserEmailVO — User email value object
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Valid email format (regex from shared-constants)
 * - Max 254 chars (VALIDATION.EMAIL_MAX_LENGTH)
 * - Normalized (trim + lowercase)
 * - Gmail dot/plus normalization
 */
import { BaseEmailVO } from '@vubon/shared-kernel/domain/primitives/email.vo';
import type { Email } from '@vubon/shared-types/common';
import { InvalidEmailError } from '../../errors/user.errors';

export class UserEmailVO extends BaseEmailVO {
  private constructor(value: Email) {
    super(value);
  }

  static of(raw: string): UserEmailVO {
    if (typeof raw !== 'string') {
      throw new InvalidEmailError(String(raw));
    }
    try {
      BaseEmailVO.validate(raw);
    } catch {
      throw new InvalidEmailError(raw);
    }
    return new UserEmailVO(BaseEmailVO.normalize(raw));
  }

  /**
   * Business rule: compare emails ignoring Gmail dot/plus aliases.
   * john.doe+shop@gmail.com === johndoe@gmail.com
   */
  equalsIgnoringAlias(other: UserEmailVO): boolean {
    return this.canonical() === other.canonical();
  }

  private canonical(): string {
    const [local, domain] = this.value.split('@');
    if (!local || !domain) return this.value;

    const normalizedDomain = domain.toLowerCase();

    // Only Gmail-style providers treat dots/plus as equivalent
    if (normalizedDomain === 'gmail.com' || normalizedDomain === 'googlemail.com') {
      const withoutPlus = local.split('+')[0] ?? local;
      const withoutDots = withoutPlus.replace(/\./g, '');
      return `${withoutDots}@gmail.com`;
    }

    return this.value;
  }
}
