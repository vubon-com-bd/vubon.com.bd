export interface AffiliatePayoutData {
  amount: { amount: number };
  fee: { amount: number };
  status: string;
}

export const calculatePayoutAmount = (payout: AffiliatePayoutData): number => {
  return payout.amount.amount - payout.fee.amount;
};

export const calculateTotalPayouts = (payouts: AffiliatePayoutData[]): number => {
  return payouts.reduce((sum, p) => sum + p.amount.amount, 0);
};

export const calculatePendingPayouts = (payouts: AffiliatePayoutData[]): number => {
  return payouts.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.amount.amount, 0);
};
