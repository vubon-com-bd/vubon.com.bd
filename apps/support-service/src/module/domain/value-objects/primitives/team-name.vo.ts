import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

export class TeamNameVO extends BaseNameVO {
  static create(value: string): TeamNameVO {
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 100) {
      throw new Error('Team name must be between 2 and 100 characters');
    }
    return new TeamNameVO(trimmed);
  }
  private constructor(value: string) {
    super(value);
  }
}
