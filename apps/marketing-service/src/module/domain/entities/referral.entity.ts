import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ReferralIdVO } from '../value-objects/primitives/referral-id.vo';
import { ReferralCodeVO } from '../value-objects/primitives/referral-code.vo';
import { ReferralStatusVO } from '../value-objects/primitives/referral-status.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  ReferralCreatedEvent,
  ReferralConvertedEvent,
} from '../events/referral.events';

export interface ReferralEntityProps {
  readonly referrerId: UserIdVO;
  readonly refereeId: UserIdVO | null;
  readonly code: ReferralCodeVO;
  readonly status: ReferralStatusVO;
  readonly convertedAt: Date | null;
}

export class ReferralEntity extends AggregateRoot<ReferralIdVO> {
  private readonly _referrerId: UserIdVO;
  private readonly _refereeId: UserIdVO | null;
  private readonly _code: ReferralCodeVO;
  private readonly _status: ReferralStatusVO;
  private readonly _convertedAt: Date | null;

  private constructor(
    id: ReferralIdVO,
    props: ReferralEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._referrerId = props.referrerId;
    this._refereeId = props.refereeId;
    this._code = props.code;
    this._status = props.status;
    this._convertedAt = props.convertedAt;
  }

  static create(props: ReferralEntityProps): ReferralEntity {
    const now = new Date().toISOString();
    const id = ReferralIdVO.create(crypto.randomUUID());
    const entity = new ReferralEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new ReferralCreatedEvent(id.value, props.referrerId.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: ReferralIdVO,
    props: ReferralEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ReferralEntity {
    return new ReferralEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  convert(refereeId: UserIdVO): ReferralEntity {
    const now = new Date();
    const updated = new ReferralEntity(
      this.id,
      {
        ...this._toProps(),
        refereeId,
        status: ReferralStatusVO.create('converted'),
        convertedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ReferralConvertedEvent(this.id.value, refereeId.value, this.version + 1),
    );
    return updated;
  }

  get referrerId(): UserIdVO { return this._referrerId; }
  get refereeId(): UserIdVO | null { return this._refereeId; }
  get code(): ReferralCodeVO { return this._code; }
  get status(): ReferralStatusVO { return this._status; }
  get convertedAt(): Date | null { return this._convertedAt; }

  private _toProps(): ReferralEntityProps {
    return {
      referrerId: this._referrerId,
      refereeId: this._refereeId,
      code: this._code,
      status: this._status,
      convertedAt: this._convertedAt,
    };
  }
}
