/**
 * PerformanceMetricType Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_PERFORMANCE_METRIC } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_PERFORMANCE_METRIC) as readonly string[];

export class PerformanceMetricTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): PerformanceMetricTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid performance metric "${raw}"`, 'metric');
    }
    return new PerformanceMetricTypeVO(raw);
  }

  static reconstitute(raw: string): PerformanceMetricTypeVO { return new PerformanceMetricTypeVO(raw); }

  /** Higher is better for these metrics (default). */
  isHigherBetter(): boolean {
    return ![
      VENDOR_PERFORMANCE_METRIC.ORDER_CANCELLATION_RATE,
      VENDOR_PERFORMANCE_METRIC.RETURN_RATE,
      VENDOR_PERFORMANCE_METRIC.RESPONSE_TIME,
      VENDOR_PERFORMANCE_METRIC.RESOLUTION_TIME,
    ].includes(this.value as never);
  }

  /** Metric expressed as a rate 0-100 or 0-1. */
  isRate(): boolean {
    return [
      VENDOR_PERFORMANCE_METRIC.ORDER_FULFILLMENT_RATE,
      VENDOR_PERFORMANCE_METRIC.ON_TIME_SHIPPING_RATE,
      VENDOR_PERFORMANCE_METRIC.ORDER_CANCELLATION_RATE,
      VENDOR_PERFORMANCE_METRIC.RETURN_RATE,
    ].includes(this.value as never);
  }

  /** Metric expressed in hours. */
  isDuration(): boolean {
    return [
      VENDOR_PERFORMANCE_METRIC.RESPONSE_TIME,
      VENDOR_PERFORMANCE_METRIC.RESOLUTION_TIME,
    ].includes(this.value as never);
  }
}
