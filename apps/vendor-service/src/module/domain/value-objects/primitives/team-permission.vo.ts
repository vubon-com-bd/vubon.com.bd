/**
 * TeamPermission Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Represents a single permission string (e.g. "vendor:product:create").
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_PERMISSION } from '@vubon/shared-constants/business';

const VALID_PERMISSIONS = new Set<string>(Object.values(VENDOR_PERMISSION));
const PATTERN = /^[a-z][a-z0-9_]*:[a-z][a-z0-9_]*:[a-z][a-z0-9_]*$/;

export class TeamPermissionVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TeamPermissionVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TeamPermission must be a string', 'permission');
    }
    const normalized = raw.trim().toLowerCase();
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        'TeamPermission must match "namespace:resource:action"',
        'permission',
      );
    }
    if (!VALID_PERMISSIONS.has(normalized)) {
      throw new ValidationError(
        `Unknown TeamPermission: "${normalized}"`,
        'permission',
      );
    }
    return new TeamPermissionVO(normalized);
  }

  static reconstitute(raw: string): TeamPermissionVO {
    return new TeamPermissionVO(raw);
  }

  get namespace(): string {
    return this.value.split(':')[0]!;
  }

  get resource(): string {
    return this.value.split(':')[1]!;
  }

  get action(): string {
    return this.value.split(':')[2]!;
  }

  isAdmin(): boolean {
    return this.namespace === 'admin';
  }

  isView(): boolean {
    return this.action === 'view';
  }

  isWrite(): boolean {
    return ['create', 'update', 'delete', 'manage'].includes(this.action);
  }
}
