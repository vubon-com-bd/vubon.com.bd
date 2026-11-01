/**
 * Driver Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DriverIdVO } from '../primitives/driver-id.vo.js';
import { DriverNameVO } from '../primitives/driver-name.vo.js';
import { DriverStatusVO } from '../primitives/driver-status.vo.js';
import { DriverTypeVO } from '../primitives/driver-type.vo.js';
import { DriverLicenseVO } from '../primitives/driver-license.vo.js';

export interface DriverVOProps {
  readonly id: DriverIdVO;
  readonly userId?: string;
  readonly name: DriverNameVO;
  readonly phone: string;
  readonly email?: string;
  readonly status: DriverStatusVO;
  readonly type: DriverTypeVO;
  readonly license: DriverLicenseVO;
  readonly dateOfBirth?: string;
  readonly address?: string;
  readonly vehicleId?: string;
  readonly warehouseId?: string;
  readonly rating?: number;
  readonly totalDeliveries: number;
  readonly totalDistanceKm?: number;
  readonly cashLimit?: number;
  readonly cashInHand?: number;
  readonly isAvailable: boolean;
  readonly lastActiveAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class DriverVO extends BaseVO<DriverVOProps> {
  private constructor(props: DriverVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: DriverVOProps): DriverVO {
    const vo = new DriverVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DriverVOProps): DriverVO {
    return new DriverVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.phone || v.phone.trim().length < 10) {
      throw new ValidationError('Valid phone required', 'phone');
    }
    if (v.rating !== undefined && (v.rating < 0 || v.rating > 5)) {
      throw new ValidationError('Rating must be 0-5', 'rating');
    }
    if (v.totalDeliveries < 0) {
      throw new ValidationError('Total deliveries cannot be negative', 'totalDeliveries');
    }
    if (v.cashInHand !== undefined && v.cashInHand < 0) {
      throw new ValidationError('Cash in hand cannot be negative', 'cashInHand');
    }
    if (v.cashLimit !== undefined && v.cashLimit < 0) {
      throw new ValidationError('Cash limit cannot be negative', 'cashLimit');
    }
  }

  get id(): DriverIdVO { return this.value.id; }
  get userId(): string | undefined { return this.value.userId; }
  get name(): DriverNameVO { return this.value.name; }
  get phone(): string { return this.value.phone; }
  get email(): string | undefined { return this.value.email; }
  get status(): DriverStatusVO { return this.value.status; }
  get type(): DriverTypeVO { return this.value.type; }
  get license(): DriverLicenseVO { return this.value.license; }
  get dateOfBirth(): string | undefined { return this.value.dateOfBirth; }
  get address(): string | undefined { return this.value.address; }
  get vehicleId(): string | undefined { return this.value.vehicleId; }
  get warehouseId(): string | undefined { return this.value.warehouseId; }
  get rating(): number | undefined { return this.value.rating; }
  get totalDeliveries(): number { return this.value.totalDeliveries; }
  get totalDistanceKm(): number | undefined { return this.value.totalDistanceKm; }
  get cashLimit(): number | undefined { return this.value.cashLimit; }
  get cashInHand(): number | undefined { return this.value.cashInHand; }
  get isAvailable(): boolean { return this.value.isAvailable; }
  get lastActiveAt(): string | undefined { return this.value.lastActiveAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isAvailableStatus(): boolean { return this.status.isAvailable(); }
  isOnDuty(): boolean { return this.status.isOnDuty(); }
  isSuspended(): boolean { return this.status.isSuspended(); }

  isLicenseValid(): boolean { return !this.license.isExpired(); }

  hasVehicle(): boolean { return !!this.vehicleId; }

  get cashUtilization(): number {
    if (!this.cashLimit || this.cashLimit === 0) return 0;
    return ((this.cashInHand ?? 0) / this.cashLimit) * 100;
  }
}
