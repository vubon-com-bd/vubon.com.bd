/**
 * InvoiceId Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InvoiceIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InvoiceIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('InvoiceId cannot be empty', 'invoiceId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('InvoiceId must be a valid UUID', 'invoiceId');
    }
    return new InvoiceIdVO(trimmed);
  }

  static reconstitute(raw: string): InvoiceIdVO {
    return new InvoiceIdVO(raw);
  }
}
