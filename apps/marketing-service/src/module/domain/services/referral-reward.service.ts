export class ReferralRewardService {
  calculateReward(baseAmount: number, rewardPercent: number): number {
    return (baseAmount * rewardPercent) / 100;
  }
}
