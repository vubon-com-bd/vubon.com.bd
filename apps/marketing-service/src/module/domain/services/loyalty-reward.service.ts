export class LoyaltyRewardService {
  canAfford(points: number, pointsCost: number): boolean {
    return points >= pointsCost;
  }
}
