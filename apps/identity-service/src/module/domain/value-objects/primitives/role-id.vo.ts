/**
 * RoleId Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class RoleIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RoleIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('RoleId cannot be empty', 'roleId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('RoleId must be a valid UUID', 'roleId');
    }
    return new RoleIdVO(trimmed);
  }

  static reconstitute(raw: string): RoleIdVO {
    return new RoleIdVO(raw);
  }
}
