export const cacheConfig = {
  ttl: {
    default: 300, // 5 minutes
    short: 60, // 1 minute
    medium: 600, // 10 minutes
    long: 3600, // 1 hour
    day: 86400, // 1 day
    week: 604800, // 1 week
  },
  keys: {
    user: 'user:',
    session: 'session:',
    product: 'product:',
    category: 'category:',
    vendor: 'vendor:',
    order: 'order:',
    payment: 'payment:',
    rateLimit: 'rateLimit:',
  },
  maxKeys: 10000,
  checkPeriod: 600,
};
