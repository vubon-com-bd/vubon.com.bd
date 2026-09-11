export const calculateLoyaltyPointsEarned = (amount: number, multiplier: number = 1): number => {
  return Math.floor(amount * multiplier);
};

export const calculateLoyaltyPointsValue = (points: number, rate: number = 0.01): number => {
  return points * rate;
};

export const calculatePointsEarned = (transaction: {
  amount: number;
  multiplier: number;
}): number => {
  return calculateLoyaltyPointsEarned(transaction.amount, transaction.multiplier);
};
