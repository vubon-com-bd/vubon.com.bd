/**
 * ReturnReasonLabel Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Human-readable label (English + Bangla)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface ReturnReasonLabelValue {
  readonly en: string;
  readonly bn?: string;
}

const MIN = 2;
const MAX = 200;

export class ReturnReasonLabelVO extends BaseVO<ReturnReasonLabelValue> {
  private constructor(value: ReturnReasonLabelValue) {
    super(value);
  }

  static create(raw: ReturnReasonLabelValue): ReturnReasonLabelVO {
    if (!raw || typeof raw.en !== 'string') {
      throw new ValidationError('English label required', 'label.en');
    }
    const en = raw.en.trim();
    if (en.length < MIN || en.length > MAX) {
      throw new ValidationError(`Label (en) must be ${MIN}-${MAX} chars`, 'label.en');
    }
    let bn: string | undefined;
    if (raw.bn !== undefined) {
      bn = raw.bn.trim();
      if (bn.length < MIN || bn.length > MAX) {
        throw new ValidationError(`Label (bn) must be ${MIN}-${MAX} chars`, 'label.bn');
      }
    }
    return new ReturnReasonLabelVO({ en, bn });
  }

  static reconstitute(raw: ReturnReasonLabelValue): ReturnReasonLabelVO {
    return new ReturnReasonLabelVO(raw);
  }

  get en(): string { return this.value.en; }
  get bn(): string | undefined { return this.value.bn; }

  hasBangla(): boolean { return !!this.value.bn; }

  get primary(): string {
    return this.value.bn ?? this.value.en;
  }
}
