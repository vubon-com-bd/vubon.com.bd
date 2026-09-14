// shared-schemas/user/index.ts
// User domain barrel export — FINAL

// Base schemas
export * from './user.schema';
export * from './user-status.schema';
export * from './user-type.schema';
export * from './user-role.schema';
export * from './user-permission.schema';
export * from './user-profile.schema';
export * from './user-settings.schema';
export * from './user-preferences.schema';
export * from './user-address.schema';
export * from './user-contact.schema';
export * from './user-verification.schema';
export * from './user-kyc.schema';
export * from './user-activity.schema';
export * from './user-log.schema';

// Request schemas
export * from './create-user.schema';
export * from './update-user.schema';
export * from './update-profile.schema';
export * from './change-password.schema';
export * from './add-address.schema';
export * from './update-address.schema';
export * from './add-contact.schema';
export * from './submit-kyc.schema';
export * from './update-preferences.schema';
export * from './update-settings.schema';

// Response schemas
export * from './user-response.schema';
export * from './profile-response.schema';
export * from './address-response.schema';
export * from './kyc-response.schema';
export * from './preferences-response.schema';
