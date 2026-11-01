/**
 * Dispatch Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DispatchIdVO } from '../primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '../primitives/dispatch-number.vo.js';
import { DispatchStatusVO } from '../primitives/dispatch-status.vo.js';
import { DispatchTypeVO } from '../primitives/dispatch-type.vo.js';

export interface DispatchVOProps {
  readonly id: DispatchIdVO;
  readonly dispatchNumber: DispatchNumberVO;
  readonly status: DispatchStatusVO;
  readonly type: DispatchTypeVO;
  readonly shipmentIds: readonly string[];
  readonly itemCount: number;
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly manifestUrl?: string;
  readonly totalWeight?: number;
  readonly dispatchedAt?: string;
  readonly estimatedArrivalAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly returnedAt?: string;
  readonly cancelledAt?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class DispatchVO extends BaseVO<DispatchVOProps> {
  private constructor(props: DispatchVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: DispatchVOProps): DispatchVO {
    const vo = new DispatchVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DispatchVOProps): DispatchVO {
    return new DispatchVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.shipmentIds.length === 0) {
      throw new ValidationError('Dispatch must have at least one shipment', 'shipmentIds');
    }
    if (v.itemCount !== v.shipmentIds.length) {
      throw new ValidationError(
        `itemCount (${v.itemCount}) does not match shipmentIds length (${v.shipmentIds.length})`,
        'itemCount',
      );
    }
    if (v.totalWeight !== undefined && v.totalWeight < 0) {
      throw new ValidationError('Total weight cannot be negative', 'totalWeight');
    }
  }

  get id(): DispatchIdVO { return this.value.id; }
  get dispatchNumber(): DispatchNumberVO { return this.value.dispatchNumber; }
  get status(): DispatchStatusVO { return this.value.status; }
  get type(): DispatchTypeVO { return this.value.type; }
  get shipmentIds(): readonly string[] { return this.value.shipmentIds; }
  get itemCount(): number { return this.value.itemCount; }
  get courierId(): string | undefined { return this.value.courierId; }
  get vehicleId(): string | undefined { return this.value.vehicleId; }
  get driverId(): string | undefined { return this.value.driverId; }
  get warehouseId(): string | undefined { return this.value.warehouseId; }
  get manifestUrl(): string | undefined { return this.value.manifestUrl; }
  get totalWeight(): number | undefined { return this.value.totalWeight; }
  get dispatchedAt(): string | undefined { return this.value.dispatchedAt; }
  get estimatedArrivalAt(): string | undefined { return this.value.estimatedArrivalAt; }
  get deliveredAt(): string | undefined { return this.value.deliveredAt; }
  get failedAt(): string | undefined { return this.value.failedAt; }
  get returnedAt(): string | undefined { return this.value.returnedAt; }
  get cancelledAt(): string | undefined { return this.value.cancelledAt; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isPending(): boolean { return this.status.isPending(); }
  isDispatched(): boolean { return this.status.isDispatched(); }
  isDelivered(): boolean { return this.status.isDelivered(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isCompleted(): boolean { return this.status.isCompleted(); }

  hasCourier(): boolean { return !!this.courierId; }
  hasVehicle(): boolean { return !!this.vehicleId; }
  hasDriver(): boolean { return !!this.driverId; }
  hasManifest(): boolean { return !!this.manifestUrl; }
}
