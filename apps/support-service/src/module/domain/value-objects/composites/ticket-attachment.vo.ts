/**
 * TicketAttachmentVO — Composite view of a ticket attachment
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { AttachmentIdVO } from '../primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../primitives/attachment-size.vo';

export interface TicketAttachmentVOProps {
  readonly id: AttachmentIdVO;
  readonly type: AttachmentTypeVO;
  readonly url: AttachmentUrlVO;
  readonly size: AttachmentSizeVO;
  readonly filename?: string;
}

export class TicketAttachmentVO extends BaseVO<Readonly<TicketAttachmentVOProps>> {
  private constructor(props: TicketAttachmentVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TicketAttachmentVOProps): TicketAttachmentVO {
    if (!props.id || !props.url || !props.type) {
      throw new ValidationError(
        'TicketAttachmentVO requires id, url, type',
        'ticketAttachment',
      );
    }
    return new TicketAttachmentVO(props);
  }

  get id(): AttachmentIdVO {
    return this.value.id;
  }

  get type(): AttachmentTypeVO {
    return this.value.type;
  }

  get url(): AttachmentUrlVO {
    return this.value.url;
  }

  get size(): AttachmentSizeVO {
    return this.value.size;
  }

  get isImage(): boolean {
    return this.value.type.isImage();
  }

  get isLarge(): boolean {
    return this.value.size.isLarge;
  }

  get isInlineable(): boolean {
    return this.value.type.isInlineable();
  }
}
