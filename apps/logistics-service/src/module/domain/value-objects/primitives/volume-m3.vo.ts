/**
 * VolumeM3 Value Object — cubic meters
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VolumeM3VO extends BaseVO<number> {
  private static readonly MAX_M3 = SHIPMENT.MAX_VOLUME_M3;

  private constructor(value: number) { super(value); }

  static create(raw: number): VolumeM3VO {
    if (!Number.isFinite(raw) || raw <= 0) {
      throw new ValidationError('Volume must be a positive number', 'volumeM3');
    }
    if (raw > VolumeM3VO.MAX_M3) {
      throw new ValidationError(`Volume exceeds maximum ${VolumeM3VO.MAX_M3}m³`, 'volumeM3');
    }
    return new VolumeM3VO(Math.round(raw * 1000) / 1000);
  }

  static reconstitute(raw: number): VolumeM3VO { return new VolumeM3VO(raw); }

  toLiters(): number { return Math.round(this.value * 1000); }
  static max(): number { return VolumeM3VO.MAX_M3; }
}
