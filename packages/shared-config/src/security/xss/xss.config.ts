/**
 * XSS protection configuration
 * @module shared-config/security/xss
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const XSS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('XSS_PROTECTION_ENABLED', true),
  sanitizeBody: getOptionalEnvBool('XSS_SANITIZE_BODY', true),
  sanitizeQuery: getOptionalEnvBool('XSS_SANITIZE_QUERY', true),
  sanitizeParams: getOptionalEnvBool('XSS_SANITIZE_PARAMS', true),
  sanitizeHeaders: getOptionalEnvBool('XSS_SANITIZE_HEADERS', false),
  maxInputDepth: getOptionalEnvInt('XSS_MAX_DEPTH', 10),
  maxInputLength: getOptionalEnvInt('XSS_MAX_LENGTH', 1_000_000),
  allowedTags: Object.freeze([] as const), // No tags allowed by default
  allowedAttributes: Object.freeze([] as const),
  stripScripts: true,
  stripStyles: false,
  escapeHtml: true,
  blockOnDetection: getOptionalEnvBool('XSS_BLOCK_ON_DETECTION', false),
});
