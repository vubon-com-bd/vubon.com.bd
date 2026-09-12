export const calculateSplitAmounts = (
  total: number,
  parties: { percentage: number }[]
): number[] => {
  return parties.map((p) => (total * p.percentage) / 100);
};

export const calculateSplitEqual = (total: number, count: number): number[] => {
  const amount = total / count;
  return Array(count).fill(amount);
};

export const calculateSplitByAmount = (total: number, amounts: number[]): number[] => {
  const sum = amounts.reduce((a, b) => a + b, 0);
  return amounts.map((a) => (total * a) / sum);
};
