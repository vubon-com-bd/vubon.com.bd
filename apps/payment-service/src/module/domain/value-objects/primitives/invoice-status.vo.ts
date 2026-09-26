import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'draft',
  'open',
  'paid',
  'void',
  'uncollectible',
  'overdue',
  'refunded',
]);

export class InvoiceStatusVO extends BaseStatusVO<string> {
  static create(value: string): InvoiceStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid invoice status: ${value}`);
    }
    return new InvoiceStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
