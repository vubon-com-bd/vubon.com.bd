import { FAQ_STATUS } from '@vubon/shared-constants/src/content/faq-status.constants';

export interface FaqInput {
  question: string;
  answer: string;
  status: string;
}

export const validateFaq = (faq: Partial<FaqInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!faq.question) errors.push('Question is required');
  if (!faq.answer) errors.push('Answer is required');
  if (faq.status && !Object.keys(FAQ_STATUS).includes(faq.status)) {
    errors.push('Invalid FAQ status');
  }
  return { isValid: errors.length === 0, errors };
};
