export const payoutConfig = {
  minAmount: 100,
  maxAmount: 500000,
  frequencies: ['daily', 'weekly', 'bi_weekly', 'monthly'],
  defaultFrequency: 'weekly',
  processingDays: 3,
  holdPeriodDays: 7,
  methods: ['bank_transfer', 'bkash', 'nagad', 'rocket'],
};
