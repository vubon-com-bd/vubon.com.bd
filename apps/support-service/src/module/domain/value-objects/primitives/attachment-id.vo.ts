/**
 * AttachmentIdVO — Attachment identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'att_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;
const PATTERN = /^[a-zA-Z0-9_-]+$/;

export class AttachmentIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AttachmentIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('AttachmentId must be a string', 'attachmentId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `AttachmentId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'attachmentId',
      );
    }
    if (!PATTERN.test(trimmed)) {
      throw new ValidationError(
        'AttachmentId contains invalid characters',
        'attachmentId',
      );
    }
    return new AttachmentIdVO(trimmed);
  }

  static generate(): AttachmentIdVO {
    const suffix = Date.now().toString(36);
    return AttachmentIdVO.create(`${PREFIX}${suffix}`);
  }
}
