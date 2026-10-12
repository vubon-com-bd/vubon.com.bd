/**
 * DimensionCm Value Object — {lengthCm, widthCm, heightCm} + volumetric weight
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PACKAGING } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { calculateVolumetricWeight } from '@vubon/shared-utils/calculator';

export interface DimensionValue {
  readonly lengthCm: number;
  readonly widthCm: number;
  readonly heightCm: number;
}

const MAX_CM = PACKAGING.MAX_PACKAGE_LENGTH_CM;

export class DimensionCmVO extends BaseVO<DimensionValue> {
  private constructor(value: DimensionValue) { super(value); }

  static create(lengthCm: number, widthCm: number, heightCm: number): DimensionCmVO {
    for (const [name, val] of [['length', lengthCm], ['width', widthCm], ['height', heightCm]] as const) {
      if (!Number.isFinite(val) || val <= 0) {
        throw new ValidationError(`${name} must be a positive number`, name);
      }
      if (val > MAX_CM) {
        throw new ValidationError(`${name} ${val}cm exceeds max ${MAX_CM}cm`, name);
      }
    }
    return new DimensionCmVO({
      lengthCm: Math.round(lengthCm * 10) / 10,
      widthCm: Math.round(widthCm * 10) / 10,
      heightCm: Math.round(heightCm * 10) / 10,
    });
  }

  static reconstitute(value: DimensionValue): DimensionCmVO { return new DimensionCmVO(value); }

  get lengthCm(): number { return this.value.lengthCm; }
  get widthCm(): number { return this.value.widthCm; }
  get heightCm(): number { return this.value.heightCm; }

  get volumetricWeightKg(): number {
    return calculateVolumetricWeight({
      lengthCm: this.value.lengthCm,
      widthCm: this.value.widthCm,
      heightCm: this.value.heightCm,
    });
  }

  get girthCm(): number {
    return 2 * (this.value.widthCm + this.value.heightCm);
  }

  get longestSideCm(): number {
    return Math.max(this.value.lengthCm, this.value.widthCm, this.value.heightCm);
  }

  toString(): string { return `${this.value.lengthCm}×${this.value.widthCm}×${this.value.heightCm}cm`; }
}
