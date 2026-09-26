/**
 * SupportTeamVO — Support team composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TeamIdVO } from '../primitives/team-id.vo';
import { TeamNameVO } from '../primitives/team-name.vo';
import { TeamTypeVO } from '../primitives/team-type.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';

export interface SupportTeamVOProps {
  readonly id: TeamIdVO;
  readonly name: TeamNameVO;
  readonly type: TeamTypeVO;
  readonly isActive: boolean;
  readonly memberIds?: readonly AgentIdVO[];
  readonly leadAgentId?: AgentIdVO;
}

export class SupportTeamVO extends BaseVO<Readonly<SupportTeamVOProps>> {
  private constructor(props: SupportTeamVOProps) {
    super(
      Object.freeze({
        ...props,
        memberIds: props.memberIds ? Object.freeze([...props.memberIds]) : Object.freeze([]),
      }),
    );
  }

  static create(props: SupportTeamVOProps): SupportTeamVO {
    if (!props.id || !props.name) {
      throw new ValidationError(
        'SupportTeamVO requires id and name',
        'supportTeam',
      );
    }
    return new SupportTeamVO(props);
  }

  get id(): TeamIdVO {
    return this.value.id;
  }

  get name(): TeamNameVO {
    return this.value.name;
  }

  get isActive(): boolean {
    return this.value.isActive;
  }

  get isSpecialized(): boolean {
    return this.value.type.isSpecialized();
  }

  get memberCount(): number {
    return this.value.memberIds?.length ?? 0;
  }

  get hasLead(): boolean {
    return this.value.leadAgentId !== undefined;
  }

  hasMember(agentId: AgentIdVO): boolean {
    return this.value.memberIds?.some((m) => m.equals(agentId)) ?? false;
  }
}
