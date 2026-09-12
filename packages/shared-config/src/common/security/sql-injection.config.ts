export const sqlInjectionConfig = {
  enabled: true,
  logSuspiciousQueries: true,
  blockSuspiciousQueries: true,
  suspiciousPatterns: [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|DECLARE)\b)/i,
    /(--)/,
    /(';)/,
    /(' OR '1'='1)/,
  ],
};
