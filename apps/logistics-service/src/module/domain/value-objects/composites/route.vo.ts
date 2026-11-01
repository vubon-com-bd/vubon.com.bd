/**
 * Route Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { RouteIdVO } from '../primitives/route-id.vo.js';
import { RouteNameVO } from '../primitives/route-name.vo.js';
import { RouteStatusVO } from '../primitives/route-status.vo.js';
import { RouteTypeVO } from '../primitives/route-type.vo.js';
import { RouteOptimizationVO } from '../primitives/route-optimization.vo.js';

export interface RouteStopData {
  readonly id: string;
  readonly order: number;
  readonly location: string;
  readonly address: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly shipmentIds: readonly string[];
  readonly estimatedArrivalAt?: string;
  readonly actualArrivalAt?: string;
  readonly completed: boolean;
  readonly notes?: string;
}

export interface RouteVOProps {
  readonly id: RouteIdVO;
  readonly name: RouteNameVO;
  readonly code: string;
  readonly type: RouteTypeVO;
  readonly status: RouteStatusVO;
  readonly optimization: RouteOptimizationVO;
  readonly stops: readonly RouteStopData[];
  readonly totalDistanceKm?: number;
  readonly totalDurationMinutes?: number;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly scheduledDate: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly isOptimized: boolean;
  readonly isRecurring: boolean;
  readonly recurrenceRule?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class RouteVO extends BaseVO<RouteVOProps> {
  private constructor(props: RouteVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: RouteVOProps): RouteVO {
    const vo = new RouteVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: RouteVOProps): RouteVO {
    return new RouteVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.code) throw new ValidationError('Code required', 'code');
    if (v.stops.length === 0) {
      throw new ValidationError('Route must have at least one stop', 'stops');
    }
    // Stops must have unique order indices
    const orders = new Set<number>();
    for (const stop of v.stops) {
      if (orders.has(stop.order)) {
        throw new ValidationError(
          `Duplicate stop order: ${stop.order}`,
          'stops',
        );
      }
      orders.add(stop.order);
    }
    if (v.totalDistanceKm !== undefined && v.totalDistanceKm < 0) {
      throw new ValidationError('Total distance cannot be negative', 'totalDistanceKm');
    }
    if (v.totalDurationMinutes !== undefined && v.totalDurationMinutes < 0) {
      throw new ValidationError(
        'Total duration cannot be negative',
        'totalDurationMinutes',
      );
    }
  }

  get id(): RouteIdVO { return this.value.id; }
  get name(): RouteNameVO { return this.value.name; }
  get code(): string { return this.value.code; }
  get type(): RouteTypeVO { return this.value.type; }
  get status(): RouteStatusVO { return this.value.status; }
  get optimization(): RouteOptimizationVO { return this.value.optimization; }
  get stops(): readonly RouteStopData[] { return this.value.stops; }
  get totalDistanceKm(): number | undefined { return this.value.totalDistanceKm; }
  get totalDurationMinutes(): number | undefined { return this.value.totalDurationMinutes; }
  get warehouseId(): string | undefined { return this.value.warehouseId; }
  get vehicleId(): string | undefined { return this.value.vehicleId; }
  get driverId(): string | undefined { return this.value.driverId; }
  get scheduledDate(): string { return this.value.scheduledDate; }
  get startedAt(): string | undefined { return this.value.startedAt; }
  get completedAt(): string | undefined { return this.value.completedAt; }
  get isOptimized(): boolean { return this.value.isOptimized; }
  get isRecurring(): boolean { return this.value.isRecurring; }
  get recurrenceRule(): string | undefined { return this.value.recurrenceRule; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isDraft(): boolean { return this.status.isDraft(); }
  isPlanned(): boolean { return this.status.isPlanned(); }
  isActive(): boolean { return this.status.isActive(); }
  isCompleted(): boolean { return this.status.isCompleted(); }
  isFinal(): boolean { return this.status.isFinal(); }

  get stopCount(): number { return this.value.stops.length; }
  get completedStops(): number {
    return this.value.stops.filter((s) => s.completed).length;
  }
  get progress(): number {
    if (this.stopCount === 0) return 0;
    return (this.completedStops / this.stopCount) * 100;
  }

  get allShipmentIds(): readonly string[] {
    return this.value.stops.flatMap((s) => s.shipmentIds);
  }

  hasDriver(): boolean { return !!this.value.driverId; }
  hasVehicle(): boolean { return !!this.value.vehicleId; }
}
