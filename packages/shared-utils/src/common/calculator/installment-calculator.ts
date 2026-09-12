/**
 * Installment Calculator — EMI formula.
 */
const MAX_MONTHS = 360;

export const calculateInstallment = (
  amount: number,
  months: number,
  interestRate: number = 0
): number => {
  if (!Number.isFinite(amount) || amount < 0) throw new Error('Amount must be non-negative');
  if (!Number.isInteger(months) || months <= 0)
    throw new Error('Months must be a positive integer');
  if (months > MAX_MONTHS) throw new Error(`Months must not exceed ${MAX_MONTHS}`);
  if (interestRate < 0) throw new Error('Interest rate must be non-negative');

  if (interestRate === 0) return amount / months;

  const monthlyInterest = interestRate / 12 / 100;
  const pow = Math.pow(1 + monthlyInterest, months);
  return (amount * monthlyInterest * pow) / (pow - 1);
};

export const calculateTotalPayable = (
  amount: number,
  months: number,
  interestRate: number = 0
): number => calculateInstallment(amount, months, interestRate) * months;

export const calculateTotalInterest = (
  amount: number,
  months: number,
  interestRate: number = 0
): number => calculateTotalPayable(amount, months, interestRate) - amount;
