export {
  LoginFailedError,
  RegisterFailedError,
  AuthenticationRequiredError,
} from './auth.errors';

export {
  UserOperationFailedError,
  UserValidationFailedError,
} from './user.errors';

export {
  SessionNotFoundError,
  SessionOperationFailedError,
} from './session.errors';

export {
  TokenNotFoundError,
  TokenOperationFailedError,
} from './token.errors';

export {
  MfaSetupFailedError,
  MfaVerificationFailedError,
} from './mfa.errors';

export {
  SocialLoginFailedError,
  SocialLinkFailedError,
} from './social.errors';

export { SsoLoginFailedError } from './sso.errors';

export { BiometricOperationFailedError } from './biometric.errors';

export {
  AuthorizationFailedError,
  RoleOperationFailedError,
} from './permission.errors';
