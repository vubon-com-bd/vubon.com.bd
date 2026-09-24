import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';
import { TeamNameVO } from '../value-objects/primitives/team-name.vo';
import { TeamTypeVO } from '../value-objects/primitives/team-type.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export interface SupportTeamEntityProps {
  readonly name: TeamNameVO;
  readonly type: TeamTypeVO;
  readonly description: string | null;
  readonly isActive: boolean;
  readonly members: ReadonlyArray<AgentIdVO>;
}

export class SupportTeamEntity extends AggregateRoot<TeamIdVO> {
  private readonly _name: TeamNameVO;
  private readonly _type: TeamTypeVO;
  private readonly _description: string | null;
  private readonly _isActive: boolean;
  private readonly _members: ReadonlyArray<AgentIdVO>;

  private constructor(
    id: TeamIdVO,
    props: SupportTeamEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._description = props.description;
    this._isActive = props.isActive;
    this._members = Object.freeze([...props.members]);
  }

  static create(props: SupportTeamEntityProps): SupportTeamEntity {
    const now = new Date().toISOString();
    const id = TeamIdVO.create(crypto.randomUUID());
    return new SupportTeamEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: TeamIdVO,
    props: SupportTeamEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SupportTeamEntity {
    return new SupportTeamEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  addMember(agentId: AgentIdVO): SupportTeamEntity {
    if (this._members.some((m) => m.value === agentId.value)) {
      return this;
    }
    return new SupportTeamEntity(
      this.id,
      { ...this._toProps(), members: [...this._members, agentId] },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  removeMember(agentId: AgentIdVO): SupportTeamEntity {
    return new SupportTeamEntity(
      this.id,
      {
        ...this._toProps(),
        members: this._members.filter((m) => m.value !== agentId.value),
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get name(): TeamNameVO { return this._name; }
  get type(): TeamTypeVO { return this._type; }
  get description(): string | null { return this._description; }
  get isActive(): boolean { return this._isActive; }
  get members(): ReadonlyArray<AgentIdVO> { return this._members; }

  private _toProps(): SupportTeamEntityProps {
    return {
      name: this._name,
      type: this._type,
      description: this._description,
      isActive: this._isActive,
      members: this._members,
    };
  }
}
