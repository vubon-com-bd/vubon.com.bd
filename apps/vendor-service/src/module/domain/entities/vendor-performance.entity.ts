import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PerformanceIdVO } from '../value-objects/primitives/performance-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { RatingValueVO } from '../value-objects/primitives/rating-value.vo';
import { ScoreValueVO } from '../value-objects/primitives/score-value.vo';
import { PerformanceUpdatedEvent } from '../events/vendor-performance.events';

export interface VendorPerformanceEntityProps {
  readonly vendorId: VendorIdVO;
  readonly overallScore: ScoreValueVO;
  readonly rating: RatingValueVO;
  readonly totalOrders: number;
  readonly completedOrders: number;
  readonly cancelledOrders: number;
  readonly avgResponseTimeHours: number;
  readonly onTimeDeliveryRate: number;
  readonly periodStart: Date;
  readonly periodEnd: Date;
}

export class VendorPerformanceEntity extends AggregateRoot<PerformanceIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _overallScore: ScoreValueVO;
  private readonly _rating: RatingValueVO;
  private readonly _totalOrders: number;
  private readonly _completedOrders: number;
  private readonly _cancelledOrders: number;
  private readonly _avgResponseTimeHours: number;
  private readonly _onTimeDeliveryRate: number;
  private readonly _periodStart: Date;
  private readonly _periodEnd: Date;

  private constructor(
    id: PerformanceIdVO,
    props: VendorPerformanceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._overallScore = props.overallScore;
    this._rating = props.rating;
    this._totalOrders = props.totalOrders;
    this._completedOrders = props.completedOrders;
    this._cancelledOrders = props.cancelledOrders;
    this._avgResponseTimeHours = props.avgResponseTimeHours;
    this._onTimeDeliveryRate = props.onTimeDeliveryRate;
    this._periodStart = props.periodStart;
    this._periodEnd = props.periodEnd;
  }

  static create(props: VendorPerformanceEntityProps): VendorPerformanceEntity {
    const now = new Date().toISOString();
    const id = PerformanceIdVO.create(crypto.randomUUID());
    const entity = new VendorPerformanceEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new PerformanceUpdatedEvent(
        id.value,
        id.value,
        props.vendorId.value,
        props.overallScore.numeric,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: PerformanceIdVO,
    props: VendorPerformanceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorPerformanceEntity {
    return new VendorPerformanceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateScore(score: ScoreValueVO): VendorPerformanceEntity {
    const now = new Date();
    const updated = new VendorPerformanceEntity(
      this.id,
      { ...this._toProps(), overallScore: score },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new PerformanceUpdatedEvent(
        this.id.value,
        this.id.value,
        this._vendorId.value,
        score.numeric,
        this.version + 1,
      ),
    );
    return updated;
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get overallScore(): ScoreValueVO { return this._overallScore; }
  get rating(): RatingValueVO { return this._rating; }
  get totalOrders(): number { return this._totalOrders; }
  get completedOrders(): number { return this._completedOrders; }
  get cancelledOrders(): number { return this._cancelledOrders; }
  get avgResponseTimeHours(): number { return this._avgResponseTimeHours; }
  get onTimeDeliveryRate(): number { return this._onTimeDeliveryRate; }
  get periodStart(): Date { return this._periodStart; }
  get periodEnd(): Date { return this._periodEnd; }

  get completionRate(): number {
    if (this._totalOrders === 0) return 0;
    return this._completedOrders / this._totalOrders;
  }

  private _toProps(): VendorPerformanceEntityProps {
    return {
      vendorId: this._vendorId,
      overallScore: this._overallScore,
      rating: this._rating,
      totalOrders: this._totalOrders,
      completedOrders: this._completedOrders,
      cancelledOrders: this._cancelledOrders,
      avgResponseTimeHours: this._avgResponseTimeHours,
      onTimeDeliveryRate: this._onTimeDeliveryRate,
      periodStart: this._periodStart,
      periodEnd: this._periodEnd,
    };
  }
}
