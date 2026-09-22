import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class InvoiceNumberVO extends BaseCodeVO {
  static create(value: string): InvoiceNumberVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invoice number too short');
    }
    if (value.length > 64) {
      throw new Error('Invoice number too long');
    }
    return new InvoiceNumberVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
