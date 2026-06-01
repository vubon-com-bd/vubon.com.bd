/**
 * User Commands Index - Barrel Export
 * 
 * @module application/commands/user
 * 
 * @description
 * Central export point for all user command handlers.
 */

export * from './update-profile.handler';
export * from './change-password.handler';
export * from './delete-account.handler';
export * from './update-email.handler';
export * from './update-phone.handler';
export * from './verify-phone.handler';

// Export command interfaces
export type {
  UpdateProfileCommand,
  UpdateProfileResult,
  ChangePasswordCommand,
  ChangePasswordResult,
  DeleteAccountCommand,
  DeleteAccountResult,
  UpdateEmailCommand,
  UpdateEmailResult,
  UpdatePhoneCommand,
  UpdatePhoneResult,
  VerifyPhoneCommand,
  VerifyPhoneResult,
} from './types';
