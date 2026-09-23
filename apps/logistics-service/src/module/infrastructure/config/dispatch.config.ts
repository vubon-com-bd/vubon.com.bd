import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const DISPATCH_CONFIG = Object.freeze({
  maxActiveDispatches: getOptionalEnvInt('DISPATCH_MAX_ACTIVE', 100),
  autoAssignDriver: getOptionalEnvInt('DISPATCH_AUTO_DRIVER', 0) === 1,
});
