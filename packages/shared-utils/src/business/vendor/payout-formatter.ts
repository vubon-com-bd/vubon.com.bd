/**
 * Payout Formatter — vendor-scoped names.
 */
export interface PayoutFormatData {
  requestedAt: Date;
  amount: { amount: number };
  status: string;
}

export const formatPayoutPrice = (amount: number, currency = 'BDT'): string =>
  `${amount.toFixed(2)} ${currency}`;

export const formatPayoutDate = (date: Date): string => new Date(date).toLocaleDateString('en-GB');

export const formatPayoutSummary = (payout: PayoutFormatData): string =>
  `${formatPayoutDate(payout.requestedAt)} | ${formatPayoutPrice(payout.amount.amount)} | ${payout.status}`;

export const formatPayoutStatus = (status: string): string =>
  status.charAt(0).toUpperCase() + status.slice(1);
