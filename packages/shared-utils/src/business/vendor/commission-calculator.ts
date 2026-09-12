export interface CommissionData {
  type: 'fixed' | 'percentage';
  rate: number;
  fixedAmount?: { amount: number };
}

export const calculateCommission = (amount: number, rate: number): number => {
  return (amount * rate) / 100;
};

export const calculateVendorCommission = (amount: number, rate: number): number => {
  return calculateCommission(amount, rate);
};

export const calculateCommissionAmount = (amount: number, commission: CommissionData): number => {
  if (commission.type === 'fixed') {
    return commission.fixedAmount?.amount || 0;
  }
  return calculateVendorCommission(amount, commission.rate);
};

export const calculateNetAmount = (amount: number, commission: CommissionData): number => {
  const commissionAmount = calculateCommissionAmount(amount, commission);
  return amount - commissionAmount;
};
