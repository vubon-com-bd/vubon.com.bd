export class CampaignPerformanceService {
  calculateRoi(revenue: number, cost: number): number {
    if (cost === 0) return 0;
    return (revenue - cost) / cost;
  }

  calculateRoas(revenue: number, cost: number): number {
    if (cost === 0) return 0;
    return revenue / cost;
  }
}
