/**
 * VendorStatsEntity — daily/period snapshot of vendor KPIs
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface VendorStatsEntityProps {
  readonly vendorId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly totalProducts: number;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly totalCommission: number;
  readonly totalPayout: number;
  readonly totalRefund: number;
  readonly totalCancelled: number;
  readonly averageOrderValue: number;
  readonly currency: string;
}

export class VendorStatsEntity extends BaseEntity<string> {
  private _totalProducts: number;
  private _totalOrders: number;
  private _totalRevenue: number;
  private _totalCommission: number;
  private _totalPayout: number;
  private _totalRefund: number;
  private _totalCancelled: number;

  private readonly _vendorId: string;
  private readonly _periodStart: string;
  private readonly _periodEnd: string;
  private readonly _averageOrderValue: number;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorStatsEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._periodStart = props.periodStart;
    this._periodEnd = props.periodEnd;
    this._totalProducts = props.totalProducts;
    this._totalOrders = props.totalOrders;
    this._totalRevenue = props.totalRevenue;
    this._totalCommission = props.totalCommission;
    this._totalPayout = props.totalPayout;
    this._totalRefund = props.totalRefund;
    this._totalCancelled = props.totalCancelled;
    this._averageOrderValue = props.averageOrderValue;
    this._currency = props.currency;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (Date.parse(this._periodEnd) < Date.parse(this._periodStart)) {
      throw new ValidationError('periodEnd must be after periodStart', 'periodEnd');
    }
    for (const [field, value] of [
      ['totalProducts', this._totalProducts],
      ['totalOrders', this._totalOrders],
      ['totalRevenue', this._totalRevenue],
      ['totalCommission', this._totalCommission],
      ['totalPayout', this._totalPayout],
      ['totalRefund', this._totalRefund],
      ['totalCancelled', this._totalCancelled],
    ] as const) {
      if (!Number.isFinite(value) || value < 0) {
        throw new ValidationError(`${field} must be non-negative`, field);
      }
    }
    if (!Number.isInteger(this._totalProducts) || !Number.isInteger(this._totalOrders)) {
      throw new ValidationError('Product and order counts must be integers', 'totalProducts');
    }
    if (this._currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get periodStart(): string { return this._periodStart; }
  get periodEnd(): string { return this._periodEnd; }
  get totalProducts(): number { return this._totalProducts; }
  get totalOrders(): number { return this._totalOrders; }
  get totalRevenue(): number { return this._totalRevenue; }
  get totalCommission(): number { return this._totalCommission; }
  get totalPayout(): number { return this._totalPayout; }
  get totalRefund(): number { return this._totalRefund; }
  get totalCancelled(): number { return this._totalCancelled; }
  get averageOrderValue(): number { return this._averageOrderValue; }
  get currency(): string { return this._currency; }

  /** Money retained by platform. */
  getPlatformEarning(): number {
    return Math.round((this._totalRevenue - this._totalPayout) * 100) / 100;
  }

  /** Net revenue after refunds. */
  getNetRevenue(): number {
    return Math.round((this._totalRevenue - this._totalRefund) * 100) / 100;
  }

  /** Cancellation ratio. */
  getCancellationRate(): number {
    if (this._totalOrders === 0) return 0;
    return Math.round((this._totalCancelled / this._totalOrders) * 100) / 100;
  }

  /** Refund ratio. */
  getRefundRate(): number {
    if (this._totalOrders === 0) return 0;
    return Math.round((this._totalRefund / this._totalRevenue) * 100) / 100;
  }

  /** Payout ratio = how much of revenue went to vendor. */
  getPayoutRatio(): number {
    if (this._totalRevenue === 0) return 0;
    return Math.round((this._totalPayout / this._totalRevenue) * 100) / 100;
  }

  isHealthy(): boolean {
    return this.getCancellationRate() < 0.05 && this.getRefundRate() < 0.1;
  }

  isHighVolume(): boolean {
    return this._totalOrders >= 1000;
  }

  /** Record an order against this period's stats. */
  recordOrder(amount: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ValidationError('Order amount must be positive', 'amount');
    }
    this._totalOrders += 1;
    this._totalRevenue = Math.round((this._totalRevenue + amount) * 100) / 100;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  recordRefund(amount: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Refund amount must be non-negative', 'amount');
    }
    this._totalRefund = Math.round((this._totalRefund + amount) * 100) / 100;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  recordCancellation(now: string = new Date().toISOString()): void {
    this._totalCancelled += 1;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  recordPayout(amount: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Payout amount must be non-negative', 'amount');
    }
    this._totalPayout = Math.round((this._totalPayout + amount) * 100) / 100;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vendorId: string;
    periodStart: string;
    periodEnd: string;
    currency: string;
    now: string;
  }): VendorStatsEntity {
    return new VendorStatsEntity(params.id, params.now, params.now, {
      vendorId: params.vendorId,
      periodStart: params.periodStart,
      periodEnd: params.periodEnd,
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalCommission: 0,
      totalPayout: 0,
      totalRefund: 0,
      totalCancelled: 0,
      averageOrderValue: 0,
      currency: params.currency.toUpperCase(),
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorStatsEntityProps;
    deletedAt?: string | null;
  }): VendorStatsEntity {
    return new VendorStatsEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
  }
}
