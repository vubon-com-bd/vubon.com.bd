/**
 * AbandonedCartVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { AbandonedCartIdVO } from '../primitives/abandoned-cart-id.vo.js';
import { AbandonedCartStatusVO } from '../primitives/abandoned-cart-status.vo.js';
import { CartIdVO } from '../primitives/cart-id.vo.js';

export interface AbandonedCartVOProps {
  readonly id: AbandonedCartIdVO;
  readonly cartId: CartIdVO;
  readonly status: AbandonedCartStatusVO;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly abandonedAt: string;
  readonly remindersSent: number;
  readonly lastReminderAt?: string;
  readonly recoveredAt?: string;
}

export class AbandonedCartVO extends BaseVO<AbandonedCartVOProps> {
  private constructor(props: AbandonedCartVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: AbandonedCartVOProps): AbandonedCartVO {
    const vo = new AbandonedCartVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: AbandonedCartVOProps): AbandonedCartVO {
    return new AbandonedCartVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isInteger(v.itemCount) || v.itemCount < 0) {
      throw new ValidationError('itemCount must be a non-negative integer', 'itemCount');
    }
    if (!Number.isFinite(v.cartValue) || v.cartValue < 0) {
      throw new ValidationError('cartValue must be non-negative', 'cartValue');
    }
    if (!Number.isInteger(v.remindersSent) || v.remindersSent < 0) {
      throw new ValidationError(
        'remindersSent must be a non-negative integer',
        'remindersSent',
      );
    }
  }

  get id(): AbandonedCartIdVO { return this.value.id; }
  get cartId(): CartIdVO { return this.value.cartId; }
  get status(): AbandonedCartStatusVO { return this.value.status; }
  get itemCount(): number { return this.value.itemCount; }
  get cartValue(): number { return this.value.cartValue; }
  get currency(): string { return this.value.currency; }
  get abandonedAt(): string { return this.value.abandonedAt; }
  get remindersSent(): number { return this.value.remindersSent; }
  get lastReminderAt(): string | undefined { return this.value.lastReminderAt; }
  get recoveredAt(): string | undefined { return this.value.recoveredAt; }

  isRecoverable(): boolean { return this.status.isRecoverable(); }
  isFinal(): boolean { return this.status.isFinal(); }
  hasReminders(): boolean { return this.value.remindersSent > 0; }

  canSendMoreReminders(max: number): boolean {
    return this.value.remindersSent < max;
  }
}
