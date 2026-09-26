/**
 * UserTypeVO — Distinguishes user kind (customer, vendor, admin, etc.)
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidUserTypeError } from '../../errors/user.errors';

type UserTypeValue =
  | 'customer'
  | 'vendor'
  | 'admin'
  | 'support'
  | 'logistics'
  | 'moderator';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'customer', 'vendor', 'admin', 'support', 'logistics', 'moderator',
]);

export class UserTypeVO extends BaseTypeVO<UserTypeValue> {
  private constructor(value: UserTypeValue) {
    super(value);
  }

  static of(raw: string): UserTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new InvalidUserTypeError(raw);
    }
    return new UserTypeVO(raw as UserTypeValue);
  }

  isAdminLike(): boolean {
    return this.value === 'admin' || this.value === 'moderator';
  }

  isCustomer(): boolean {
    return this.value === 'customer';
  }
}
