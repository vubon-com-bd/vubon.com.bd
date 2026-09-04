/**
 * Admin API Index
 * সকল Admin এন্ডপয়েন্ট এক্সপোর্ট
 */

// Base Admin
export * from './admin.endpoints';

// Role & Permission
export * from './admin-role.endpoints';
export * from './admin-permission.endpoints';

// Profile
export * from './admin-profile.endpoints';

// Activity & Log
export * from './admin-activity.endpoints';
export * from './admin-log.endpoints';

// Audit
export * from './admin-audit.endpoints';

// Session & Device
export * from './admin-session.endpoints';
export * from './admin-device.endpoints';

// Verification & 2FA
export * from './admin-verification.endpoints';
export * from './admin-2fa.endpoints';

// Biometric
export * from './admin-biometric.endpoints';

// Notification & Report
export * from './admin-notification.endpoints';
export * from './admin-report.endpoints';

// Team & Department
export * from './admin-team.endpoints';
export * from './admin-department.endpoints';
