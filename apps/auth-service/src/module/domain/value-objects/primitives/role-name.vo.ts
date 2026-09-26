/**
 * RoleNameVO — Role name, constrained to platform constants
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ROLE } from '@vubon/shared-constants/common';

const VALID: ReadonlySet<string> = new Set<string>(Object.values(ROLE));

export class RoleNameVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): RoleNameVO {
    const lower = raw.trim().toLowerCase();
    if (!VALID.has(lower)) {
      throw new Error(`Invalid role name: ${raw}`);
    }
    return new RoleNameVO(lower);
  }

  isSuperAdmin(): boolean {
    return this.value === ROLE.SUPER_ADMIN;
  }
}
