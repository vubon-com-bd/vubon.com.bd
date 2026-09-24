import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AttachmentIdVO } from '../value-objects/primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../value-objects/primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../value-objects/primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../value-objects/primitives/attachment-size.vo';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';

export interface AttachmentEntityProps {
  readonly messageId: MessageIdVO;
  readonly type: AttachmentTypeVO;
  readonly url: AttachmentUrlVO;
  readonly size: AttachmentSizeVO;
}

export class AttachmentEntity extends BaseEntity<AttachmentIdVO> {
  private readonly _messageId: MessageIdVO;
  private readonly _type: AttachmentTypeVO;
  private readonly _url: AttachmentUrlVO;
  private readonly _size: AttachmentSizeVO;

  private constructor(
    id: AttachmentIdVO,
    props: AttachmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._messageId = props.messageId;
    this._type = props.type;
    this._url = props.url;
    this._size = props.size;
  }

  static create(props: AttachmentEntityProps): AttachmentEntity {
    const now = new Date().toISOString();
    const id = AttachmentIdVO.create(crypto.randomUUID());
    return new AttachmentEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AttachmentIdVO,
    props: AttachmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AttachmentEntity {
    return new AttachmentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get messageId(): MessageIdVO { return this._messageId; }
  get type(): AttachmentTypeVO { return this._type; }
  get url(): AttachmentUrlVO { return this._url; }
  get size(): AttachmentSizeVO { return this._size; }
}
