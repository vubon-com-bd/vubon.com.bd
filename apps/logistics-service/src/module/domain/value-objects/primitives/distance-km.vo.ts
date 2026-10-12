/**
 * DistanceKm Value Object — distance in kilometers
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ROUTE } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DistanceKmVO extends BaseVO<number> {
  private static readonly MAX_KM = ROUTE.MAX_DISTANCE_KM;

  private constructor(value: number) { super(value); }

  static create(raw: number): DistanceKmVO {
    if (!Number.isFinite(raw) || raw < 0) {
      throw new ValidationError('Distance must be non-negative', 'distanceKm');
    }
    if (raw > DistanceKmVO.MAX_KM) {
      throw new ValidationError(`Distance exceeds max ${DistanceKmVO.MAX_KM}km`, 'distanceKm');
    }
    return new DistanceKmVO(Math.round(raw * 100) / 100);
  }

  static reconstitute(raw: number): DistanceKmVO { return new DistanceKmVO(raw); }

  static max(): number { return DistanceKmVO.MAX_KM; }

  toMeters(): number { return Math.round(this.value * 1000); }

  add(other: DistanceKmVO): DistanceKmVO {
    return DistanceKmVO.create(this.value + other.value);
  }

  isLongHaul(): boolean { return this.value > 500; }
  isShortHaul(): boolean { return this.value <= 20; }
}
