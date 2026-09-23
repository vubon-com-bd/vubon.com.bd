export class InsuranceCalculatorService {
  calculatePremium(declaredValue: number, coverageRate = 0.02): number {
    if (declaredValue <= 0) return 0;
    return Number((declaredValue * coverageRate).toFixed(2));
  }
}
