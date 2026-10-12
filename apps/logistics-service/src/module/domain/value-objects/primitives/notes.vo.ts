/**
 * Notes Value Object — free-text field with max length
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class NotesVO extends BaseVO<string> {
  private static readonly MAX_LENGTH = 1000;

  private constructor(value: string) { super(value); }

  static create(raw: string): NotesVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Notes must be a string', 'notes');
    }
    const trimmed = raw.trim();
    if (trimmed.length > NotesVO.MAX_LENGTH) {
      throw new ValidationError(`Notes exceeds max ${NotesVO.MAX_LENGTH} chars`, 'notes');
    }
    return new NotesVO(trimmed);
  }

  static reconstitute(raw: string): NotesVO { return new NotesVO(raw); }
  static empty(): NotesVO { return new NotesVO(''); }

  get isEmpty(): boolean { return this.value.length === 0; }
  get length(): number { return this.value.length; }
  static max(): number { return NotesVO.MAX_LENGTH; }
}
