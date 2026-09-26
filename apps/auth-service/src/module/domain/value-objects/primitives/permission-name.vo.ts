/**
 * PermissionNameVO — e.g. "user:create", "user:*", "*"
 * @module auth-service/domain/value-objects/primitives
 *
 * Valid formats:
 *   - Specific:  "user:view"
 *   - Resource wildcard: "user:*"
 *   - Full wildcard:     "*"
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

// Matches:
//   *                (full wildcard)
//   resource:action  (both lowercase, may end with *)
//   resource:*       (wildcard action)
const PATTERN = /^\*$|^[a-z][a-z0-9_]*:(\*|[a-z][a-z0-9_]*)$/;

export class PermissionNameVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): PermissionNameVO {
    if (typeof raw !== 'string') {
      throw new Error('Permission name must be a string');
    }
    const trimmed = raw.trim().toLowerCase();
    if (!PATTERN.test(trimmed)) {
      throw new Error(`Invalid permission name: ${raw}`);
    }
    return new PermissionNameVO(trimmed);
  }

  static wildcard(): PermissionNameVO {
    return new PermissionNameVO('*');
  }

  get resource(): string {
    if (this.value === '*') return '*';
    return this.value.split(':')[0] ?? '';
  }

  get action(): string {
    if (this.value === '*') return '*';
    return this.value.split(':')[1] ?? '';
  }

  isWildcard(): boolean {
    return this.value === '*';
  }

  /**
   * True if this permission covers `required`.
   * Rules:
   *   - "*"          covers everything
   *   - "user:*"     covers any action on user
   *   - "user:view"  covers only exact "user:view"
   */
  matches(required: PermissionNameVO): boolean {
    if (this.isWildcard() || required.isWildcard()) return true;
    if (this.value === required.value) return true;
    if (this.resource === required.resource && this.action === '*') return true;
    return false;
  }
}
