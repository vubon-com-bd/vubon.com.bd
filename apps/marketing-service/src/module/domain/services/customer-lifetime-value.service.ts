export class CustomerLifetimeValueService {
  calculate(
    averageOrderValue: number,
    purchaseFrequency: number,
    customerLifespanYears: number,
  ): number {
    return averageOrderValue * purchaseFrequency * customerLifespanYears;
  }
}
