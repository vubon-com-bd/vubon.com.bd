import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PromotionIdVO } from '../value-objects/primitives/promotion-id.vo';
import { PromotionNameVO } from '../value-objects/primitives/promotion-name.vo';
import { PromotionCodeVO } from '../value-objects/primitives/promotion-code.vo';
import { PromotionStatusVO } from '../value-objects/primitives/promotion-status.vo';
import { PromotionTypeVO } from '../value-objects/primitives/promotion-type.vo';
import { PromotionUsageVO } from '../value-objects/primitives/promotion-usage.vo';
import {
  PromotionCreatedEvent,
  PromotionExpiredEvent,
} from '../events/promotion.events';

export interface PromotionEntityProps {
  readonly name: PromotionNameVO;
  readonly code: PromotionCodeVO;
  readonly status: PromotionStatusVO;
  readonly type: PromotionTypeVO;
  readonly usage: PromotionUsageVO;
  readonly maxUsage: number | null;
  readonly startDate: Date | null;
  readonly endDate: Date | null;
}

export class PromotionEntity extends AggregateRoot<PromotionIdVO> {
  private readonly _name: PromotionNameVO;
  private readonly _code: PromotionCodeVO;
  private readonly _status: PromotionStatusVO;
  private readonly _type: PromotionTypeVO;
  private readonly _usage: PromotionUsageVO;
  private readonly _maxUsage: number | null;
  private readonly _startDate: Date | null;
  private readonly _endDate: Date | null;

  private constructor(
    id: PromotionIdVO,
    props: PromotionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._code = props.code;
    this._status = props.status;
    this._type = props.type;
    this._usage = props.usage;
    this._maxUsage = props.maxUsage;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
  }

  static create(props: PromotionEntityProps): PromotionEntity {
    const now = new Date().toISOString();
    const id = PromotionIdVO.create(crypto.randomUUID());
    const entity = new PromotionEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new PromotionCreatedEvent(id.value, props.code.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: PromotionIdVO,
    props: PromotionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PromotionEntity {
    return new PromotionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  expire(): PromotionEntity {
    const now = new Date();
    const updated = new PromotionEntity(
      this.id,
      { ...this._toProps(), status: PromotionStatusVO.create('expired') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new PromotionExpiredEvent(this.id.value, this.version + 1),
    );
    return updated;
  }

  get name(): PromotionNameVO { return this._name; }
  get code(): PromotionCodeVO { return this._code; }
  get status(): PromotionStatusVO { return this._status; }
  get type(): PromotionTypeVO { return this._type; }
  get usage(): PromotionUsageVO { return this._usage; }
  get maxUsage(): number | null { return this._maxUsage; }
  get startDate(): Date | null { return this._startDate; }
  get endDate(): Date | null { return this._endDate; }

  private _toProps(): PromotionEntityProps {
    return {
      name: this._name,
      code: this._code,
      status: this._status,
      type: this._type,
      usage: this._usage,
      maxUsage: this._maxUsage,
      startDate: this._startDate,
      endDate: this._endDate,
    };
  }
}
