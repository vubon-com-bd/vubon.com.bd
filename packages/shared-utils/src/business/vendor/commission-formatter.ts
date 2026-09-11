export const formatPrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export interface CommissionFormatData {
  type: 'fixed' | 'percentage';
  rate: number;
  fixedAmount?: { amount: number };
}

export const formatCommission = (commission: CommissionFormatData): string => {
  if (commission.type === 'fixed') {
    return formatPrice(commission.fixedAmount?.amount || 0);
  }
  return formatPercentage(commission.rate);
};
