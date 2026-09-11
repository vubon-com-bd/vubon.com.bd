export interface RefundCalculationData {
  amount: { amount: number };
}

export const calculateRefundAmount = (
  payment: RefundCalculationData,
  percentage: number
): number => {
  return (payment.amount.amount * percentage) / 100;
};

export const calculatePartialRefund = (payment: RefundCalculationData, amount: number): number => {
  return Math.min(amount, payment.amount.amount);
};

export const calculateRefundFee = (amount: number, feePercentage: number): number => {
  return (amount * feePercentage) / 100;
};

export const calculateRefundNet = (amount: number, fee: number): number => {
  return amount - fee;
};
