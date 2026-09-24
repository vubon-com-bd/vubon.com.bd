import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class AgentIdVO extends BaseIdVO {
  static create(value: string): AgentIdVO {
    return new AgentIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
