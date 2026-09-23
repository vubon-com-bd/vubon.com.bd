import { WeightVO } from '../value-objects/primitives/weight.vo';

export class WeightCalculatorService {
  volumetric(lengthCm: number, widthCm: number, heightCm: number, divisor = 5000): WeightVO {
    const vol = (lengthCm * widthCm * heightCm) / divisor;
    return WeightVO.create(Number(vol.toFixed(2)));
  }

  chargeable(actual: WeightVO, volumetric: WeightVO): WeightVO {
    return actual.toKg() >= volumetric.toKg() ? actual : volumetric;
  }
}
