import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidTeamMemberIdError } from '../../errors/team.errors';

export class TeamMemberIdVO extends BaseIdVO {
  static create(value: string): TeamMemberIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidTeamMemberIdError(value);
    }
    return new TeamMemberIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
