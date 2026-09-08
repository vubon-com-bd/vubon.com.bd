import { isValidDate } from './date.validator';

export const validateAnalyticsQuery = (query: {
  startDate?: string;
  endDate?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!query) errors.push('Query is required');
  if (query.startDate && !isValidDate(query.startDate)) {
    errors.push('Invalid start date');
  }
  if (query.endDate && !isValidDate(query.endDate)) {
    errors.push('Invalid end date');
  }
  if (query.startDate && query.endDate && new Date(query.startDate) > new Date(query.endDate)) {
    errors.push('Start date must be before end date');
  }
  return { isValid: errors.length === 0, errors };
};
