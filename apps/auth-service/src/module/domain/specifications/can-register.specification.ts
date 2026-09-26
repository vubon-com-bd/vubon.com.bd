/**
 * CanRegisterSpecification — Rules for new user registration
 * @module auth-service/domain/specifications
 */
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo';

export interface CanRegisterInput {
  readonly email: UserEmailVO;
  readonly phone: UserPhoneVO;
  readonly emailAlreadyExists: boolean;
  readonly phoneAlreadyExists: boolean;
  readonly registrationOpen: boolean;
  readonly ipBlacklisted: boolean;
}

export class CanRegisterSpecification {
  static isSatisfiedBy(input: CanRegisterInput): boolean {
    if (!input.registrationOpen) return false;
    if (input.emailAlreadyExists) return false;
    if (input.phoneAlreadyExists) return false;
    if (input.ipBlacklisted) return false;
    return true;
  }

  static explain(input: CanRegisterInput): readonly string[] {
    const reasons: string[] = [];
    if (!input.registrationOpen) reasons.push('registration_closed');
    if (input.emailAlreadyExists) reasons.push('email_taken');
    if (input.phoneAlreadyExists) reasons.push('phone_taken');
    if (input.ipBlacklisted) reasons.push('ip_blacklisted');
    return reasons;
  }
}
