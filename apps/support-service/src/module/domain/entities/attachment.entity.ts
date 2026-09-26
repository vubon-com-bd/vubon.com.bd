/**
 * AttachmentEntity — Generic attachment for messages
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
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';

export interface CreateAttachmentInput {
  readonly id: AttachmentIdVO;
  readonly messageId: MessageIdVO;
  readonly type: AttachmentTypeVO;
  readonly url: AttachmentUrlVO;
  readonly size?: AttachmentSizeVO;
  readonly filename: string;
  readonly now: string;
}

export interface AttachmentSnapshot {
  readonly id: string;
  readonly messageId: string;
  readonly type: string;
  readonly url: string;
  readonly size?: number;
  readonly filename: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class AttachmentEntity extends BaseEntity<AttachmentIdVO> {
  private readonly _messageId: MessageIdVO;
  private readonly _type: AttachmentTypeVO;
  private readonly _url: AttachmentUrlVO;
  private readonly _size?: AttachmentSizeVO;
  private readonly _filename: string;

  private constructor(
    id: AttachmentIdVO,
    messageId: MessageIdVO,
    type: AttachmentTypeVO,
    url: AttachmentUrlVO,
    filename: string,
    createdAt: string,
    updatedAt: string,
    size?: AttachmentSizeVO,
  ) {
    super(id, createdAt, updatedAt);
    this._messageId = messageId;
    this._type = type;
    this._url = url;
    this._filename = filename;
    this._size = size;
  }

  static create(input: CreateAttachmentInput): AttachmentEntity {
    if (!input.id || !input.messageId || !input.url) {
      throw new ValidationError(
        'Attachment requires id, messageId, url',
        'attachment',
      );
    }
    if (typeof input.filename !== 'string' || input.filename.trim().length === 0) {
      throw new ValidationError('Attachment filename required', 'attachment');
    }
    const now = input.now;
    return new AttachmentEntity(
      input.id,
      input.messageId,
      input.type,
      input.url,
      input.filename.trim(),
      now,
      now,
      input.size,
    );
  }

  static rehydrate(snapshot: AttachmentSnapshot): AttachmentEntity {
    return new AttachmentEntity(
      AttachmentIdVO.create(snapshot.id),
      MessageIdVO.create(snapshot.messageId),
      AttachmentTypeVO.create(snapshot.type),
      AttachmentUrlVO.create(snapshot.url),
      snapshot.filename,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.size !== undefined ? AttachmentSizeVO.create(snapshot.size) : undefined,
    );
  }

  get messageId(): MessageIdVO {
    return this._messageId;
  }

  get type(): AttachmentTypeVO {
    return this._type;
  }

  get url(): AttachmentUrlVO {
    return this._url;
  }

  get size(): AttachmentSizeVO | undefined {
    return this._size;
  }

  get filename(): string {
    return this._filename;
  }

  get hasSize(): boolean {
    return this._size !== undefined;
  }

  get isSecure(): boolean {
    return this._url.isSecure();
  }

  toSnapshot(): AttachmentSnapshot {
    return {
      id: this.id.value,
      messageId: this._messageId.value,
      type: this._type.value,
      url: this._url.value,
      size: this._size?.value,
      filename: this._filename,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
