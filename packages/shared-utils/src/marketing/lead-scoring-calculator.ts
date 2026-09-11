export interface LeadData {
  email?: string;
  phone?: string;
  address?: string;
  interest?: string[];
  budget?: number;
}

export const calculateLeadScore = (lead: LeadData): number => {
  let score = 0;
  if (lead.email) score += 10;
  if (lead.phone) score += 20;
  if (lead.address) score += 15;
  if (lead.interest && lead.interest.length > 0) score += 25;
  if (lead.budget) score += 30;
  return score;
};

export const qualifyLead = (lead: LeadData): boolean => {
  return calculateLeadScore(lead) >= 50;
};

export const getLeadStatus = (lead: LeadData): string => {
  const score = calculateLeadScore(lead);
  if (score >= 80) return 'hot';
  if (score >= 50) return 'warm';
  return 'cold';
};
