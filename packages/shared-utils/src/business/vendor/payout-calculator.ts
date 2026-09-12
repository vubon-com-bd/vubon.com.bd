export interface PayoutData {
  amount: { amount: number };
  status: string;
}

export const calculatePayoutAmount = (amount: number, fee: number): number => {
  return amount - fee;
};

export const calculatePendingPayouts = (payouts: PayoutData[]): number => {
  return payouts.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.amount.amount, 0);
};

export const calculateTotalPayouts = (payouts: PayoutData[]): number => {
  return payouts.reduce((sum, p) => sum + p.amount.amount, 0);
};
