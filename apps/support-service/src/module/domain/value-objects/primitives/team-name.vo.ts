/**
 * TeamNameVO — Support team display name
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseNameVO
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 3;
const MAX_LENGTH = 100;

export class TeamNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TeamNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TeamName must be a string', 'teamName');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH) {
      throw new ValidationError(
        `TeamName too short (min ${MIN_LENGTH})`,
        'teamName',
      );
    }
    if (normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `TeamName too long (max ${MAX_LENGTH})`,
        'teamName',
      );
    }
    return new TeamNameVO(normalized);
  }

  get slug(): string {
    return this.value
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
