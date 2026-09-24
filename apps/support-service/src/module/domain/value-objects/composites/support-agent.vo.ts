import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';
import { AgentStatusVO } from '../primitives/agent-status.vo';
import { AgentTypeVO } from '../primitives/agent-type.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { TeamIdVO } from '../primitives/team-id.vo';

export interface SupportAgentProps {
  readonly id: AgentIdVO;
  readonly userId: UserIdVO;
  readonly teamId: TeamIdVO | null;
  readonly status: AgentStatusVO;
  readonly type: AgentTypeVO;
  readonly skills: ReadonlyArray<string>;
  readonly currentLoad: number;
}

export class SupportAgentVO extends BaseVO<SupportAgentProps> {
  private constructor(props: SupportAgentProps) {
    super(Object.freeze({
      ...props,
      skills: Object.freeze([...props.skills]),
    }));
  }

  static create(props: SupportAgentProps): SupportAgentVO {
    return new SupportAgentVO(props);
  }

  get id(): AgentIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get teamId(): TeamIdVO | null { return this.value.teamId; }
  get status(): AgentStatusVO { return this.value.status; }
  get type(): AgentTypeVO { return this.value.type; }
  get skills(): ReadonlyArray<string> { return this.value.skills; }
  get currentLoad(): number { return this.value.currentLoad; }
}
