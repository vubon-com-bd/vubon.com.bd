import { getOptionalEnv } from './env/env.validation';
import { ENVIRONMENT } from '@vubon/shared-constants/src/common/environment.constants';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';

const nodeEnv = getOptionalEnv('NODE_ENV', ENVIRONMENT.DEVELOPMENT);

export const paymentConfig = {
  defaultCurrency: CURRENCY.BDT.code,
  minAmount: 1,
  maxAmount: 9_999_999,
  timeout: 15 * 60,
  retryAttempts: 3,
  retryDelay: 60,
  testMode: nodeEnv !== ENVIRONMENT.PRODUCTION,
} as const;
