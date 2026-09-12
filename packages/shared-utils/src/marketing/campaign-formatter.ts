export const formatCampaignPrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatCampaignDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-GB');
};

export interface CampaignFormatData {
  name: string;
  status: string;
  budget: {
    total: { amount: number };
    spent: { amount: number };
    remaining: { amount: number };
  };
  startDate: Date;
  endDate: Date;
}

export const formatCampaignSummary = (campaign: CampaignFormatData): string => {
  return `${campaign.name} | ${campaign.status} | Budget: ${formatCampaignPrice(campaign.budget.total.amount)} | ${formatCampaignDate(campaign.startDate)} - ${formatCampaignDate(campaign.endDate)}`;
};

export const formatCampaignStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatCampaignBudget = (campaign: CampaignFormatData): string => {
  return `Total: ${formatCampaignPrice(campaign.budget.total.amount)} | Spent: ${formatCampaignPrice(campaign.budget.spent.amount)} | Remaining: ${formatCampaignPrice(campaign.budget.remaining.amount)}`;
};
