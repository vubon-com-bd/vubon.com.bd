/**
 * User Request DTOs — Barrel
 * @module auth-service/application/dtos/requests/user
 */
// Core user
export * from './create-user.dto.js';
export * from './update-user.dto.js';
export * from './update-profile.dto.js';
export * from './update-settings.dto.js';
export * from './update-preferences.dto.js';
export * from './change-password.dto.js';
export * from './delete-user.dto.js';

// Address
export * from './add-address.dto.js';
export * from './update-address.dto.js';
export * from './delete-address.dto.js';

// Contact
export * from './add-contact.dto.js';
export * from './update-contact.dto.js';
export * from './delete-contact.dto.js';

// KYC
export * from './submit-kyc.dto.js';
export * from './verify-kyc.dto.js';
export * from './reject-kyc.dto.js';

// Role / permission
export * from './assign-role.dto.js';
export * from './revoke-role.dto.js';
export * from './assign-permission.dto.js';
export * from './revoke-permission.dto.js';

// Lifecycle
export * from './activate-user.dto.js';
export * from './deactivate-user.dto.js';
export * from './suspend-user.dto.js';
export * from './unsuspend-user.dto.js';

// Verification (admin)
export * from './verify-user-email.dto.js';
export * from './verify-user-phone.dto.js';
