/**
 * PermissionResourceVO — Resource segment of a permission
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const PATTERN = /^[a-z][a-z0-9_]*$|^\*$/;

export class PermissionResourceVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): PermissionResourceVO {
    const lower = raw.trim().toLowerCase();
    if (!PATTERN.test(lower)) {
      throw new Error(`Invalid permission resource: ${raw}`);
    }
    return new PermissionResourceVO(lower);
  }

  isWildcard(): boolean {
    return this.value === '*';
  }
}
