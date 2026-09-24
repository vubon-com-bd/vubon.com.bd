export const SENTIMENT_CONFIG = Object.freeze({
  enabled: true,
  analyzeOnEveryMessage: false,
  alertOnNegative: true,
  negativeThreshold: -0.5,
  positiveThreshold: 0.5,
} as const);
