import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ROLE } from '@vubon/shared-constants/common';
import { InvalidRoleError } from '../../errors/permission.errors';

const VALID_ROLES = new Set<string>(Object.values(ROLE));

export class UserRoleVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserRoleVO {
    if (!VALID_ROLES.has(raw)) {
      throw new InvalidRoleError(raw);
    }
    return new UserRoleVO(raw);
  }
}
