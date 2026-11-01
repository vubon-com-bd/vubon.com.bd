/**
 * PermissionName Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * Format: "resource:action" (e.g., "auth:login")
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_PERMISSION } from '@vubon/shared-constants/auth';
import { InvalidPermissionNameError } from '../../errors/role-permission.errors.js';

const VALID_PERMISSIONS: readonly string[] = Object.values(AUTH_PERMISSION);

export class PermissionNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PermissionNameVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidPermissionNameError(String(raw), VALID_PERMISSIONS);
    }
    const normalized = raw.trim().toLowerCase();
    if (!/^[a-z_]+:[a-z_]+$|^\*$/.test(normalized)) {
      throw new InvalidPermissionNameError(
        `${normalized} (must match "resource:action" or "*")`,
        VALID_PERMISSIONS,
      );
    }
    return new PermissionNameVO(normalized);
  }

  static reconstitute(raw: string): PermissionNameVO {
    return new PermissionNameVO(raw);
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
