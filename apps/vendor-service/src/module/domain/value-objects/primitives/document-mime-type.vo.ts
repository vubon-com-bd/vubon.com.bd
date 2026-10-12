/**
 * DocumentMimeType Value Object — whitelist of allowed MIME types
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export class DocumentMimeTypeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DocumentMimeTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('MIME type must be a string', 'mimeType');
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length === 0) {
      throw new ValidationError('MIME type cannot be empty', 'mimeType');
    }
    if (!ALLOWED_MIME.has(normalized)) {
      throw new ValidationError(
        `Unsupported MIME type "${normalized}". Allowed: ${[...ALLOWED_MIME].join(', ')}`,
        'mimeType',
      );
    }
    return new DocumentMimeTypeVO(normalized);
  }

  static reconstitute(raw: string): DocumentMimeTypeVO {
    return new DocumentMimeTypeVO(raw);
  }

  isPdf(): boolean {
    return this.value === 'application/pdf';
  }

  isImage(): boolean {
    return this.value.startsWith('image/');
  }

  isDocument(): boolean {
    return this.value.includes('word') || this.value === 'application/msword';
  }
}
