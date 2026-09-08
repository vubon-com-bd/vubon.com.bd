export const calculateLoyaltyPoints = (amount: number, multiplier: number = 1): number => {
  return Math.floor(amount * multiplier);
};

export const calculatePointsValue = (points: number, rate: number = 0.01): number => {
  return points * rate;
};
