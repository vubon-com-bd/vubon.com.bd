import { getOptionalEnv } from '@vubon/shared-config/common';

export const FULFILLMENT_CONFIG = Object.freeze({
  defaultStrategy: getOptionalEnv('FULFILLMENT_DEFAULT_STRATEGY', 'fifo'),
  autoComplete: getOptionalEnv('FULFILLMENT_AUTO_COMPLETE', 'false') === 'true',
});
