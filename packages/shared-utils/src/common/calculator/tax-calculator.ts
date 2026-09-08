export const calculateTax = (amount: number, taxRate: number): number => {
  return (amount * taxRate) / 100;
};

export const calculateTotalWithTax = (amount: number, taxRate: number): number => {
  return amount + calculateTax(amount, taxRate);
};
