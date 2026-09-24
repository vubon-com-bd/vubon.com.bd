import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class TeamIdVO extends BaseIdVO {
  static create(value: string): TeamIdVO {
    return new TeamIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
