import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { SUPPORT_AGENT_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SUPPORT_AGENT_STATUS));

export class AgentStatusVO extends BaseStatusVO<string> {
  static create(value: string): AgentStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid agent status: ${value}`);
    }
    return new AgentStatusVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
