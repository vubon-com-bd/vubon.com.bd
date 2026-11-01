/**
 * RouteOptimization Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ROUTE_OPTIMIZATION } from '@vubon/shared-constants/logistics';

export type RouteOptimizationValue =
  (typeof ROUTE_OPTIMIZATION)[keyof typeof ROUTE_OPTIMIZATION];

const VALID_OPTIMIZATIONS: readonly string[] = Object.values(ROUTE_OPTIMIZATION);

export class RouteOptimizationVO extends BaseVO<RouteOptimizationValue> {
  private constructor(value: RouteOptimizationValue) {
    super(value);
  }

  static create(raw: string): RouteOptimizationVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('RouteOptimization must be a string', 'optimization');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_OPTIMIZATIONS.includes(normalized)) {
      throw new ValidationError(
        `Invalid RouteOptimization: "${normalized}". Allowed: ${VALID_OPTIMIZATIONS.join(', ')}`,
        'optimization',
      );
    }
    return new RouteOptimizationVO(normalized as RouteOptimizationValue);
  }

  static reconstitute(raw: string): RouteOptimizationVO {
    return new RouteOptimizationVO(raw as RouteOptimizationValue);
  }

  isShortestDistance(): boolean { return this.value === ROUTE_OPTIMIZATION.SHORTEST_DISTANCE; }
  isFastestTime(): boolean { return this.value === ROUTE_OPTIMIZATION.FASTEST_TIME; }
  isLowestCost(): boolean { return this.value === ROUTE_OPTIMIZATION.LOWEST_COST; }
  isBalanced(): boolean { return this.value === ROUTE_OPTIMIZATION.BALANCED; }
  isCapacityAware(): boolean { return this.value === ROUTE_OPTIMIZATION.CAPACITY_AWARE; }
  isTimeWindow(): boolean { return this.value === ROUTE_OPTIMIZATION.TIME_WINDOW; }

  isCostFocused(): boolean {
    return this.isLowestCost() || this.isBalanced();
  }
}
