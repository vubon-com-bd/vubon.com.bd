import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PayoutIdVO } from '../value-objects/primitives/payout-id.vo';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo';
import { PayoutStatusVO } from '../value-objects/primitives/payout-status.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { BankAccountIdVO } from '../value-objects/primitives/bank-account-id.vo';
import {
  PayoutRequestedEvent,
  PayoutProcessedEvent,
  PayoutFailedEvent,
} from '../events/vendor-payout.events';

export interface VendorPayoutEntityProps {
  readonly vendorId: VendorIdVO;
  readonly bankAccountId: BankAccountIdVO;
  readonly amount: PayoutAmountVO;
  readonly status: PayoutStatusVO;
  readonly requestedAt: Date;
  readonly processedAt: Date | null;
  readonly failureReason: string | null;
}

export class VendorPayoutEntity extends AggregateRoot<PayoutIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _bankAccountId: BankAccountIdVO;
  private readonly _amount: PayoutAmountVO;
  private readonly _status: PayoutStatusVO;
  private readonly _requestedAt: Date;
  private readonly _processedAt: Date | null;
  private readonly _failureReason: string | null;

  private constructor(
    id: PayoutIdVO,
    props: VendorPayoutEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._bankAccountId = props.bankAccountId;
    this._amount = props.amount;
    this._status = props.status;
    this._requestedAt = props.requestedAt;
    this._processedAt = props.processedAt;
    this._failureReason = props.failureReason;
  }

  static create(props: VendorPayoutEntityProps): VendorPayoutEntity {
    const now = new Date().toISOString();
    const id = PayoutIdVO.create(crypto.randomUUID());
    const entity = new VendorPayoutEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new PayoutRequestedEvent(
        id.value,
        id.value,
        props.vendorId.value,
        props.amount.amount,
        props.amount.currency,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: PayoutIdVO,
    props: VendorPayoutEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorPayoutEntity {
    return new VendorPayoutEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  process(): VendorPayoutEntity {
    const now = new Date();
    const updated = new VendorPayoutEntity(
      this.id,
      {
        ...this._toProps(),
        status: PayoutStatusVO.create('processed'),
        processedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new PayoutProcessedEvent(
        this.id.value,
        this.id.value,
        this._vendorId.value,
        this._amount.amount,
        this._amount.currency,
        this.version + 1,
      ),
    );
    return updated;
  }

  fail(reason: string): VendorPayoutEntity {
    const now = new Date();
    const updated = new VendorPayoutEntity(
      this.id,
      {
        ...this._toProps(),
        status: PayoutStatusVO.create('failed'),
        processedAt: now,
        failureReason: reason,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new PayoutFailedEvent(this.id.value, this.id.value, this._vendorId.value, reason, this.version + 1),
    );
    return updated;
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get bankAccountId(): BankAccountIdVO { return this._bankAccountId; }
  get amount(): PayoutAmountVO { return this._amount; }
  get status(): PayoutStatusVO { return this._status; }
  get requestedAt(): Date { return this._requestedAt; }
  get processedAt(): Date | null { return this._processedAt; }
  get failureReason(): string | null { return this._failureReason; }

  private _toProps(): VendorPayoutEntityProps {
    return {
      vendorId: this._vendorId,
      bankAccountId: this._bankAccountId,
      amount: this._amount,
      status: this._status,
      requestedAt: this._requestedAt,
      processedAt: this._processedAt,
      failureReason: this._failureReason,
    };
  }
}
