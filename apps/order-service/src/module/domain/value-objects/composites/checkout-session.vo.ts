/**
 * CheckoutSessionVO
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CheckoutIdVO } from '../primitives/checkout-id.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';

export interface CheckoutSessionVOProps {
  readonly id: string;
  readonly checkoutId: CheckoutIdVO;
  readonly customerId: CustomerIdVO;
  readonly token: string;
  readonly expiresAt: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly stepData?: Readonly<Record<string, unknown>>;
}

export class CheckoutSessionVO extends BaseVO<CheckoutSessionVOProps> {
  private constructor(props: CheckoutSessionVOProps) { super(props); }

  static create(props: CheckoutSessionVOProps): CheckoutSessionVO {
    const vo = new CheckoutSessionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CheckoutSessionVOProps): CheckoutSessionVO {
    return new CheckoutSessionVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.token || v.token.length < 16) {
      throw new ValidationError('Session token must be at least 16 chars', 'token');
    }
    if (!v.expiresAt || !Date.parse(v.expiresAt)) {
      throw new ValidationError('Invalid expiresAt date', 'expiresAt');
    }
  }

  get id(): string { return this.value.id; }
  get checkoutId(): CheckoutIdVO { return this.value.checkoutId; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get token(): string { return this.value.token; }
  get expiresAt(): string { return this.value.expiresAt; }
  get ipAddress(): string | undefined { return this.value.ipAddress; }
  get userAgent(): string | undefined { return this.value.userAgent; }
  get stepData(): Readonly<Record<string, unknown>> | undefined { return this.value.stepData; }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() > Date.parse(this.expiresAt);
  }

  get remainingMs(): number {
    const ms = Date.parse(this.expiresAt) - Date.now();
    return Math.max(0, ms);
  }
}
