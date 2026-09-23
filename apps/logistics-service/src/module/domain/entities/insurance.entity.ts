import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { InsuranceIdVO } from '../value-objects/primitives/insurance-id.vo';
import { InsuranceStatusVO } from '../value-objects/primitives/insurance-status.vo';
import { InsuranceCoverageVO } from '../value-objects/primitives/insurance-coverage.vo';
import { InsuranceProviderVO } from '../value-objects/primitives/insurance-provider.vo';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';
import {
  InsurancePurchasedEvent,
  InsuranceClaimedEvent,
} from '../events/insurance.events';

export interface InsuranceEntityProps {
  readonly shipmentId: ShipmentIdVO;
  readonly provider: InsuranceProviderVO;
  readonly coverage: InsuranceCoverageVO;
  readonly premium: number;
  readonly currency: string;
  readonly status: InsuranceStatusVO;
  readonly purchasedAt: Date;
  readonly claimedAt: Date | null;
}

export class InsuranceEntity extends AggregateRoot<InsuranceIdVO> {
  private readonly _shipmentId: ShipmentIdVO;
  private readonly _provider: InsuranceProviderVO;
  private readonly _coverage: InsuranceCoverageVO;
  private readonly _premium: number;
  private readonly _currency: string;
  private readonly _status: InsuranceStatusVO;
  private readonly _purchasedAt: Date;
  private readonly _claimedAt: Date | null;

  private constructor(
    id: InsuranceIdVO,
    props: InsuranceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._shipmentId = props.shipmentId;
    this._provider = props.provider;
    this._coverage = props.coverage;
    this._premium = props.premium;
    this._currency = props.currency;
    this._status = props.status;
    this._purchasedAt = props.purchasedAt;
    this._claimedAt = props.claimedAt;
  }

  static create(props: InsuranceEntityProps): InsuranceEntity {
    const now = new Date().toISOString();
    const id = InsuranceIdVO.create(crypto.randomUUID());
    const entity = new InsuranceEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new InsurancePurchasedEvent(
        id.value,
        id.value,
        props.shipmentId.value,
        props.premium,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: InsuranceIdVO,
    props: InsuranceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): InsuranceEntity {
    return new InsuranceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  claim(amount: number): InsuranceEntity {
    const now = new Date().toISOString();
    const updated = new InsuranceEntity(
      this.id,
      { ...this._toProps(), status: InsuranceStatusVO.create('claimed'), claimedAt: new Date() },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new InsuranceClaimedEvent(
        this.id.value,
        this.id.value,
        this._shipmentId.value,
        amount,
        this.version + 1,
      ),
    );
    return updated;
  }

  get shipmentId(): ShipmentIdVO { return this._shipmentId; }
  get provider(): InsuranceProviderVO { return this._provider; }
  get coverage(): InsuranceCoverageVO { return this._coverage; }
  get premium(): number { return this._premium; }
  get currency(): string { return this._currency; }
  get status(): InsuranceStatusVO { return this._status; }
  get purchasedAt(): Date { return this._purchasedAt; }
  get claimedAt(): Date | null { return this._claimedAt; }

  private _toProps(): InsuranceEntityProps {
    return {
      shipmentId: this._shipmentId,
      provider: this._provider,
      coverage: this._coverage,
      premium: this._premium,
      currency: this._currency,
      status: this._status,
      purchasedAt: this._purchasedAt,
      claimedAt: this._claimedAt,
    };
  }
}
