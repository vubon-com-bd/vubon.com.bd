/**
 * DescriptionText Value Object — long-form description
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DescriptionTextVO extends BaseVO<string> {
  private static readonly MAX_LENGTH = 5000;

  private constructor(value: string) { super(value); }

  static create(raw: string): DescriptionTextVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Description must be a string', 'description');
    }
    const trimmed = raw.trim();
    if (trimmed.length > DescriptionTextVO.MAX_LENGTH) {
      throw new ValidationError(`Description exceeds max ${DescriptionTextVO.MAX_LENGTH} chars`, 'description');
    }
    return new DescriptionTextVO(trimmed);
  }

  static reconstitute(raw: string): DescriptionTextVO { return new DescriptionTextVO(raw); }
  static empty(): DescriptionTextVO { return new DescriptionTextVO(''); }

  get isEmpty(): boolean { return this.value.length === 0; }
  get length(): number { return this.value.length; }
  static max(): number { return DescriptionTextVO.MAX_LENGTH; }
}
