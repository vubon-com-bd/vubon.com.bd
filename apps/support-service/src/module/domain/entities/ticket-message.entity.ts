import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { MessageContentVO } from '../value-objects/primitives/message-content.vo';
import { MessageTypeVO } from '../value-objects/primitives/message-type.vo';
import { MessageStatusVO } from '../value-objects/primitives/message-status.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface TicketMessageEntityProps {
  readonly ticketId: TicketIdVO;
  readonly senderId: UserIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly status: MessageStatusVO;
  readonly isInternal: boolean;
}

export class TicketMessageEntity extends BaseEntity<MessageIdVO> {
  private readonly _ticketId: TicketIdVO;
  private readonly _senderId: UserIdVO;
  private readonly _content: MessageContentVO;
  private readonly _type: MessageTypeVO;
  private readonly _status: MessageStatusVO;
  private readonly _isInternal: boolean;

  private constructor(
    id: MessageIdVO,
    props: TicketMessageEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._ticketId = props.ticketId;
    this._senderId = props.senderId;
    this._content = props.content;
    this._type = props.type;
    this._status = props.status;
    this._isInternal = props.isInternal;
  }

  static create(props: TicketMessageEntityProps): TicketMessageEntity {
    const now = new Date().toISOString();
    const id = MessageIdVO.create(crypto.randomUUID());
    return new TicketMessageEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: MessageIdVO,
    props: TicketMessageEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TicketMessageEntity {
    return new TicketMessageEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markAsRead(): TicketMessageEntity {
    return new TicketMessageEntity(
      this.id,
      { ...this._toProps(), status: MessageStatusVO.create('read') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get ticketId(): TicketIdVO { return this._ticketId; }
  get senderId(): UserIdVO { return this._senderId; }
  get content(): MessageContentVO { return this._content; }
  get type(): MessageTypeVO { return this._type; }
  get status(): MessageStatusVO { return this._status; }
  get isInternal(): boolean { return this._isInternal; }

  private _toProps(): TicketMessageEntityProps {
    return {
      ticketId: this._ticketId,
      senderId: this._senderId,
      content: this._content,
      type: this._type,
      status: this._status,
      isInternal: this._isInternal,
    };
  }
}
