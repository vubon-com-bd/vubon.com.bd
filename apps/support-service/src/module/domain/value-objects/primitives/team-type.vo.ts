import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { SUPPORT_TEAM_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SUPPORT_TEAM_TYPE));

export class TeamTypeVO extends BaseTypeVO<string> {
  static create(value: string): TeamTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid team type: ${value}`);
    }
    return new TeamTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
