import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';
import { ConversationStatusVO } from '../value-objects/primitives/conversation-status.vo';
import { ConversationTypeVO } from '../value-objects/primitives/conversation-type.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export interface ConversationEntityProps {
  readonly userId: UserIdVO;
  readonly agentId: AgentIdVO | null;
  readonly status: ConversationStatusVO;
  readonly type: ConversationTypeVO;
  readonly startedAt: Date;
  readonly endedAt: Date | null;
}

export class ConversationEntity extends AggregateRoot<ConversationIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _agentId: AgentIdVO | null;
  private readonly _status: ConversationStatusVO;
  private readonly _type: ConversationTypeVO;
  private readonly _startedAt: Date;
  private readonly _endedAt: Date | null;

  private constructor(
    id: ConversationIdVO,
    props: ConversationEntityProps,
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

  static create(props: ConversationEntityProps): ConversationEntity {
    const now = new Date().toISOString();
    const id = ConversationIdVO.create(crypto.randomUUID());
    return new ConversationEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ConversationIdVO,
    props: ConversationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ConversationEntity {
    return new ConversationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  end(): ConversationEntity {
    return new ConversationEntity(
      this.id,
      {
        ...this._toProps(),
        status: ConversationStatusVO.create('ended'),
        endedAt: new Date(),
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get agentId(): AgentIdVO | null { return this._agentId; }
  get status(): ConversationStatusVO { return this._status; }
  get type(): ConversationTypeVO { return this._type; }
  get startedAt(): Date { return this._startedAt; }
  get endedAt(): Date | null { return this._endedAt; }

  private _toProps(): ConversationEntityProps {
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
