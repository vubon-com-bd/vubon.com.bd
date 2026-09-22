import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { VENDOR_PERMISSION } from '@vubon/shared-constants/business/vendor';
import { InvalidTeamPermissionError } from '../../errors/team.errors';

const VALID = new Set<string>(Object.values(VENDOR_PERMISSION));

export class TeamPermissionVO extends BaseCodeVO {
  static create(value: string): TeamPermissionVO {
    if (!VALID.has(value)) {
      throw new InvalidTeamPermissionError(value);
    }
    return new TeamPermissionVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
