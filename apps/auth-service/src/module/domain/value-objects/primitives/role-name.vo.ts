import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ROLE } from '@vubon/shared-constants/common';
import { InvalidRoleError } from '../../errors/permission.errors';

const VALID = new Set<string>(Object.values(ROLE));

export class RoleNameVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RoleNameVO {
    BaseCodeVO.validateNonEmpty(raw, 'RoleName');
    if (!VALID.has(raw)) {
      throw new InvalidRoleError(raw);
    }
    return new RoleNameVO(raw);
  }
}
