/**
 * Shared (cross-platform) auth flows + RBAC matcher.
 * Layer: Cross-platform
 * Owner: Security Team
 *
 * Depends ONLY on `common`. No framework imports.
 */
export * from './errors';
export * from './rbac';
export * from './hooks';
export * from './session-flow';
