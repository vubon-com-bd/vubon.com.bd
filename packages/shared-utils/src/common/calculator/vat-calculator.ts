export const calculateVAT = (amount: number, vatRate: number = 15): number => {
  return (amount * vatRate) / 100;
};

export const calculateTotalWithVAT = (amount: number, vatRate: number = 15): number => {
  return amount + calculateVAT(amount, vatRate);
};
