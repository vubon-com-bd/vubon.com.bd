import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SettlementIdVO } from '../value-objects/primitives/settlement-id.vo';
import { SettlementStatusVO } from '../value-objects/primitives/settlement-status.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo';
import {
  SettlementCreatedEvent,
  SettlementCompletedEvent,
} from '../events/vendor-settlement.events';

export interface VendorSettlementEntityProps {
  readonly vendorId: VendorIdVO;
  readonly status: SettlementStatusVO;
  readonly totalAmount: PayoutAmountVO;
  readonly commissionAmount: PayoutAmountVO;
  readonly netAmount: PayoutAmountVO;
  readonly periodStart: Date;
  readonly periodEnd: Date;
  readonly settledAt: Date | null;
}

export class VendorSettlementEntity extends AggregateRoot<SettlementIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _status: SettlementStatusVO;
  private readonly _totalAmount: PayoutAmountVO;
  private readonly _commissionAmount: PayoutAmountVO;
  private readonly _netAmount: PayoutAmountVO;
  private readonly _periodStart: Date;
  private readonly _periodEnd: Date;
  private readonly _settledAt: Date | null;

  private constructor(
    id: SettlementIdVO,
    props: VendorSettlementEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._status = props.status;
    this._totalAmount = props.totalAmount;
    this._commissionAmount = props.commissionAmount;
    this._netAmount = props.netAmount;
    this._periodStart = props.periodStart;
    this._periodEnd = props.periodEnd;
    this._settledAt = props.settledAt;
  }

  static create(props: VendorSettlementEntityProps): VendorSettlementEntity {
    const now = new Date().toISOString();
    const id = SettlementIdVO.create(crypto.randomUUID());
    const entity = new VendorSettlementEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new SettlementCreatedEvent(
        id.value,
        id.value,
        props.vendorId.value,
        props.totalAmount.amount,
        props.totalAmount.currency,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: SettlementIdVO,
    props: VendorSettlementEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorSettlementEntity {
    return new VendorSettlementEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  complete(): VendorSettlementEntity {
    const now = new Date();
    const updated = new VendorSettlementEntity(
      this.id,
      {
        ...this._toProps(),
        status: SettlementStatusVO.create('completed'),
        settledAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new SettlementCompletedEvent(
        this.id.value,
        this.id.value,
        this._vendorId.value,
        this._totalAmount.amount,
        this._totalAmount.currency,
        this.version + 1,
      ),
    );
    return updated;
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get status(): SettlementStatusVO { return this._status; }
  get totalAmount(): PayoutAmountVO { return this._totalAmount; }
  get commissionAmount(): PayoutAmountVO { return this._commissionAmount; }
  get netAmount(): PayoutAmountVO { return this._netAmount; }
  get periodStart(): Date { return this._periodStart; }
  get periodEnd(): Date { return this._periodEnd; }
  get settledAt(): Date | null { return this._settledAt; }

  private _toProps(): VendorSettlementEntityProps {
    return {
      vendorId: this._vendorId,
      status: this._status,
      totalAmount: this._totalAmount,
      commissionAmount: this._commissionAmount,
      netAmount: this._netAmount,
      periodStart: this._periodStart,
      periodEnd: this._periodEnd,
      settledAt: this._settledAt,
    };
  }
}
