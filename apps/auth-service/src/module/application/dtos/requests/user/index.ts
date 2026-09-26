/**
 * User Request DTOs — Barrel
 * @module auth-service/application/dtos/requests/user
 */
// Core user
export * from './create-user.dto';
export * from './update-user.dto';
export * from './update-profile.dto';
export * from './update-settings.dto';
export * from './update-preferences.dto';
export * from './change-password.dto';
export * from './delete-user.dto';

// Address
export * from './add-address.dto';
export * from './update-address.dto';
export * from './delete-address.dto';

// Contact
export * from './add-contact.dto';
export * from './update-contact.dto';
export * from './delete-contact.dto';

// KYC
export * from './submit-kyc.dto';
export * from './verify-kyc.dto';
export * from './reject-kyc.dto';

// Role / permission
export * from './assign-role.dto';
export * from './revoke-role.dto';
export * from './assign-permission.dto';
export * from './revoke-permission.dto';

// Lifecycle
export * from './activate-user.dto';
export * from './deactivate-user.dto';
export * from './suspend-user.dto';
export * from './unsuspend-user.dto';

// Verification (admin)
export * from './verify-user-email.dto';
export * from './verify-user-phone.dto';
