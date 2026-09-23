export class CustomerAcquisitionCostService {
  calculate(totalMarketingSpend: number, newCustomersAcquired: number): number {
    if (newCustomersAcquired === 0) return 0;
    return totalMarketingSpend / newCustomersAcquired;
  }
}
