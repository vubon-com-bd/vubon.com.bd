import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AttachmentIdVO } from '../primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../primitives/attachment-size.vo';

export interface TicketAttachmentProps {
  readonly id: AttachmentIdVO;
  readonly type: AttachmentTypeVO;
  readonly url: AttachmentUrlVO;
  readonly size: AttachmentSizeVO;
}

export class TicketAttachmentVO extends BaseVO<TicketAttachmentProps> {
  private constructor(props: TicketAttachmentProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TicketAttachmentProps): TicketAttachmentVO {
    return new TicketAttachmentVO(props);
  }

  get id(): AttachmentIdVO { return this.value.id; }
  get type(): AttachmentTypeVO { return this.value.type; }
  get url(): AttachmentUrlVO { return this.value.url; }
  get size(): AttachmentSizeVO { return this.value.size; }
}
