/**
 * ReadAt Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ReadAtVO extends BaseVO<string | undefined> {
  private constructor(value: string | undefined) {
    super(value);
  }

  static create(raw: string | Date | undefined): ReadAtVO {
    if (raw === undefined || raw === null) {
      return new ReadAtVO(undefined);
    }
    const iso = raw instanceof Date ? raw.toISOString() : String(raw);
    const parsed = new Date(iso);
    if (Number.isNaN(parsed.getTime())) {
      throw new ValidationError(`Invalid readAt timestamp: ${iso}`, 'readAt');
    }
    if (parsed.getTime() > Date.now()) {
      throw new ValidationError('readAt cannot be in the future', 'readAt');
    }
    return new ReadAtVO(parsed.toISOString());
  }

  static reconstitute(raw: string | undefined): ReadAtVO {
    return new ReadAtVO(raw);
  }

  get isPresent(): boolean { return this.value !== undefined; }
  get date(): Date | undefined { return this.value ? new Date(this.value) : undefined; }
}
