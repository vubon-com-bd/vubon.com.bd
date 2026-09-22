import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PerformanceIdVO } from '../primitives/performance-id.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { RatingValueVO } from '../primitives/rating-value.vo';
import { ScoreValueVO } from '../primitives/score-value.vo';

export interface VendorPerformanceProps {
  readonly id: PerformanceIdVO;
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

export class VendorPerformanceVO extends BaseVO<VendorPerformanceProps> {
  private constructor(props: VendorPerformanceProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorPerformanceProps): VendorPerformanceVO {
    return new VendorPerformanceVO(props);
  }

  get id(): PerformanceIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get overallScore(): ScoreValueVO { return this.value.overallScore; }
  get rating(): RatingValueVO { return this.value.rating; }
  get totalOrders(): number { return this.value.totalOrders; }
  get completedOrders(): number { return this.value.completedOrders; }
  get cancelledOrders(): number { return this.value.cancelledOrders; }
  get avgResponseTimeHours(): number { return this.value.avgResponseTimeHours; }
  get onTimeDeliveryRate(): number { return this.value.onTimeDeliveryRate; }
  get periodStart(): Date { return this.value.periodStart; }
  get periodEnd(): Date { return this.value.periodEnd; }

  get completionRate(): number {
    if (this.value.totalOrders === 0) return 0;
    return this.value.completedOrders / this.value.totalOrders;
  }
}
