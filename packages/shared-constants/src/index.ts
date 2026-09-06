/**
 * Shared Constants Main Index
 * @module shared-constants
 */

// Export common constants
export * from './common/index';

// Export auth constants
export * from './auth/index';

// Export user constants
export * from './user/index';

// Export admin constants (last to avoid conflicts)
// Note: ADMIN_ROLE and ADMIN_PERMISSION are exported with unique names
export * from './admin/index';
