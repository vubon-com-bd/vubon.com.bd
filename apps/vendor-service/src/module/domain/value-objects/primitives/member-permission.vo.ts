/**
 * MemberPermission Value Object — granular vendor permission code
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { VENDOR_PERMISSION } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = new Set<string>(Object.values(VENDOR_PERMISSION));
const MAX_LENGTH = 100;

export class MemberPermissionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MemberPermissionVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Permission must be a string', 'permission');
    }
    const trimmed = raw.trim().toLowerCase();
    if (trimmed.length === 0 || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`Permission must be 1-${MAX_LENGTH} chars`, 'permission');
    }
    if (!ALLOWED.has(trimmed)) {
      throw new ValidationError(`Unknown permission "${trimmed}"`, 'permission');
    }
    return new MemberPermissionVO(trimmed);
  }

  static reconstitute(raw: string): MemberPermissionVO {
    return new MemberPermissionVO(raw);
  }

  /** Extract the "resource" part — e.g. "vendor:product:create" → "product". */
  getResource(): string {
    const parts = this.value.split(':');
    return parts.length >= 2 ? parts[1]! : '';
  }

  /** Extract the "action" part — e.g. "vendor:product:create" → "create". */
  getAction(): string {
    const parts = this.value.split(':');
    return parts.length >= 3 ? parts[2]! : '';
  }

  isAdminPermission(): boolean {
    return this.value.startsWith('admin:');
  }

  isVendorPermission(): boolean {
    return this.value.startsWith('vendor:');
  }
}
