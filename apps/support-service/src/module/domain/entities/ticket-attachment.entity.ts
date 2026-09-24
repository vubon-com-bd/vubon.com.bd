import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AttachmentIdVO } from '../value-objects/primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../value-objects/primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../value-objects/primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../value-objects/primitives/attachment-size.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';

export interface TicketAttachmentEntityProps {
  readonly ticketId: TicketIdVO;
  readonly messageId: MessageIdVO | null;
  readonly type: AttachmentTypeVO;
  readonly url: AttachmentUrlVO;
  readonly size: AttachmentSizeVO;
}

export class TicketAttachmentEntity extends BaseEntity<AttachmentIdVO> {
  private readonly _ticketId: TicketIdVO;
  private readonly _messageId: MessageIdVO | null;
  private readonly _type: AttachmentTypeVO;
  private readonly _url: AttachmentUrlVO;
  private readonly _size: AttachmentSizeVO;

  private constructor(
    id: AttachmentIdVO,
    props: TicketAttachmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._ticketId = props.ticketId;
    this._messageId = props.messageId;
    this._type = props.type;
    this._url = props.url;
    this._size = props.size;
  }

  static create(props: TicketAttachmentEntityProps): TicketAttachmentEntity {
    const now = new Date().toISOString();
    const id = AttachmentIdVO.create(crypto.randomUUID());
    return new TicketAttachmentEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AttachmentIdVO,
    props: TicketAttachmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TicketAttachmentEntity {
    return new TicketAttachmentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get ticketId(): TicketIdVO { return this._ticketId; }
  get messageId(): MessageIdVO | null { return this._messageId; }
  get type(): AttachmentTypeVO { return this._type; }
  get url(): AttachmentUrlVO { return this._url; }
  get size(): AttachmentSizeVO { return this._size; }
}
