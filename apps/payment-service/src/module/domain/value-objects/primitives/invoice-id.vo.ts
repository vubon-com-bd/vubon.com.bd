import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class InvoiceIdVO extends BaseIdVO {
  static create(value: string): InvoiceIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid invoice id');
    }
    return new InvoiceIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
