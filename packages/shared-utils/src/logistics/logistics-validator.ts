import { LOGISTICS } from '@vubon/shared-constants/src/logistics/logistics.constants';

export interface LogisticsInput {
  status: string;
  isActive: boolean;
}

export const validateLogistics = (
  logistics: Partial<LogisticsInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (logistics.status && !Object.keys(LOGISTICS.STATUS).includes(logistics.status)) {
    errors.push('Invalid logistics status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isLogisticsOperational = (logistics: LogisticsInput): boolean => {
  return logistics.isActive;
};
