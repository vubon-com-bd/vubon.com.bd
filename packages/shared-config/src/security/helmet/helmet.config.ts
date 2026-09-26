/**
 * Helmet security headers configuration
 * @module shared-config/security/helmet
 */
import { getOptionalEnvBool } from '../../common/env/env.helper';
import { CSP_CONFIG } from './csp.config';
import { HSTS_CONFIG } from './hsts.config';

export const HELMET_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('HELMET_ENABLED', true),
  contentSecurityPolicy: CSP_CONFIG,
  hsts: HSTS_CONFIG,
  frameguard: Object.freeze({
    action: 'deny' as const,
  }),
  noSniff: true,
  xssFilter: true,
  referrerPolicy: Object.freeze({
    policy: 'strict-origin-when-cross-origin' as const,
  }),
  hidePoweredBy: true,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: Object.freeze({
    policy: 'same-origin' as const,
  }),
  crossOriginResourcePolicy: Object.freeze({
    policy: 'same-site' as const,
  }),
  dnsPrefetchControl: Object.freeze({
    allow: false,
  }),
  permittedCrossDomainPolicies: Object.freeze({
    permittedPolicies: 'none' as const,
  }),
  ieNoOpen: true,
  originAgentCluster: true,
});

export type HelmetConfig = typeof HELMET_CONFIG;
