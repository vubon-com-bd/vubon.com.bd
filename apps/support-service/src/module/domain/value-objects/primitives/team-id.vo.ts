/**
 * TeamIdVO — Support team identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'team_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class TeamIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TeamIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TeamId must be a string', 'teamId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `TeamId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'teamId',
      );
    }
    return new TeamIdVO(trimmed);
  }

  static fromName(name: string): TeamIdVO {
    if (!name || name.trim().length === 0) {
      throw new ValidationError('TeamId name required', 'teamId');
    }
    const normalized = name.trim().toLowerCase().replace(/\s+/g, '_');
    return TeamIdVO.create(`${PREFIX}${normalized}`);
  }
}
