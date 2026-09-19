/**
 * Domain Errors — Barrel Export
 */

export {
  UserNotFoundError,
  UserExistsError,
  InvalidEmailError,
  InvalidNameError,
  InvalidPhoneError,
  InvalidStatusError,
  InvalidTypeError,
} from './user.errors';

export {
  InvalidPasswordError,
  WeakPasswordError,
} from './password.errors';

export {
  SessionExpiredError,
  SessionRevokedError,
} from './session.errors';

export {
  TokenExpiredError,
  InvalidTokenError,
} from './token.errors';

export {
  MfaRequiredError,
  MfaInvalidError,
} from './mfa.errors';

export {
  AccountLockedError,
  TooManyAttemptsError,
} from './account-lock.errors';

export {
  UntrustedDeviceError,
} from './device.errors';

export {
  SocialAlreadyLinkedError,
} from './social.errors';

export {
  OAuthFailedError,
} from './oauth.errors';

export {
  SsoFailedError,
} from './sso.errors';

export {
  BiometricFailedError,
} from './biometric.errors';

export {
  VerificationExpiredError,
} from './verification.errors';

export {
  PermissionDeniedError,
  InvalidRoleError,
} from './permission.errors';
