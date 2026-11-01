/**
 * PermissionId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PermissionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PermissionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PermissionId cannot be empty', 'permissionId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('PermissionId must be a valid UUID', 'permissionId');
    }
    return new PermissionIdVO(trimmed);
  }

  static reconstitute(raw: string): PermissionIdVO {
    return new PermissionIdVO(raw);
  }
}
