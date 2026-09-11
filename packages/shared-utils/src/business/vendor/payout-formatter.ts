export const formatPrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-GB');
};

export interface PayoutFormatData {
  requestedAt: Date;
  amount: { amount: number };
  status: string;
}

export const formatPayoutSummary = (payout: PayoutFormatData): string => {
  return `${formatDate(payout.requestedAt)} | ${formatPrice(payout.amount.amount)} | ${payout.status}`;
};

export const formatPayoutStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
