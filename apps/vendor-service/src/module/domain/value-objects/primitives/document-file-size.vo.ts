/**
 * DocumentFileSize Value Object — size in bytes, max 10 MB
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_DOCUMENT } from '@vubon/shared-constants/business';

const MAX_BYTES = VENDOR_DOCUMENT.MAX_SIZE_MB * 1024 * 1024;

export class DocumentFileSizeVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(bytes: number): DocumentFileSizeVO {
    if (!Number.isFinite(bytes)) {
      throw new ValidationError('File size must be a finite number', 'fileSize');
    }
    if (!Number.isInteger(bytes)) {
      throw new ValidationError('File size must be an integer (bytes)', 'fileSize');
    }
    if (bytes <= 0) {
      throw new ValidationError('File size must be greater than 0', 'fileSize');
    }
    if (bytes > MAX_BYTES) {
      throw new ValidationError(
        `File size cannot exceed ${VENDOR_DOCUMENT.MAX_SIZE_MB} MB`,
        'fileSize',
      );
    }
    return new DocumentFileSizeVO(bytes);
  }

  static reconstitute(bytes: number): DocumentFileSizeVO {
    return new DocumentFileSizeVO(bytes);
  }

  static fromMB(mb: number): DocumentFileSizeVO {
    if (!Number.isFinite(mb) || mb <= 0) {
      throw new ValidationError('File size (MB) must be positive', 'fileSize');
    }
    return DocumentFileSizeVO.create(Math.round(mb * 1024 * 1024));
  }

  get bytes(): number {
    return this.value;
  }

  toKB(): number {
    return Math.round((this.value / 1024) * 100) / 100;
  }

  toMB(): number {
    return Math.round((this.value / (1024 * 1024)) * 100) / 100;
  }

  isNearLimit(): boolean {
    return this.value >= MAX_BYTES * 0.9;
  }
}
