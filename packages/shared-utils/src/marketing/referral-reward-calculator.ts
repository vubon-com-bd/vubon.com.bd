export interface ReferralRewardData {
  totalAmount: { amount: number };
  referrerAmount: { amount: number };
  refereeAmount: { amount: number };
}

export const calculateReferralReward = (reward: ReferralRewardData): number => {
  return reward.totalAmount.amount;
};

export const calculateReferrerReward = (reward: ReferralRewardData): number => {
  return reward.referrerAmount.amount;
};

export const calculateRefereeReward = (reward: ReferralRewardData): number => {
  return reward.refereeAmount.amount;
};
