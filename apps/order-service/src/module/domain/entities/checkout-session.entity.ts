import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CheckoutIdVO } from '../value-objects/primitives/checkout-id.vo';
import { CheckoutStatusVO } from '../value-objects/primitives/checkout-status.vo';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo';

export interface CheckoutSessionEntityProps {
  readonly customerId: CustomerIdVO;
  readonly status: CheckoutStatusVO;
  readonly expiresAt: Date | null;
}

export class CheckoutSessionEntity extends AggregateRoot<CheckoutIdVO> {
  private readonly _customerId: CustomerIdVO;
  private readonly _status: CheckoutStatusVO;
  private readonly _expiresAt: Date | null;

  private constructor(
    id: CheckoutIdVO,
    props: CheckoutSessionEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._customerId = props.customerId;
    this._status = props.status;
    this._expiresAt = props.expiresAt;
  }

  static create(props: CheckoutSessionEntityProps): CheckoutSessionEntity {
    const now = new Date().toISOString();
    const id = CheckoutIdVO.create(crypto.randomUUID());
    return new CheckoutSessionEntity(id, props, now, now);
  }

  static reconstitute(
    id: CheckoutIdVO,
    props: CheckoutSessionEntityProps,
    createdAt: string,
    updatedAt: string,
  ): CheckoutSessionEntity {
    return new CheckoutSessionEntity(id, props, createdAt, updatedAt);
  }

  get customerId(): CustomerIdVO { return this._customerId; }
  get status(): CheckoutStatusVO { return this._status; }
  get expiresAt(): Date | null { return this._expiresAt; }

  get isExpired(): boolean {
    if (!this._expiresAt) return false;
    return this._expiresAt.getTime() <= Date.now();
  }
}
