import { SUPPORT_AUTOMATION } from '@vubon/shared-constants/src/support/support-automation.constants';

export interface SupportAutomationInput {
  name: string;
  status: string;
  type: string;
  executionTime: string;
}

export const validateSupportAutomation = (
  automation: Partial<SupportAutomationInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!automation.name) errors.push('Automation name is required');
  if (automation.status && !Object.keys(SUPPORT_AUTOMATION.STATUS).includes(automation.status)) {
    errors.push('Invalid automation status');
  }
  if (automation.type && !Object.keys(SUPPORT_AUTOMATION.TYPES).includes(automation.type)) {
    errors.push('Invalid automation type');
  }
  if (
    automation.executionTime &&
    !Object.keys(SUPPORT_AUTOMATION.EXECUTION_TIMES).includes(automation.executionTime)
  ) {
    errors.push('Invalid execution time');
  }
  return { isValid: errors.length === 0, errors };
};
