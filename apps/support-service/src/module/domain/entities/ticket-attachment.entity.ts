/**
 * TicketAttachmentEntity — File attached to a ticket or message
 * @module support-service/domain/entities
 *
 * Registry: extends BaseEntity<AttachmentIdVO>
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { AttachmentIdVO } from '../value-objects/primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../value-objects/primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../value-objects/primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../value-objects/primitives/attachment-size.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CreateTicketAttachmentInput {
  readonly id: AttachmentIdVO;
  readonly ticketId: TicketIdVO;
  readonly type: AttachmentTypeVO;
  readonly url: AttachmentUrlVO;
  readonly size: AttachmentSizeVO;
  readonly filename: string;
  readonly uploadedByUserId?: UserIdVO;
  readonly messageId?: MessageIdVO;
  readonly now: string;
}

export interface TicketAttachmentSnapshot {
  readonly id: string;
  readonly ticketId: string;
  readonly type: string;
  readonly url: string;
  readonly size: number;
  readonly filename: string;
  readonly uploadedByUserId?: string;
  readonly messageId?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class TicketAttachmentEntity extends BaseEntity<AttachmentIdVO> {
  private readonly _ticketId: TicketIdVO;
  private readonly _type: AttachmentTypeVO;
  private readonly _url: AttachmentUrlVO;
  private readonly _size: AttachmentSizeVO;
  private readonly _filename: string;
  private readonly _uploadedByUserId?: UserIdVO;
  private _messageId?: MessageIdVO;

  private constructor(
    id: AttachmentIdVO,
    ticketId: TicketIdVO,
    type: AttachmentTypeVO,
    url: AttachmentUrlVO,
    size: AttachmentSizeVO,
    filename: string,
    createdAt: string,
    updatedAt: string,
    uploadedByUserId?: UserIdVO,
    messageId?: MessageIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._ticketId = ticketId;
    this._type = type;
    this._url = url;
    this._size = size;
    this._filename = filename;
    this._uploadedByUserId = uploadedByUserId;
    this._messageId = messageId;
  }

  static create(input: CreateTicketAttachmentInput): TicketAttachmentEntity {
    if (!input.id || !input.ticketId || !input.url) {
      throw new ValidationError(
        'TicketAttachment requires id, ticketId, url',
        'ticketAttachment',
      );
    }
    if (typeof input.filename !== 'string' || input.filename.trim().length === 0) {
      throw new ValidationError(
        'TicketAttachment filename required',
        'ticketAttachment',
      );
    }
    const now = input.now;
    return new TicketAttachmentEntity(
      input.id,
      input.ticketId,
      input.type,
      input.url,
      input.size,
      input.filename.trim(),
      now,
      now,
      input.uploadedByUserId,
      input.messageId,
    );
  }

  static rehydrate(snapshot: TicketAttachmentSnapshot): TicketAttachmentEntity {
    return new TicketAttachmentEntity(
      AttachmentIdVO.create(snapshot.id),
      TicketIdVO.create(snapshot.ticketId),
      AttachmentTypeVO.create(snapshot.type),
      AttachmentUrlVO.create(snapshot.url),
      AttachmentSizeVO.create(snapshot.size),
      snapshot.filename,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.uploadedByUserId ? UserIdVO.create(snapshot.uploadedByUserId) : undefined,
      snapshot.messageId ? MessageIdVO.create(snapshot.messageId) : undefined,
    );
  }

  get ticketId(): TicketIdVO {
    return this._ticketId;
  }

  get type(): AttachmentTypeVO {
    return this._type;
  }

  get url(): AttachmentUrlVO {
    return this._url;
  }

  get size(): AttachmentSizeVO {
    return this._size;
  }

  get filename(): string {
    return this._filename;
  }

  get messageId(): MessageIdVO | undefined {
    return this._messageId;
  }

  get isLinkedToMessage(): boolean {
    return this._messageId !== undefined;
  }

  get isImage(): boolean {
    return this._type.isImage();
  }

  get isLarge(): boolean {
    return this._size.isLarge;
  }

  attachToMessage(messageId: MessageIdVO): void {
    if (this._messageId) {
      throw new ValidationError(
        'Attachment is already linked to a message',
        'ticketAttachment',
      );
    }
    this._messageId = messageId;
  }

  toSnapshot(): TicketAttachmentSnapshot {
    return {
      id: this.id.value,
      ticketId: this._ticketId.value,
      type: this._type.value,
      url: this._url.value,
      size: this._size.value,
      filename: this._filename,
      uploadedByUserId: this._uploadedByUserId?.value,
      messageId: this._messageId?.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
