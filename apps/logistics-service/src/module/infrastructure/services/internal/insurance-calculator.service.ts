import { Injectable } from '@nestjs/common';

@Injectable()
export class InsuranceCalculatorService {
  calculatePremium(declaredValue: number, coverageRate = 0.02): number {
    if (declaredValue <= 0) return 0;
    return Number((declaredValue * coverageRate).toFixed(2));
  }

  coverageAmount(declaredValue: number, coveragePercent = 100): number {
    return Number(((declaredValue * coveragePercent) / 100).toFixed(2));
  }
}
