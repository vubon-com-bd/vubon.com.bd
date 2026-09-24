import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class AutomationIdVO extends BaseIdVO {
  static create(value: string): AutomationIdVO {
    return new AutomationIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
