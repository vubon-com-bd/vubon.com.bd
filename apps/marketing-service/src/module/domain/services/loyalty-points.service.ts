export class LoyaltyPointsService {
  calculateEarned(orderAmount: number, pointsPerCurrencyUnit: number): number {
    return Math.floor(orderAmount * pointsPerCurrencyUnit);
  }

  calculateTierFromPoints(points: number): string {
    if (points >= 100000) return 'diamond';
    if (points >= 50000) return 'platinum';
    if (points >= 20000) return 'gold';
    if (points >= 5000) return 'silver';
    return 'bronze';
  }
}
