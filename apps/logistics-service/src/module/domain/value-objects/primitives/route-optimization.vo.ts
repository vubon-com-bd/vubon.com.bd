/**
 * RouteOptimization Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ROUTE_OPTIMIZATION } from '@vubon/shared-constants/logistics';
import { InvalidRouteOptimizationError } from '../../errors/route.errors.js';

const ALLOWED = Object.values(ROUTE_OPTIMIZATION) as readonly string[];

export class RouteOptimizationVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): RouteOptimizationVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidRouteOptimizationError(String(raw));
    }
    return new RouteOptimizationVO(raw);
  }

  static reconstitute(raw: string): RouteOptimizationVO { return new RouteOptimizationVO(raw); }

  static shortestDistance(): RouteOptimizationVO { return new RouteOptimizationVO(ROUTE_OPTIMIZATION.SHORTEST_DISTANCE); }
  static fastestTime(): RouteOptimizationVO { return new RouteOptimizationVO(ROUTE_OPTIMIZATION.FASTEST_TIME); }
  static lowestCost(): RouteOptimizationVO { return new RouteOptimizationVO(ROUTE_OPTIMIZATION.LOWEST_COST); }
  static balanced(): RouteOptimizationVO { return new RouteOptimizationVO(ROUTE_OPTIMIZATION.BALANCED); }
  static capacityAware(): RouteOptimizationVO { return new RouteOptimizationVO(ROUTE_OPTIMIZATION.CAPACITY_AWARE); }
  static timeWindow(): RouteOptimizationVO { return new RouteOptimizationVO(ROUTE_OPTIMIZATION.TIME_WINDOW); }

  isShortestDistance(): boolean { return this.value === ROUTE_OPTIMIZATION.SHORTEST_DISTANCE; }
  isFastestTime(): boolean { return this.value === ROUTE_OPTIMIZATION.FASTEST_TIME; }
  isLowestCost(): boolean { return this.value === ROUTE_OPTIMIZATION.LOWEST_COST; }
  isBalanced(): boolean { return this.value === ROUTE_OPTIMIZATION.BALANCED; }
  isCapacityAware(): boolean { return this.value === ROUTE_OPTIMIZATION.CAPACITY_AWARE; }
  isTimeWindow(): boolean { return this.value === ROUTE_OPTIMIZATION.TIME_WINDOW; }

  /** Optimizes for money (fuel, tolls). */
  isCostFocused(): boolean { return this.isLowestCost(); }

  /** Optimizes for time (SLA-critical). */
  isTimeFocused(): boolean { return this.isFastestTime() || this.isTimeWindow(); }

  /** Needs capacity data to compute. */
  requiresCapacityData(): boolean { return this.isCapacityAware() || this.isBalanced(); }
}
