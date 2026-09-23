import { WeightVO } from '../value-objects/primitives/weight.vo';

export interface ShippingRateInput {
  readonly baseRate: number;
  readonly perKgRate: number;
  readonly weight: WeightVO;
}

export class ShippingRateService {
  calculate(input: ShippingRateInput): number {
    const extraWeight = Math.max(0, input.weight.toKg() - 1);
    return input.baseRate + extraWeight * input.perKgRate;
  }
}
