import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PROMOTION_CONFIG = Object.freeze({
  defaultMaxUsage: getOptionalEnvInt('PROMOTION_DEFAULT_MAX_USAGE', 1000),
  codeLength: getOptionalEnvInt('PROMOTION_CODE_LENGTH', 10),
  stackableTypes: Object.freeze(['coupon']),
} as const);
