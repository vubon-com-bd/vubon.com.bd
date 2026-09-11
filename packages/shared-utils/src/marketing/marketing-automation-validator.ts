import { MARKETING_AUTOMATION } from '@vubon/shared-constants/src/marketing/marketing-automation.constants';

export interface MarketingAutomationInput {
  name: string;
  status: string;
  type: string;
  trigger: string;
}

export const validateMarketingAutomation = (
  automation: Partial<MarketingAutomationInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!automation.name) errors.push('Automation name is required');
  if (automation.status && !Object.keys(MARKETING_AUTOMATION.STATUS).includes(automation.status)) {
    errors.push('Invalid automation status');
  }
  if (automation.type && !Object.keys(MARKETING_AUTOMATION.TYPES).includes(automation.type)) {
    errors.push('Invalid automation type');
  }
  if (
    automation.trigger &&
    !Object.keys(MARKETING_AUTOMATION.TRIGGER_TYPES).includes(automation.trigger)
  ) {
    errors.push('Invalid trigger type');
  }
  return { isValid: errors.length === 0, errors };
};
