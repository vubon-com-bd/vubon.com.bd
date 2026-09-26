/**
 * AttachmentVO — Generic attachment composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { AttachmentIdVO } from '../primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../primitives/attachment-size.vo';

export interface AttachmentVOProps {
  readonly id: AttachmentIdVO;
  readonly type: AttachmentTypeVO;
  readonly url: AttachmentUrlVO;
  readonly size?: AttachmentSizeVO;
}

export class AttachmentVO extends BaseVO<Readonly<AttachmentVOProps>> {
  private constructor(props: AttachmentVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AttachmentVOProps): AttachmentVO {
    if (!props.id || !props.url || !props.type) {
      throw new ValidationError(
        'AttachmentVO requires id, url, type',
        'attachment',
      );
    }
    return new AttachmentVO(props);
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

  get isSecure(): boolean {
    return this.value.url.isSecure();
  }

  get filename(): string {
    return this.value.url.filename;
  }
}
