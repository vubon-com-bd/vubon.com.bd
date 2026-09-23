import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { AffiliatePayoutIdVO } from '../value-objects/primitives/affiliate-payout-id.vo';
import { AffiliatePayoutAmountVO } from '../value-objects/primitives/affiliate-payout-amount.vo';
import { AffiliatePayoutStatusVO } from '../value-objects/primitives/affiliate-payout-status.vo';
import { AffiliateIdVO } from '../value-objects/primitives/affiliate-id.vo';
import { AffiliatePayoutProcessedEvent } from '../events/affiliate-payout.events';

export interface AffiliatePayoutEntityProps {
  readonly affiliateId: AffiliateIdVO;
  readonly amount: AffiliatePayoutAmountVO;
  readonly status: AffiliatePayoutStatusVO;
  readonly processedAt: Date | null;
}

export class AffiliatePayoutEntity extends AggregateRoot<AffiliatePayoutIdVO> {
  private readonly _affiliateId: AffiliateIdVO;
  private readonly _amount: AffiliatePayoutAmountVO;
  private readonly _status: AffiliatePayoutStatusVO;
  private readonly _processedAt: Date | null;

  private constructor(
    id: AffiliatePayoutIdVO,
    props: AffiliatePayoutEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._affiliateId = props.affiliateId;
    this._amount = props.amount;
    this._status = props.status;
    this._processedAt = props.processedAt;
  }

  static create(props: AffiliatePayoutEntityProps): AffiliatePayoutEntity {
    const now = new Date().toISOString();
    const id = AffiliatePayoutIdVO.create(crypto.randomUUID());
    return new AffiliatePayoutEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AffiliatePayoutIdVO,
    props: AffiliatePayoutEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AffiliatePayoutEntity {
    return new AffiliatePayoutEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  process(): AffiliatePayoutEntity {
    const now = new Date();
    const updated = new AffiliatePayoutEntity(
      this.id,
      {
        ...this._toProps(),
        status: AffiliatePayoutStatusVO.create('completed'),
        processedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new AffiliatePayoutProcessedEvent(
        this.id.value,
        this._affiliateId.value,
        this._amount.amount,
        this.version + 1,
      ),
    );
    return updated;
  }

  get affiliateId(): AffiliateIdVO { return this._affiliateId; }
  get amount(): AffiliatePayoutAmountVO { return this._amount; }
  get status(): AffiliatePayoutStatusVO { return this._status; }
  get processedAt(): Date | null { return this._processedAt; }

  private _toProps(): AffiliatePayoutEntityProps {
    return {
      affiliateId: this._affiliateId,
      amount: this._amount,
      status: this._status,
      processedAt: this._processedAt,
    };
  }
}
