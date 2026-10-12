/**
 * RouteStopVO — a single stop in a route
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { RouteStop } from '@vubon/shared-types/logistics';

export interface RouteStopValue {
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

export class RouteStopVO extends BaseVO<RouteStopValue> {
  private constructor(value: RouteStopValue) { super(value); }

  static create(input: RouteStop): RouteStopVO {
    if (!input.id || input.id.trim().length === 0) {
      throw new ValidationError('RouteStop id required', 'stopId');
    }
    if (!Number.isInteger(input.order) || input.order < 0) {
      throw new ValidationError('Stop order must be non-negative integer', 'order');
    }
    if (!input.address || input.address.trim().length < 3) {
      throw new ValidationError('Stop address too short', 'address');
    }
    if (input.shipmentIds.length === 0) {
      throw new ValidationError('Stop must reference at least one shipment', 'shipmentIds');
    }
    return new RouteStopVO({
      id: input.id.trim(),
      order: input.order,
      location: input.location,
      address: input.address.trim(),
      latitude: input.latitude,
      longitude: input.longitude,
      shipmentIds: input.shipmentIds,
      estimatedArrivalAt: input.estimatedArrivalAt,
      actualArrivalAt: input.actualArrivalAt,
      completed: input.completed,
      notes: input.notes,
    });
  }

  static reconstitute(value: RouteStopValue): RouteStopVO {
    return new RouteStopVO(value);
  }

  get id(): string { return this.value.id; }
  get order(): number { return this.value.order; }
  get location(): string { return this.value.location; }
  get address(): string { return this.value.address; }
  get latitude(): number | undefined { return this.value.latitude; }
  get longitude(): number | undefined { return this.value.longitude; }
  get shipmentIds(): readonly string[] { return this.value.shipmentIds; }
  get estimatedArrivalAt(): string | undefined { return this.value.estimatedArrivalAt; }
  get actualArrivalAt(): string | undefined { return this.value.actualArrivalAt; }
  get completed(): boolean { return this.value.completed; }
  get notes(): string | undefined { return this.value.notes; }

  get shipmentCount(): number { return this.value.shipmentIds.length; }
  hasGeo(): boolean {
    return this.value.latitude !== undefined && this.value.longitude !== undefined;
  }
  isLate(): boolean {
    if (!this.value.estimatedArrivalAt || !this.value.actualArrivalAt) return false;
    return new Date(this.value.actualArrivalAt).getTime() > new Date(this.value.estimatedArrivalAt).getTime();
  }
}
