/**
 * InvoiceStatus Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * State machine:
 *   draft → issued → paid
 *   issued → overdue → paid
 *   any → void | refunded
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type InvoiceStatusValue =
  | 'draft'
  | 'issued'
  | 'paid'
  | 'overdue'
  | 'void'
  | 'refunded';

const VALID_STATUSES: readonly string[] = [
  'draft',
  'issued',
  'paid',
  'overdue',
  'void',
  'refunded',
];

const VALID_TRANSITIONS: Readonly<
  Record<InvoiceStatusValue, readonly InvoiceStatusValue[]>
> = {
  draft: ['issued', 'void'],
  issued: ['paid', 'overdue', 'void', 'refunded'],
  paid: ['refunded'],
  overdue: ['paid', 'void', 'refunded'],
  void: [],
  refunded: [],
};

export class InvoiceStatusVO extends BaseStatusVO<InvoiceStatusValue> {
  private constructor(value: InvoiceStatusValue) {
    super(value);
  }

  static create(raw: string): InvoiceStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('InvoiceStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid InvoiceStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new InvoiceStatusVO(normalized as InvoiceStatusValue);
  }

  static draft(): InvoiceStatusVO { return new InvoiceStatusVO('draft'); }
  static issued(): InvoiceStatusVO { return new InvoiceStatusVO('issued'); }
  static paid(): InvoiceStatusVO { return new InvoiceStatusVO('paid'); }
  static overdue(): InvoiceStatusVO { return new InvoiceStatusVO('overdue'); }
  static void(): InvoiceStatusVO { return new InvoiceStatusVO('void'); }
  static refunded(): InvoiceStatusVO { return new InvoiceStatusVO('refunded'); }

  isDraft(): boolean { return this.value === 'draft'; }
  isIssued(): boolean { return this.value === 'issued'; }
  isPaid(): boolean { return this.value === 'paid'; }
  isOverdue(): boolean { return this.value === 'overdue'; }
  isVoid(): boolean { return this.value === 'void'; }
  isRefunded(): boolean { return this.value === 'refunded'; }

  isFinal(): boolean {
    return this.isPaid() || this.isVoid() || this.isRefunded();
  }

  isPayable(): boolean {
    return this.isIssued() || this.isOverdue();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as InvoiceStatusValue);
  }
}
