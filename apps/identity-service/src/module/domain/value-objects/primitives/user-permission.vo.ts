/**
 * UserPermission Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class UserPermissionVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserPermissionVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserPermission cannot be empty', 'permission');
    }
    const normalized = raw.trim().toLowerCase();
    if (!/^[a-z_]+:[a-z_]+$|^\*$/.test(normalized)) {
      throw new ValidationError(
        'UserPermission must match "resource:action" or "*"',
        'permission',
      );
    }
    return new UserPermissionVO(normalized);
  }

  static reconstitute(raw: string): UserPermissionVO {
    return new UserPermissionVO(raw);
  }

  get resource(): string {
    const [r] = this.value.split(':');
    return r ?? '';
  }
  get action(): string {
    const [, a] = this.value.split(':');
    return a ?? '';
  }
  isWildcard(): boolean { return this.value === '*'; }
}
