export const commissionConfig = {
  defaultRate: 10,
  tierRates: {
    basic: 15,
    silver: 12,
    gold: 10,
    platinum: 8,
    diamond: 6,
    enterprise: 4,
  },
  minAmount: 1,
  maxAmount: 1000,
  calculation: 'product_price',
};
