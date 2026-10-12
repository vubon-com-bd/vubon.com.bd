/**
 * WeightKg Value Object — actual/volumetric weight in kilograms
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class WeightKgVO extends BaseVO<number> {
  private static readonly MAX_KG = SHIPMENT.MAX_WEIGHT_KG;
  private static readonly MIN_KG = 0.001;

  private constructor(value: number) { super(value); }

  static create(raw: number): WeightKgVO {
    if (!Number.isFinite(raw) || raw <= 0) {
      throw new ValidationError('Weight must be a positive number', 'weightKg');
    }
    if (raw > WeightKgVO.MAX_KG) {
      throw new ValidationError(`Weight exceeds maximum ${WeightKgVO.MAX_KG}kg`, 'weightKg');
    }
    if (raw < WeightKgVO.MIN_KG) {
      throw new ValidationError(`Weight must be at least ${WeightKgVO.MIN_KG}kg`, 'weightKg');
    }
    return new WeightKgVO(Math.round(raw * 1000) / 1000);
  }

  static reconstitute(raw: number): WeightKgVO { return new WeightKgVO(raw); }

  toGrams(): number { return Math.round(this.value * 1000); }
  isHeavy(): boolean { return this.value > 30; }

  static max(): number { return WeightKgVO.MAX_KG; }
  static min(): number { return WeightKgVO.MIN_KG; }
}
