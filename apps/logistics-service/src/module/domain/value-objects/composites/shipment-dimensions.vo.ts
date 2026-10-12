/**
 * ShipmentDimensionsVO — dims + actual/chargeable weight
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DimensionCmVO } from '../primitives/dimension-cm.vo.js';
import { WeightKgVO } from '../primitives/weight-kg.vo.js';

export interface ShipmentDimensionsValue {
  readonly dimensions?: DimensionCmVO;
  readonly actualWeightKg: WeightKgVO;
  readonly volumetricWeightKg?: WeightKgVO;
}

export class ShipmentDimensionsVO extends BaseVO<ShipmentDimensionsValue> {
  private constructor(value: ShipmentDimensionsValue) { super(value); }

  static create(input: {
    dimensions?: { lengthCm: number; widthCm: number; heightCm: number };
    actualWeightKg: number;
    volumetricWeightKg?: number;
  }): ShipmentDimensionsVO {
    const actual = WeightKgVO.create(input.actualWeightKg);
    const dims = input.dimensions
      ? DimensionCmVO.create(input.dimensions.lengthCm, input.dimensions.widthCm, input.dimensions.heightCm)
      : undefined;
    const volumetric = input.volumetricWeightKg !== undefined
      ? WeightKgVO.create(input.volumetricWeightKg)
      : dims
        ? WeightKgVO.create(dims.volumetricWeightKg)
        : undefined;
    return new ShipmentDimensionsVO({
      dimensions: dims,
      actualWeightKg: actual,
      volumetricWeightKg: volumetric,
    });
  }

  static reconstitute(value: ShipmentDimensionsValue): ShipmentDimensionsVO {
    return new ShipmentDimensionsVO(value);
  }

  get dimensions(): DimensionCmVO | undefined { return this.value.dimensions; }
  get actualWeightKg(): WeightKgVO { return this.value.actualWeightKg; }
  get volumetricWeightKg(): WeightKgVO | undefined { return this.value.volumetricWeightKg; }

  /** Billable weight = max(actual, volumetric). */
  get chargeableWeightKg(): WeightKgVO {
    if (!this.value.volumetricWeightKg) return this.value.actualWeightKg;
    return this.value.volumetricWeightKg.value > this.value.actualWeightKg.value
      ? this.value.volumetricWeightKg
      : this.value.actualWeightKg;
  }

  isVolumetricDominant(): boolean {
    return this.value.volumetricWeightKg !== undefined
      && this.value.volumetricWeightKg.value > this.value.actualWeightKg.value;
  }

  hasDimensions(): boolean { return this.value.dimensions !== undefined; }
}
