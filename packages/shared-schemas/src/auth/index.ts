/**
 * Auth schemas module exports
 * Central export point for all authentication-related validation schemas
 */

// Export register schemas
export {
  RegisterSchema,
  validateRegistration,
  safeValidateRegistration,
  type RegisterSchemaType,
  type ValidatedRegisterData,
} from './register.schema';

// Export login schemas
export {
  LoginSchema,
  PhoneLoginSchema,
  UsernameLoginSchema,
  RefreshTokenSchema,
  LogoutSchema,
  RevokeAllSessionsSchema,
  validateLogin,
  safeValidateLogin,
  validatePhoneLogin,
  safeValidatePhoneLogin,
  validateUsernameLogin,
  safeValidateUsernameLogin,
  validateRefreshToken,
  safeValidateRefreshToken,
  validateLogout,
  safeValidateLogout,
  validateRevokeAllSessions,
  safeValidateRevokeAllSessions,
  type LoginSchemaType,
  type PhoneLoginSchemaType,
  type UsernameLoginSchemaType,
  type RefreshTokenSchemaType,
  type LogoutSchemaType,
  type RevokeAllSessionsSchemaType,
} from './login.schema';
