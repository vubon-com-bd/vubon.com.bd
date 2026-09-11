export interface PaymentCalculationData {
  amount: { amount: number };
}

export const calculatePaymentTotal = (payment: PaymentCalculationData): number => {
  return payment.amount.amount;
};

export const calculatePaymentFee = (amount: number, feePercentage: number): number => {
  return (amount * feePercentage) / 100;
};

export const calculatePaymentNet = (amount: number, fee: number): number => {
  return amount - fee;
};

export const calculatePaymentTax = (amount: number, taxRate: number): number => {
  return (amount * taxRate) / 100;
};
