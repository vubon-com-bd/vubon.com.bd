import { SUPPORT_TEMPLATE } from '@vubon/shared-constants/src/support/support-template.constants';

export interface SupportTemplateInput {
  name: string;
  subject: string;
  content: string;
  status: string;
  type: string;
}

export const validateSupportTemplate = (
  template: Partial<SupportTemplateInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!template.name) errors.push('Template name is required');
  if (!template.subject) errors.push('Subject is required');
  if (!template.content) errors.push('Content is required');
  if (template.status && !Object.keys(SUPPORT_TEMPLATE.STATUS).includes(template.status)) {
    errors.push('Invalid template status');
  }
  if (template.type && !Object.keys(SUPPORT_TEMPLATE.TYPES).includes(template.type)) {
    errors.push('Invalid template type');
  }
  return { isValid: errors.length === 0, errors };
};
