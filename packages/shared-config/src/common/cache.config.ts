import { CACHE } from '@vubon/shared-constants/src/common/cache.constants';

export const cacheConfig = {
  ttl: {
    default: CACHE.SHORT_TTL,
    short: CACHE.SHORT_TTL,
    medium: CACHE.MEDIUM_TTL,
    long: CACHE.DEFAULT_TTL,
    day: CACHE.LONG_TTL,
    week: CACHE.EXTRA_LONG_TTL,
  },
  keys: CACHE.PREFIX,
  maxKeys: CACHE.MAX_ITEMS.LARGE,
  checkPeriod: 600,
} as const;
