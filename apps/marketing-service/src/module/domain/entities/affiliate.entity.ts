import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { AffiliateIdVO } from '../value-objects/primitives/affiliate-id.vo';
import { AffiliateCodeVO } from '../value-objects/primitives/affiliate-code.vo';
import { AffiliateStatusVO } from '../value-objects/primitives/affiliate-status.vo';
import { AffiliateCommissionVO } from '../value-objects/primitives/affiliate-commission.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  AffiliateRegisteredEvent,
  AffiliateApprovedEvent,
} from '../events/affiliate.events';

export interface AffiliateEntityProps {
  readonly userId: UserIdVO;
  readonly code: AffiliateCodeVO;
  readonly status: AffiliateStatusVO;
  readonly commission: AffiliateCommissionVO;
  readonly approvedAt: Date | null;
}

export class AffiliateEntity extends AggregateRoot<AffiliateIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _code: AffiliateCodeVO;
  private readonly _status: AffiliateStatusVO;
  private readonly _commission: AffiliateCommissionVO;
  private readonly _approvedAt: Date | null;

  private constructor(
    id: AffiliateIdVO,
    props: AffiliateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._code = props.code;
    this._status = props.status;
    this._commission = props.commission;
    this._approvedAt = props.approvedAt;
  }

  static create(props: AffiliateEntityProps): AffiliateEntity {
    const now = new Date().toISOString();
    const id = AffiliateIdVO.create(crypto.randomUUID());
    const entity = new AffiliateEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new AffiliateRegisteredEvent(id.value, props.userId.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: AffiliateIdVO,
    props: AffiliateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AffiliateEntity {
    return new AffiliateEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  approve(): AffiliateEntity {
    const now = new Date();
    const updated = new AffiliateEntity(
      this.id,
      {
        ...this._toProps(),
        status: AffiliateStatusVO.create('active'),
        approvedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new AffiliateApprovedEvent(this.id.value, this.version + 1),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get code(): AffiliateCodeVO { return this._code; }
  get status(): AffiliateStatusVO { return this._status; }
  get commission(): AffiliateCommissionVO { return this._commission; }
  get approvedAt(): Date | null { return this._approvedAt; }

  private _toProps(): AffiliateEntityProps {
    return {
      userId: this._userId,
      code: this._code,
      status: this._status,
      commission: this._commission,
      approvedAt: this._approvedAt,
    };
  }
}
