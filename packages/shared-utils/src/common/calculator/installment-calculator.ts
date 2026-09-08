export const calculateInstallment = (
  amount: number,
  months: number,
  interestRate: number = 0
): number => {
  const monthlyInterest = interestRate / 12 / 100;
  if (interestRate === 0) {
    return amount / months;
  }
  return (
    (amount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
    (Math.pow(1 + monthlyInterest, months) - 1)
  );
};
