/**
 * Content Security Policy configuration
 * @module shared-config/security/helmet
 *
 * ⚠️ 'unsafe-inline' and 'unsafe-eval' FORBIDDEN in script-src.
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

const isDev = getOptionalEnv('NODE_ENV', 'development') === 'development';

export const CSP_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CSP_ENABLED', true),
  reportOnly: getOptionalEnvBool('CSP_REPORT_ONLY', isDev),
  reportUri: getOptionalEnv('CSP_REPORT_URI', ''),
  directives: Object.freeze({
    defaultSrc: Object.freeze(["'self'"] as const),
    scriptSrc: Object.freeze([
      "'self'",
      // ⚠️ NEVER add 'unsafe-inline' or 'unsafe-eval' in production
    ] as const),
    styleSrc: Object.freeze(["'self'", "'unsafe-inline'"] as const), // Tailwind/CSS-in-JS needs inline styles
    imgSrc: Object.freeze(["'self'", 'data:', 'https:'] as const),
    fontSrc: Object.freeze(["'self'", 'data:'] as const),
    connectSrc: Object.freeze(["'self'"] as const),
    mediaSrc: Object.freeze(["'self'"] as const),
    objectSrc: Object.freeze(["'none'"] as const),
    frameAncestors: Object.freeze(["'none'"] as const),
    baseUri: Object.freeze(["'self'"] as const),
    formAction: Object.freeze(["'self'"] as const),
    frameSrc: Object.freeze(["'none'"] as const),
    workerSrc: Object.freeze(["'self'", 'blob:'] as const),
    manifestSrc: Object.freeze(["'self'"] as const),
    upgradeInsecureRequests: isDev ? Object.freeze([] as const) : Object.freeze([] as const),
  }),
});

export type CspConfig = typeof CSP_CONFIG;
