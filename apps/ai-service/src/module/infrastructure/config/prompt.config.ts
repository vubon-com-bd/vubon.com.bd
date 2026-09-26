import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PROMPT_CONFIG = Object.freeze({
  maxTemplateLength: getOptionalEnvInt('PROMPT_MAX_TEMPLATE_LENGTH', 10000),
  maxVariables: getOptionalEnvInt('PROMPT_MAX_VARIABLES', 50),
  defaultRole: 'user',
  contentFilterEnabled: true,
} as const);
