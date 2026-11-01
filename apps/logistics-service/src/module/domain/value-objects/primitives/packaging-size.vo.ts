/**
 * PackagingSize Value Object (Composite: dimensions + weight)
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PACKAGING } from '@vubon/shared-constants/logistics';

export interface PackagingSizeValue {
  readonly lengthCm: number;
  readonly widthCm: number;
  readonly heightCm: number;
  readonly maxWeightKg: number;
}

export class PackagingSizeVO extends BaseVO<PackagingSizeValue> {
  private constructor(value: PackagingSizeValue) {
    super(value);
  }

  static create(raw: PackagingSizeValue): PackagingSizeVO {
    const { lengthCm, widthCm, heightCm, maxWeightKg } = raw;

    if (lengthCm <= 0 || lengthCm > PACKAGING.MAX_PACKAGE_LENGTH_CM) {
      throw new ValidationError(
        `Length must be 1-${PACKAGING.MAX_PACKAGE_LENGTH_CM}cm`,
        'lengthCm',
      );
    }
    if (widthCm <= 0 || widthCm > PACKAGING.MAX_PACKAGE_WIDTH_CM) {
      throw new ValidationError(
        `Width must be 1-${PACKAGING.MAX_PACKAGE_WIDTH_CM}cm`,
        'widthCm',
      );
    }
    if (heightCm <= 0 || heightCm > PACKAGING.MAX_PACKAGE_HEIGHT_CM) {
      throw new ValidationError(
        `Height must be 1-${PACKAGING.MAX_PACKAGE_HEIGHT_CM}cm`,
        'heightCm',
      );
    }
    if (
      maxWeightKg < PACKAGING.MIN_PACKAGE_WEIGHT_KG ||
      maxWeightKg > PACKAGING.MAX_PACKAGE_WEIGHT_KG
    ) {
      throw new ValidationError(
        `Max weight must be ${PACKAGING.MIN_PACKAGE_WEIGHT_KG}-${PACKAGING.MAX_PACKAGE_WEIGHT_KG}kg`,
        'maxWeightKg',
      );
    }

    return new PackagingSizeVO({ lengthCm, widthCm, heightCm, maxWeightKg });
  }

  static reconstitute(raw: PackagingSizeValue): PackagingSizeVO {
    return new PackagingSizeVO(raw);
  }

  get lengthCm(): number { return this.value.lengthCm; }
  get widthCm(): number { return this.value.widthCm; }
  get heightCm(): number { return this.value.heightCm; }
  get maxWeightKg(): number { return this.value.maxWeightKg; }

  get volumeM3(): number {
    return (this.value.lengthCm * this.value.widthCm * this.value.heightCm) / 1_000_000;
  }

  get girthCm(): number {
    return 2 * (this.value.widthCm + this.value.heightCm);
  }

  /** Dimensional weight (volumetric weight for courier billing) */
  get dimensionalWeightKg(): number {
    return (this.value.lengthCm * this.value.widthCm * this.value.heightCm) / 5000;
  }

  canFit(inner: PackagingSizeValue): boolean {
    return (
      inner.lengthCm <= this.value.lengthCm &&
      inner.widthCm <= this.value.widthCm &&
      inner.heightCm <= this.value.heightCm &&
      inner.maxWeightKg <= this.value.maxWeightKg
    );
  }
}
