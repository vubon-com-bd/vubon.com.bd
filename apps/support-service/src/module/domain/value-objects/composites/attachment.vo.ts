import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AttachmentIdVO } from '../primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../primitives/attachment-size.vo';
import { MessageIdVO } from '../primitives/message-id.vo';

export interface AttachmentProps {
  readonly id: AttachmentIdVO;
  readonly messageId: MessageIdVO;
  readonly type: AttachmentTypeVO;
  readonly url: AttachmentUrlVO;
  readonly size: AttachmentSizeVO;
}

export class AttachmentVO extends BaseVO<AttachmentProps> {
  private constructor(props: AttachmentProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AttachmentProps): AttachmentVO {
    return new AttachmentVO(props);
  }

  get id(): AttachmentIdVO { return this.value.id; }
  get messageId(): MessageIdVO { return this.value.messageId; }
  get type(): AttachmentTypeVO { return this.value.type; }
  get url(): AttachmentUrlVO { return this.value.url; }
  get size(): AttachmentSizeVO { return this.value.size; }
}
