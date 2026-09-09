export const rateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  max: 100, // requests per window
  message: 'Too many requests from this IP',
  statusCode: 429,
};

export const rateLimitConfigs = {
  auth: { windowMs: 15 * 60 * 1000, max: 5 },
  api: { windowMs: 60 * 1000, max: 100 },
  public: { windowMs: 60 * 1000, max: 1000 },
  admin: { windowMs: 60 * 1000, max: 50 },
};
