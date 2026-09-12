export const calculateTier = (points: number): string => {
  const tiers: { name: string; minPoints: number }[] = [
    { name: 'basic', minPoints: 0 },
    { name: 'silver', minPoints: 1000 },
    { name: 'gold', minPoints: 5000 },
    { name: 'platinum', minPoints: 10000 },
    { name: 'diamond', minPoints: 25000 },
  ];
  let currentTier = tiers[0].name;
  for (const tier of tiers) {
    if (points >= tier.minPoints) {
      currentTier = tier.name;
    }
  }
  return currentTier;
};

export const calculateTierBenefits = (tier: string): string[] => {
  const benefits: Record<string, string[]> = {
    basic: ['standard_discount'],
    silver: ['standard_discount', 'free_shipping'],
    gold: ['standard_discount', 'free_shipping', 'priority_support'],
    platinum: ['standard_discount', 'free_shipping', 'priority_support', 'exclusive_offers'],
    diamond: [
      'standard_discount',
      'free_shipping',
      'priority_support',
      'exclusive_offers',
      'vip_access',
    ],
  };
  return benefits[tier] || benefits.basic;
};

export const calculateTierDiscount = (tier: string): number => {
  const discounts: Record<string, number> = {
    basic: 0,
    silver: 5,
    gold: 10,
    platinum: 15,
    diamond: 20,
  };
  return discounts[tier] || 0;
};
