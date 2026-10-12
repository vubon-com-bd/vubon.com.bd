/**
 * VendorStatsSummaryVO — aggregated vendor KPIs
 * @module vendor-service/src/module/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RatingScoreVO } from '../primitives/rating-score.vo.js';

export interface VendorStatsSummaryVOProps {
  readonly totalProducts: number;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly totalCommission: number;
  readonly totalPayout: number;
  readonly averageRating: RatingScoreVO;
  readonly fulfillmentRate: number;
  readonly currency: string;
}

export class VendorStatsSummaryVO extends BaseVO<VendorStatsSummaryVOProps> {
  private constructor(props: VendorStatsSummaryVOProps) {
    super(props);
  }

  static create(props: VendorStatsSummaryVOProps): VendorStatsSummaryVO {
    const numericFields: Array<[keyof VendorStatsSummaryVOProps, unknown]> = [
      ['totalProducts', props.totalProducts],
      ['totalOrders', props.totalOrders],
      ['totalRevenue', props.totalRevenue],
      ['totalCommission', props.totalCommission],
      ['totalPayout', props.totalPayout],
    ];
    for (const [name, value] of numericFields) {
      if (!Number.isFinite(value as number) || (value as number) < 0) {
        throw new ValidationError(`${name} must be a non-negative number`, name);
      }
    }
    if (!(props.averageRating instanceof RatingScoreVO)) {
      throw new ValidationError('Average rating must be RatingScoreVO', 'averageRating');
    }
    if (!Number.isFinite(props.fulfillmentRate) || props.fulfillmentRate < 0 || props.fulfillmentRate > 1) {
      throw new ValidationError('Fulfillment rate must be between 0 and 1', 'fulfillmentRate');
    }
    if (typeof props.currency !== 'string' || props.currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    return new VendorStatsSummaryVO(props);
  }

  static reconstitute(props: VendorStatsSummaryVOProps): VendorStatsSummaryVO {
    return new VendorStatsSummaryVO(props);
  }

  get totalProducts(): number { return this.value.totalProducts; }
  get totalOrders(): number { return this.value.totalOrders; }
  get totalRevenue(): number { return this.value.totalRevenue; }
  get totalPayout(): number { return this.value.totalPayout; }
  get averageRating(): RatingScoreVO { return this.value.averageRating; }
  get fulfillmentRate(): number { return this.value.fulfillmentRate; }

  /** Money the platform has earned from this vendor. */
  getPlatformEarning(): number {
    return Math.round((this.value.totalRevenue - this.value.totalPayout) * 100) / 100;
  }

  /** Average order value (AOV). */
  getAverageOrderValue(): number {
    if (this.value.totalOrders === 0) return 0;
    return Math.round((this.value.totalRevenue / this.value.totalOrders) * 100) / 100;
  }

  /** Percentage of revenue actually paid out to vendor. */
  getPayoutRatio(): number {
    if (this.value.totalRevenue === 0) return 0;
    return Math.round((this.value.totalPayout / this.value.totalRevenue) * 100) / 100;
  }

  isHighVolume(): boolean {
    return this.value.totalOrders >= 1000;
  }

  isLowFulfillment(): boolean {
    return this.value.fulfillmentRate < 0.8;
  }

  isHealthy(): boolean {
    return this.value.fulfillmentRate >= 0.9 && this.value.averageRating.value >= 4;
  }

  toDisplaySummary(): {
    products: string;
    orders: string;
    revenue: string;
    avgOrder: string;
  } {
    const c = this.value.currency;
    return {
      products: this.value.totalProducts.toLocaleString(),
      orders: this.value.totalOrders.toLocaleString(),
      revenue: `${c} ${this.value.totalRevenue.toLocaleString()}`,
      avgOrder: `${c} ${this.getAverageOrderValue().toLocaleString()}`,
    };
  }
}
