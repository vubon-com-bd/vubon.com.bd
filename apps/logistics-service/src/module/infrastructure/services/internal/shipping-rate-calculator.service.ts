import { Injectable } from '@nestjs/common';
import { commerceCalculator } from '@vubon/shared-utils/common';

@Injectable()
export class ShippingRateCalculatorService {
  calculate(baseRate: number, perKgRate: number, weightKg: number): number {
    return commerceCalculator.calculateShipping({ baseRate, perKgRate, weightKg });
  }

  calculateFee(amount: number, feePercent: number, fixedFee = 0): number {
    return commerceCalculator.calculateFee(amount, feePercent, fixedFee);
  }
}
