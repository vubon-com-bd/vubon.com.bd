/**
 * AttachmentTypeVO — Attachment MIME category
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type AttachmentTypeValue =
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'archive'
  | 'other';

const TYPE_SET: ReadonlySet<string> = new Set([
  'image',
  'video',
  'audio',
  'document',
  'archive',
  'other',
]);

const ALLOWED_INLINE: ReadonlySet<string> = new Set<string>([
  'image',
  'audio',
]);

export class AttachmentTypeVO extends BaseTypeVO<AttachmentTypeValue> {
  private constructor(value: AttachmentTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): AttachmentTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid attachment type: ${raw}`,
        'attachmentType',
      );
    }
    return new AttachmentTypeVO(normalized as AttachmentTypeValue);
  }

  isInlineable(): boolean {
    return ALLOWED_INLINE.has(this.value);
  }

  isImage(): boolean {
    return this.value === 'image';
  }
}
