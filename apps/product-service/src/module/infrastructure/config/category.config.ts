import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const CATEGORY_CONFIG = Object.freeze({
  maxDepth: getOptionalEnvInt('CATEGORY_MAX_DEPTH', 5),
  autoGenerateSlug: getOptionalEnvBool('CATEGORY_AUTO_GENERATE_SLUG', true),
  allowRootless: getOptionalEnvBool('CATEGORY_ALLOW_ROOTLESS', true),
  maxNameLength: 100,
} as const);
