/**
 * TeamMemberId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class TeamMemberIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TeamMemberIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('TeamMemberId cannot be empty', 'teamMemberId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('TeamMemberId must be a valid UUID', 'teamMemberId');
    }
    return new TeamMemberIdVO(trimmed);
  }

  static reconstitute(raw: string): TeamMemberIdVO {
    return new TeamMemberIdVO(raw);
  }
}
