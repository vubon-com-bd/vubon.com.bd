/**
 * CheckoutVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CheckoutIdVO } from '../primitives/checkout-id.vo.js';
import { CheckoutStatusVO } from '../primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';

export interface CheckoutVOProps {
  readonly id: CheckoutIdVO;
  readonly customerId: CustomerIdVO;
  readonly status: CheckoutStatusVO;
  readonly currentStep: CheckoutStepVO;
  readonly expiresAt: string;
}

export class CheckoutVO extends BaseVO<CheckoutVOProps> {
  private constructor(props: CheckoutVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CheckoutVOProps): CheckoutVO {
    const vo = new CheckoutVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CheckoutVOProps): CheckoutVO {
    return new CheckoutVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (typeof v.expiresAt !== 'string' || v.expiresAt.length === 0) {
      throw new ValidationError('Checkout expiresAt is required', 'expiresAt');
    }
  }

  // ═══ Getters ═══
  get id(): CheckoutIdVO { return this.value.id; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get status(): CheckoutStatusVO { return this.value.status; }
  get currentStep(): CheckoutStepVO { return this.value.currentStep; }
  get expiresAt(): string { return this.value.expiresAt; }

  // ═══ Business methods ═══
  isExpired(now: string = new Date().toISOString()): boolean {
    return new Date(this.expiresAt).getTime() < new Date(now).getTime();
  }

  isCompleted(): boolean { return this.status.isCompleted(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  isAtFinalStep(): boolean { return this.currentStep.isLast(); }
}
