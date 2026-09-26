import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SubscriptionIdVO } from '../value-objects/primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '../value-objects/primitives/subscription-plan.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo';
import {
  SubscriptionCreatedEvent,
  SubscriptionChangedEvent,
} from '../events/vendor-subscription.events';

export interface VendorSubscriptionEntityProps {
  readonly vendorId: VendorIdVO;
  readonly plan: SubscriptionPlanVO;
  readonly price: PayoutAmountVO;
  readonly startedAt: Date;
  readonly expiresAt: Date;
  readonly autoRenew: boolean;
  readonly cancelledAt: Date | null;
}

export class VendorSubscriptionEntity extends AggregateRoot<SubscriptionIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _plan: SubscriptionPlanVO;
  private readonly _price: PayoutAmountVO;
  private readonly _startedAt: Date;
  private readonly _expiresAt: Date;
  private readonly _autoRenew: boolean;
  private readonly _cancelledAt: Date | null;

  private constructor(
    id: SubscriptionIdVO,
    props: VendorSubscriptionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._plan = props.plan;
    this._price = props.price;
    this._startedAt = props.startedAt;
    this._expiresAt = props.expiresAt;
    this._autoRenew = props.autoRenew;
    this._cancelledAt = props.cancelledAt;
  }

  static create(props: VendorSubscriptionEntityProps): VendorSubscriptionEntity {
    const now = new Date().toISOString();
    const id = SubscriptionIdVO.create(crypto.randomUUID());
    const entity = new VendorSubscriptionEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new SubscriptionCreatedEvent(
        id.value,
        id.value,
        props.vendorId.value,
        props.plan.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: SubscriptionIdVO,
    props: VendorSubscriptionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorSubscriptionEntity {
    return new VendorSubscriptionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changePlan(plan: SubscriptionPlanVO, price: PayoutAmountVO): VendorSubscriptionEntity {
    const now = new Date();
    const fromPlan = this._plan.value;
    const updated = new VendorSubscriptionEntity(
      this.id,
      { ...this._toProps(), plan, price },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new SubscriptionChangedEvent(
        this.id.value,
        this.id.value,
        this._vendorId.value,
        fromPlan,
        plan.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  cancel(): VendorSubscriptionEntity {
    const now = new Date();
    return new VendorSubscriptionEntity(
      this.id,
      { ...this._toProps(), cancelledAt: now, autoRenew: false },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get plan(): SubscriptionPlanVO { return this._plan; }
  get price(): PayoutAmountVO { return this._price; }
  get startedAt(): Date { return this._startedAt; }
  get expiresAt(): Date { return this._expiresAt; }
  get autoRenew(): boolean { return this._autoRenew; }
  get cancelledAt(): Date | null { return this._cancelledAt; }

  get isActive(): boolean {
    return this._cancelledAt === null && this._expiresAt.getTime() > Date.now();
  }

  private _toProps(): VendorSubscriptionEntityProps {
    return {
      vendorId: this._vendorId,
      plan: this._plan,
      price: this._price,
      startedAt: this._startedAt,
      expiresAt: this._expiresAt,
      autoRenew: this._autoRenew,
      cancelledAt: this._cancelledAt,
    };
  }
}
