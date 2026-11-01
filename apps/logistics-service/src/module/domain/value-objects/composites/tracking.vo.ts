/**
 * Tracking Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { TrackingIdVO } from '../primitives/tracking-id.vo.js';
import { TrackingNumberVO } from '../primitives/tracking-number.vo.js';
import { TrackingStatusVO } from '../primitives/tracking-status.vo.js';
import { TrackingSourceVO } from '../primitives/tracking-source.vo.js';

export interface TrackingVOProps {
  readonly id: TrackingIdVO;
  readonly trackingNumber: TrackingNumberVO;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly courierCode?: string;
  readonly status: TrackingStatusVO;
  readonly source: TrackingSourceVO;
  readonly currentEvent?: string;
  readonly currentLocation?: string;
  readonly estimatedDeliveryAt?: string;
  readonly lastUpdatedAt: string;
  readonly expiresAt?: string;
  readonly eventCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class TrackingVO extends BaseVO<TrackingVOProps> {
  private constructor(props: TrackingVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: TrackingVOProps): TrackingVO {
    const vo = new TrackingVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: TrackingVOProps): TrackingVO {
    return new TrackingVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.eventCount < 0) {
      throw new ValidationError('Event count cannot be negative', 'eventCount');
    }
    if (!v.lastUpdatedAt || v.lastUpdatedAt.trim().length === 0) {
      throw new ValidationError('Last updated timestamp required', 'lastUpdatedAt');
    }
  }

  get id(): TrackingIdVO { return this.value.id; }
  get trackingNumber(): TrackingNumberVO { return this.value.trackingNumber; }
  get shipmentId(): string | undefined { return this.value.shipmentId; }
  get orderId(): string | undefined { return this.value.orderId; }
  get courierCode(): string | undefined { return this.value.courierCode; }
  get status(): TrackingStatusVO { return this.value.status; }
  get source(): TrackingSourceVO { return this.value.source; }
  get currentEvent(): string | undefined { return this.value.currentEvent; }
  get currentLocation(): string | undefined { return this.value.currentLocation; }
  get estimatedDeliveryAt(): string | undefined { return this.value.estimatedDeliveryAt; }
  get lastUpdatedAt(): string { return this.value.lastUpdatedAt; }
  get expiresAt(): string | undefined { return this.value.expiresAt; }
  get eventCount(): number { return this.value.eventCount; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.status.isActive(); }
  isCompleted(): boolean { return this.status.isCompleted(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isTrackable(): boolean { return this.status.isTrackable(); }

  hasEvents(): boolean { return this.eventCount > 0; }

  isExpired(ref: Date = new Date()): boolean {
    if (!this.expiresAt) return false;
    return new Date(this.expiresAt) < ref;
  }
}
