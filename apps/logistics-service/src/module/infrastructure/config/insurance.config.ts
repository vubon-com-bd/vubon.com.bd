import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const INSURANCE_CONFIG = Object.freeze({
  defaultCoverageRate: getOptionalEnvInt('INSURANCE_COVERAGE_RATE', 2),
  minDeclaredValue: getOptionalEnvInt('INSURANCE_MIN_VALUE', 100),
  maxDeclaredValue: getOptionalEnvInt('INSURANCE_MAX_VALUE', 1000000),
});
