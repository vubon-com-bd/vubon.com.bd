import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { SUPPORT_AGENT_LEVEL } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SUPPORT_AGENT_LEVEL));

export class AgentTypeVO extends BaseTypeVO<string> {
  static create(value: string): AgentTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid agent level: ${value}`);
    }
    return new AgentTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
