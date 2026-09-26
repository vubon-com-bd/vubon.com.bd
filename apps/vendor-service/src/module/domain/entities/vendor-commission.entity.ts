import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CommissionIdVO } from '../value-objects/primitives/commission-id.vo';
import { CommissionRateVO } from '../value-objects/primitives/commission-rate.vo';
import { CommissionTypeVO } from '../value-objects/primitives/commission-type.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo';
import {
  CommissionCalculatedEvent,
  CommissionPaidEvent,
} from '../events/vendor-commission.events';

export interface VendorCommissionEntityProps {
  readonly vendorId: VendorIdVO;
  readonly orderId: OrderIdVO;
  readonly rate: CommissionRateVO;
  readonly type: CommissionTypeVO;
  readonly orderAmount: PayoutAmountVO;
  readonly commissionAmount: PayoutAmountVO;
  readonly isSettled: boolean;
}

export class VendorCommissionEntity extends AggregateRoot<CommissionIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _orderId: OrderIdVO;
  private readonly _rate: CommissionRateVO;
  private readonly _type: CommissionTypeVO;
  private readonly _orderAmount: PayoutAmountVO;
  private readonly _commissionAmount: PayoutAmountVO;
  private readonly _isSettled: boolean;

  private constructor(
    id: CommissionIdVO,
    props: VendorCommissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._orderId = props.orderId;
    this._rate = props.rate;
    this._type = props.type;
    this._orderAmount = props.orderAmount;
    this._commissionAmount = props.commissionAmount;
    this._isSettled = props.isSettled;
  }

  static create(props: VendorCommissionEntityProps): VendorCommissionEntity {
    const now = new Date().toISOString();
    const id = CommissionIdVO.create(crypto.randomUUID());
    const entity = new VendorCommissionEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new CommissionCalculatedEvent(
        id.value,
        id.value,
        props.vendorId.value,
        props.orderId.value,
        props.commissionAmount.amount,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: CommissionIdVO,
    props: VendorCommissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorCommissionEntity {
    return new VendorCommissionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markPaid(): VendorCommissionEntity {
    const now = new Date();
    const updated = new VendorCommissionEntity(
      this.id,
      { ...this._toProps(), isSettled: true },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CommissionPaidEvent(this.id.value, this.id.value, this._vendorId.value, this.version + 1),
    );
    return updated;
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get orderId(): OrderIdVO { return this._orderId; }
  get rate(): CommissionRateVO { return this._rate; }
  get type(): CommissionTypeVO { return this._type; }
  get orderAmount(): PayoutAmountVO { return this._orderAmount; }
  get commissionAmount(): PayoutAmountVO { return this._commissionAmount; }
  get isSettled(): boolean { return this._isSettled; }

  private _toProps(): VendorCommissionEntityProps {
    return {
      vendorId: this._vendorId,
      orderId: this._orderId,
      rate: this._rate,
      type: this._type,
      orderAmount: this._orderAmount,
      commissionAmount: this._commissionAmount,
      isSettled: this._isSettled,
    };
  }
}
