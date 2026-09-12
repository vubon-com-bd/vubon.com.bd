/**
 * Commission Formatter — vendor-scoped names.
 */
export interface CommissionFormatData {
  type: 'fixed' | 'percentage';
  rate: number;
  fixedAmount?: { amount: number };
}

export const formatCommissionPrice = (amount: number, currency = 'BDT'): string =>
  `${amount.toFixed(2)} ${currency}`;

export const formatCommissionPercentage = (value: number): string => `${value.toFixed(1)}%`;

export const formatCommission = (commission: CommissionFormatData): string => {
  if (commission.type === 'fixed') {
    return formatCommissionPrice(commission.fixedAmount?.amount ?? 0);
  }
  return formatCommissionPercentage(commission.rate);
};
