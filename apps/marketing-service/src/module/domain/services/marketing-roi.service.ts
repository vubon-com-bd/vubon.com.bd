export class MarketingRoiService {
  calculate(revenueGained: number, marketingCost: number): number {
    if (marketingCost === 0) return 0;
    return ((revenueGained - marketingCost) / marketingCost) * 100;
  }
}
