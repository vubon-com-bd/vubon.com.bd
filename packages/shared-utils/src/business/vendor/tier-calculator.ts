export const calculateTierBenefits = (tier: string): string[] => {
  const benefits: Record<string, string[]> = {
    basic: ['store_front', 'basic_analytics'],
    silver: ['store_front', 'advanced_analytics', 'priority_support'],
    gold: ['store_front', 'premium_analytics', 'priority_support', 'marketing_tools'],
    platinum: [
      'store_front',
      'premium_analytics',
      'priority_support',
      'marketing_tools',
      'api_access',
    ],
    diamond: [
      'store_front',
      'enterprise_analytics',
      'dedicated_support',
      'marketing_tools',
      'api_access',
      'custom_branding',
    ],
    enterprise: [
      'store_front',
      'enterprise_analytics',
      'dedicated_support',
      'marketing_tools',
      'api_access',
      'custom_branding',
      'white_label',
    ],
  };
  return benefits[tier] || benefits.basic;
};

export const calculateTierCommission = (tier: string): number => {
  const rates: Record<string, number> = {
    basic: 15,
    silver: 12,
    gold: 10,
    platinum: 8,
    diamond: 6,
    enterprise: 4,
  };
  return rates[tier] || 15;
};
