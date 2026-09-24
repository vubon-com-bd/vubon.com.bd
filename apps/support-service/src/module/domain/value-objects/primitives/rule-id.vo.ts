import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class RuleIdVO extends BaseIdVO {
  static create(value: string): RuleIdVO {
    return new RuleIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
