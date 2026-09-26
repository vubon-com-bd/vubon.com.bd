/**
 * AttachmentSizeVO — File size in bytes
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseQuantityVO
 * Business: max 25 MB per attachment
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_BYTES = 25 * 1024 * 1024;
const MIN_BYTES = 1;

export class AttachmentSizeVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): AttachmentSizeVO {
    BaseQuantityVO.validatePositive(raw, 'AttachmentSize');
    if (!Number.isInteger(raw)) {
      throw new ValidationError(
        'AttachmentSize must be an integer (bytes)',
        'attachmentSize',
      );
    }
    if (raw < MIN_BYTES) {
      throw new ValidationError(
        `AttachmentSize must be at least ${MIN_BYTES} byte`,
        'attachmentSize',
      );
    }
    if (raw > MAX_BYTES) {
      throw new ValidationError(
        `AttachmentSize exceeds maximum of ${MAX_BYTES} bytes`,
        'attachmentSize',
      );
    }
    return new AttachmentSizeVO(raw);
  }

  get kilobytes(): number {
    return this.value / 1024;
  }

  get megabytes(): number {
    return this.value / (1024 * 1024);
  }

  get isLarge(): boolean {
    return this.value > 10 * 1024 * 1024;
  }

  isWithinLimit(limit: number): boolean {
    return this.value <= limit;
  }
}
