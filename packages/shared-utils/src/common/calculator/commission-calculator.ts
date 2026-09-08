export const calculateCommission = (amount: number, commissionRate: number): number => {
  return (amount * commissionRate) / 100;
};

export const calculateNetAmount = (amount: number, commissionRate: number): number => {
  return amount - calculateCommission(amount, commissionRate);
};
