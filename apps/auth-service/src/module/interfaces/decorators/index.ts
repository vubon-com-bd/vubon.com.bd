export { MfaRequired } from './mfa-required.decorator';
export { BiometricRequired } from './biometric-required.decorator';
export { VerifiedRequired } from './verified-required.decorator';

// Re-export kernel decorators for controller convenience
export {
  Public,
  Roles,
  Permissions,
  RateLimit,
  Owner,
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
