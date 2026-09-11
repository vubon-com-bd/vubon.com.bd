export const formatPaymentPrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export interface PaymentFormatData {
  amount: { amount: number };
  status?: string;
}

export interface TransactionFormatData {
  reference: string;
  amount: { amount: number };
  status?: string;
}

export const formatPaymentSummary = (payment: PaymentFormatData): string => {
  const amount = payment.amount.amount;
  const status = payment.status || 'pending';
  return `Payment: ${formatPaymentPrice(amount)} | Status: ${status}`;
};

export const formatTransactionSummary = (transaction: TransactionFormatData): string => {
  const amount = transaction.amount.amount;
  const status = transaction.status || 'pending';
  return `Transaction: ${transaction.reference} | ${formatPaymentPrice(amount)} | ${status}`;
};

export const formatPaymentStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
