export interface CampaignBudgetData {
  budget: {
    total: { amount: number };
    spent: { amount: number };
    remaining: { amount: number };
  };
}

export const calculateCampaignBudget = (campaign: CampaignBudgetData): number => {
  return campaign.budget.total.amount;
};

export const calculateCampaignSpent = (campaign: CampaignBudgetData): number => {
  return campaign.budget.spent.amount;
};

export const calculateCampaignRemaining = (campaign: CampaignBudgetData): number => {
  return campaign.budget.remaining.amount;
};

export const calculateCampaignROI = (revenue: number, spent: number): number => {
  if (spent === 0) return 0;
  return ((revenue - spent) / spent) * 100;
};
