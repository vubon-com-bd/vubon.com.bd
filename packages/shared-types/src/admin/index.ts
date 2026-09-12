// Core admin
export * from './admin.types';

// Role & permission
export * from './admin-role.types';
export * from './admin-permission.types';

// Profile & settings
export * from './admin-profile.types';
export * from './admin-settings.types';
export * from './admin-preferences.types';

// Activity & logging
export * from './admin-activity.types';
export * from './admin-log.types';
export * from './admin-audit.types';

// Session & device
export * from './admin-session.types';
export * from './admin-device.types';

// Verification & security
export * from './admin-verification.types';
export * from './admin-2fa.types';
export * from './admin-biometric.types';

// Notifications
export * from './admin-notification.types';

// Reports & analytics
export * from './admin-report.types';
export * from './admin-analytics.types';

// Team & department
export * from './admin-team.types';
export * from './admin-department.types';

// ============================================================
// Public-safe DTOs (must come last for clarity)
// ============================================================
export type { AdminPublic } from './admin.types';
export type { AdminSessionPublic } from './admin-session.types';
export type { AdminVerificationPublic } from './admin-verification.types';
