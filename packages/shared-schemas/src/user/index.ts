// shared-schemas/user/index.ts
// User domain barrel export — FINAL

// Base schemas
export * from './user.schema.js';
export * from './user-status.schema.js';
export * from './user-type.schema.js';
export * from './user-role.schema.js';
export * from './user-permission.schema.js';
export * from './user-profile.schema.js';
export * from './user-settings.schema.js';
export * from './user-preferences.schema.js';
export * from './user-address.schema.js';
export * from './user-contact.schema.js';
export * from './user-verification.schema.js';
export * from './user-kyc.schema.js';
export * from './user-activity.schema.js';
export * from './user-log.schema.js';

// Request schemas
export * from './create-user.schema.js';
export * from './update-user.schema.js';
export * from './update-profile.schema.js';
export * from './change-password.schema.js';
export * from './add-address.schema.js';
export * from './update-address.schema.js';
export * from './add-contact.schema.js';
export * from './submit-kyc.schema.js';
export * from './update-preferences.schema.js';
export * from './update-settings.schema.js';

// Response schemas
export * from './user-response.schema.js';
export * from './profile-response.schema.js';
export * from './address-response.schema.js';
export * from './kyc-response.schema.js';
export * from './preferences-response.schema.js';
