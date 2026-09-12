export interface AffiliateCommissionData {
  type: 'fixed' | 'percentage' | 'tiered';
  rate: number;
  amount?: { amount: number };
}

export const calculateAffiliateCommissionRate = (amount: number, rate: number): number => {
  return (amount * rate) / 100;
};

export const calculateAffiliateCommission = (
  amount: number,
  commission: AffiliateCommissionData
): number => {
  if (commission.type === 'fixed') {
    return commission.amount?.amount || 0;
  }
  return calculateAffiliateCommissionRate(amount, commission.rate);
};

export const calculateTieredCommission = (amount: number, tier: string): number => {
  const rates: Record<string, number> = {
    tier_1: 10,
    tier_2: 12,
    tier_3: 15,
    tier_4: 20,
  };
  const rate = rates[tier] || 10;
  return calculateAffiliateCommissionRate(amount, rate);
};
