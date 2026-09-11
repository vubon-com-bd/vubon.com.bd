export const formatMarketingPrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatMarketingDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-GB');
};

export interface MarketingFormatData {
  totalCampaigns: number;
  totalBudget?: { amount: number };
  spentBudget?: { amount: number };
}

export const formatMarketingSummary = (marketing: MarketingFormatData): string => {
  return `Campaigns: ${marketing.totalCampaigns} | Budget: ${formatMarketingPrice(marketing.totalBudget?.amount || 0)} | Spent: ${formatMarketingPrice(marketing.spentBudget?.amount || 0)}`;
};

export const formatMarketingStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
