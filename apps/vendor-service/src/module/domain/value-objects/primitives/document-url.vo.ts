/**
 * DocumentUrl Value Object — secure file storage URL
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 1000;

export class DocumentUrlVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DocumentUrlVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Document URL must be a string', 'fileUrl');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`Document URL must be 1-${MAX_LENGTH} chars`, 'fileUrl');
    }
    if (!/^https?:\/\/[^\s]+$/i.test(trimmed)) {
      throw new ValidationError('Document URL must be a valid http(s) URL', 'fileUrl');
    }
    return new DocumentUrlVO(trimmed);
  }

  static reconstitute(raw: string): DocumentUrlVO {
    return new DocumentUrlVO(raw);
  }

  isHttps(): boolean {
    return this.value.startsWith('https://');
  }

  getExtension(): string {
    const path = this.value.split('?')[0]!;
    const last = path.split('.').pop() ?? '';
    return last.toLowerCase();
  }
}
