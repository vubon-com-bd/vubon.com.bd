import {
  EnableBiometricHandler,
  DisableBiometricHandler,
  VerifyBiometricHandler,
} from '../../../application/commands/auth/index.js';

export const BIOMETRIC_COMMAND_HANDLERS = [
  EnableBiometricHandler,
  DisableBiometricHandler,
  VerifyBiometricHandler,
] as const;
