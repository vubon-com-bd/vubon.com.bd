/**
 * SupportAnalyticsVO — Aggregate metrics view
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface SupportAnalyticsVOProps {
  readonly totalTickets: number;
  readonly openTickets: number;
  readonly resolvedTickets: number;
  readonly breachedSlaCount: number;
  readonly averageSatisfaction: number;
  readonly averageResolutionMinutes: number;
}

export class SupportAnalyticsVO extends BaseVO<Readonly<SupportAnalyticsVOProps>> {
  private constructor(props: SupportAnalyticsVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SupportAnalyticsVOProps): SupportAnalyticsVO {
    const numericKeys: readonly (keyof SupportAnalyticsVOProps)[] = [
      'totalTickets',
      'openTickets',
      'resolvedTickets',
      'breachedSlaCount',
      'averageSatisfaction',
      'averageResolutionMinutes',
    ];
    for (const key of numericKeys) {
      const value = props[key];
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new ValidationError(
          `SupportAnalyticsVO.${key} must be a finite number`,
          'supportAnalytics',
        );
      }
    }
    return new SupportAnalyticsVO(props);
  }

  get resolutionRate(): number {
    if (this.value.totalTickets === 0) return 0;
    return (this.value.resolvedTickets / this.value.totalTickets) * 100;
  }

  get slaBreachRate(): number {
    if (this.value.totalTickets === 0) return 0;
    return (this.value.breachedSlaCount / this.value.totalTickets) * 100;
  }

  get isHealthy(): boolean {
    return this.slaBreachRate < 5 && this.value.averageSatisfaction >= 4;
  }

  get backlogRatio(): number {
    if (this.value.totalTickets === 0) return 0;
    return (this.value.openTickets / this.value.totalTickets) * 100;
  }
}
