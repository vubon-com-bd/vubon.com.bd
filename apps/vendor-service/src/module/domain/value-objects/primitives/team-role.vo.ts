import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_ROLE } from '@vubon/shared-constants/business/vendor';
import { InvalidTeamRoleError } from '../../errors/team.errors';

const VALID = new Set<string>(Object.values(VENDOR_ROLE));

export class TeamRoleVO extends BaseTypeVO {
  static create(value: string): TeamRoleVO {
    if (!VALID.has(value)) {
      throw new InvalidTeamRoleError(value);
    }
    return new TeamRoleVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
