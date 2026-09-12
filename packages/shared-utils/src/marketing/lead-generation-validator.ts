import { LEAD_STATUS } from '@vubon/shared-constants/src/marketing/lead-status.constants';

export interface LeadGenerationInput {
  email: string;
  phone: string;
  status: string;
  source: string;
}

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^\+?[0-9]{10,15}$/.test(phone);
};

export const validateLead = (
  lead: Partial<LeadGenerationInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!lead.email) errors.push('Email is required');
  if (lead.email && !validateEmail(lead.email)) {
    errors.push('Invalid email');
  }
  if (lead.phone && !validatePhone(lead.phone)) {
    errors.push('Invalid phone');
  }
  if (lead.status && !Object.keys(LEAD_STATUS).includes(lead.status)) {
    errors.push('Invalid lead status');
  }
  return { isValid: errors.length === 0, errors };
};
