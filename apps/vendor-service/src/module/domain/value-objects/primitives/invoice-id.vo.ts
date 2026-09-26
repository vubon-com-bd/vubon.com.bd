import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidInvoiceIdError } from '../../errors/vendor.errors';

export class InvoiceIdVO extends BaseIdVO {
  static create(value: string): InvoiceIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidInvoiceIdError(value);
    }
    return new InvoiceIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
