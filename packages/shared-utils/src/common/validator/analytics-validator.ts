/**
 * Analytics Query Validator.
 */
import { isValidDate } from './date.validator';

export interface AnalyticsQuery {
  startDate?: string;
  endDate?: string;
}

export const validateAnalyticsQuery = (
  query: AnalyticsQuery
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!query) {
    return { isValid: false, errors: ['Query is required'] };
  }
  if (query.startDate && !isValidDate(query.startDate)) {
    errors.push('Invalid start date');
  }
  if (query.endDate && !isValidDate(query.endDate)) {
    errors.push('Invalid end date');
  }
  if (
    query.startDate &&
    query.endDate &&
    new Date(query.startDate).getTime() > new Date(query.endDate).getTime()
  ) {
    errors.push('Start date must be before end date');
  }
  return { isValid: errors.length === 0, errors };
};
