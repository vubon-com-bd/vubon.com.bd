import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { AgentStatusVO } from '../value-objects/primitives/agent-status.vo';
import { AgentTypeVO } from '../value-objects/primitives/agent-type.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';

export interface SupportAgentEntityProps {
  readonly userId: UserIdVO;
  readonly teamId: TeamIdVO | null;
  readonly status: AgentStatusVO;
  readonly type: AgentTypeVO;
  readonly skills: ReadonlyArray<string>;
  readonly currentLoad: number;
  readonly maxLoad: number;
}

export class SupportAgentEntity extends AggregateRoot<AgentIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _teamId: TeamIdVO | null;
  private readonly _status: AgentStatusVO;
  private readonly _type: AgentTypeVO;
  private readonly _skills: ReadonlyArray<string>;
  private readonly _currentLoad: number;
  private readonly _maxLoad: number;

  private constructor(
    id: AgentIdVO,
    props: SupportAgentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._teamId = props.teamId;
    this._status = props.status;
    this._type = props.type;
    this._skills = Object.freeze([...props.skills]);
    this._currentLoad = props.currentLoad;
    this._maxLoad = props.maxLoad;
  }

  static create(props: SupportAgentEntityProps): SupportAgentEntity {
    const now = new Date().toISOString();
    const id = AgentIdVO.create(crypto.randomUUID());
    return new SupportAgentEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AgentIdVO,
    props: SupportAgentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SupportAgentEntity {
    return new SupportAgentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeStatus(status: AgentStatusVO): SupportAgentEntity {
    return new SupportAgentEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get teamId(): TeamIdVO | null { return this._teamId; }
  get status(): AgentStatusVO { return this._status; }
  get type(): AgentTypeVO { return this._type; }
  get skills(): ReadonlyArray<string> { return this._skills; }
  get currentLoad(): number { return this._currentLoad; }
  get maxLoad(): number { return this._maxLoad; }

  get isAvailable(): boolean {
    return this._status.value === 'online' && this._currentLoad < this._maxLoad;
  }

  private _toProps(): SupportAgentEntityProps {
    return {
      userId: this._userId,
      teamId: this._teamId,
      status: this._status,
      type: this._type,
      skills: this._skills,
      currentLoad: this._currentLoad,
      maxLoad: this._maxLoad,
    };
  }
}
