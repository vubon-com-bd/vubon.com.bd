import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { LiveChatIdVO } from '../value-objects/primitives/live-chat-id.vo';
import { LiveChatStatusVO } from '../value-objects/primitives/live-chat-status.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export interface LiveChatEntityProps {
  readonly userId: UserIdVO;
  readonly agentId: AgentIdVO | null;
  readonly status: LiveChatStatusVO;
  readonly type: string;
  readonly startedAt: Date;
  readonly endedAt: Date | null;
}

export class LiveChatEntity extends AggregateRoot<LiveChatIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _agentId: AgentIdVO | null;
  private readonly _status: LiveChatStatusVO;
  private readonly _type: string;
  private readonly _startedAt: Date;
  private readonly _endedAt: Date | null;

  private constructor(
    id: LiveChatIdVO,
    props: LiveChatEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._agentId = props.agentId;
    this._status = props.status;
    this._type = props.type;
    this._startedAt = props.startedAt;
    this._endedAt = props.endedAt;
  }

  static create(props: LiveChatEntityProps): LiveChatEntity {
    const now = new Date().toISOString();
    const id = LiveChatIdVO.create(crypto.randomUUID());
    return new LiveChatEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: LiveChatIdVO,
    props: LiveChatEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): LiveChatEntity {
    return new LiveChatEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  end(): LiveChatEntity {
    return new LiveChatEntity(
      this.id,
      {
        ...this._toProps(),
        status: LiveChatStatusVO.create('offline'),
        endedAt: new Date(),
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get agentId(): AgentIdVO | null { return this._agentId; }
  get status(): LiveChatStatusVO { return this._status; }
  get type(): string { return this._type; }
  get startedAt(): Date { return this._startedAt; }
  get endedAt(): Date | null { return this._endedAt; }

  private _toProps(): LiveChatEntityProps {
    return {
      userId: this._userId,
      agentId: this._agentId,
      status: this._status,
      type: this._type,
      startedAt: this._startedAt,
      endedAt: this._endedAt,
    };
  }
}
