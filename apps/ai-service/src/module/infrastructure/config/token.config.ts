import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const TOKEN_CONFIG = Object.freeze({
  maxTokensDefault: getOptionalEnvInt('TOKEN_MAX_DEFAULT', 128000),
  charsPerTokenEn: getOptionalEnvInt('TOKEN_CHARS_PER_TOKEN_EN', 4),
  charsPerTokenBn: 1.5,
  costPerMillionTokens: 0.02,
  contextWindowDefault: getOptionalEnvInt('TOKEN_CONTEXT_WINDOW', 128000),
} as const);
