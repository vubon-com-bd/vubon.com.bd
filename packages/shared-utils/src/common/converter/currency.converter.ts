export const convertCurrency = (amount: number, from: string, to: string, rate: number): number => {
  return amount * rate;
};
