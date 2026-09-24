import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TeamIdVO } from '../primitives/team-id.vo';
import { TeamNameVO } from '../primitives/team-name.vo';
import { TeamTypeVO } from '../primitives/team-type.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';

export interface SupportTeamProps {
  readonly id: TeamIdVO;
  readonly name: TeamNameVO;
  readonly type: TeamTypeVO;
  readonly description: string | null;
  readonly isActive: boolean;
  readonly members: ReadonlyArray<AgentIdVO>;
}

export class SupportTeamVO extends BaseVO<SupportTeamProps> {
  private constructor(props: SupportTeamProps) {
    super(Object.freeze({
      ...props,
      members: Object.freeze([...props.members]),
    }));
  }

  static create(props: SupportTeamProps): SupportTeamVO {
    return new SupportTeamVO(props);
  }

  get id(): TeamIdVO { return this.value.id; }
  get name(): TeamNameVO { return this.value.name; }
  get type(): TeamTypeVO { return this.value.type; }
  get description(): string | null { return this.value.description; }
  get isActive(): boolean { return this.value.isActive; }
  get members(): ReadonlyArray<AgentIdVO> { return this.value.members; }
}
