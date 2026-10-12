/**
 * Auth Command Handlers Barrel
 * @module identity-service/modules/auth/commands
 */
import {
  LoginHandler,
  RegisterHandler,
  RefreshTokenHandler,
  LogoutHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
  VerifyEmailHandler,
  ResendVerificationHandler,
  EnableMfaHandler,
  DisableMfaHandler,
  VerifyMfaHandler,
  SetupMfaHandler,
  VerifyBackupCodeHandler,
  GenerateRecoveryCodesHandler,
} from '../../../application/commands/auth/index.js';

export const AUTH_COMMAND_HANDLERS = [
  LoginHandler,
  RegisterHandler,
  RefreshTokenHandler,
  LogoutHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
  VerifyEmailHandler,
  ResendVerificationHandler,
  EnableMfaHandler,
  DisableMfaHandler,
  VerifyMfaHandler,
  SetupMfaHandler,
  VerifyBackupCodeHandler,
  GenerateRecoveryCodesHandler,
] as const;
