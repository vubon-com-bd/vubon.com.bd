import { authAccountLockApi } from './auth-account-lock';
import { authBiometricApi } from './auth-biometric';
import { authDeviceApi } from './auth-device';
import { authLoginAttemptApi } from './auth-login-attempt';
import { authMfaApi } from './auth-mfa';
import { authPermissionApi } from './auth-permission';
import { authRecoveryCodeApi } from './auth-recovery-code';
import { authRoleApi } from './auth-role';
import { authSessionApi } from './auth-session';
import { authSettingsApi } from './auth-settings';
import { authSocialApi } from './auth-social';
import { authSsoApi } from './auth-sso';
import { authTokenApi } from './auth-token';
import { authApi } from './auth';
import { healthApi } from './health';
import { publicProfileApi } from './public-profile';
import { userActivityApi } from './user-activity';
import { userAddressApi } from './user-address';
import { userContactApi } from './user-contact';
import { userKycApi } from './user-kyc';
import { userPreferencesApi } from './user-preferences';
import { userProfileApi } from './user-profile';
import { userSettingsApi } from './user-settings';
import { userApi } from './user';

export const apiSpec = {
  authAccountLock: authAccountLockApi,
  authBiometric: authBiometricApi,
  authDevice: authDeviceApi,
  authLoginAttempt: authLoginAttemptApi,
  authMfa: authMfaApi,
  authPermission: authPermissionApi,
  authRecoveryCode: authRecoveryCodeApi,
  authRole: authRoleApi,
  authSession: authSessionApi,
  authSettings: authSettingsApi,
  authSocial: authSocialApi,
  authSso: authSsoApi,
  authToken: authTokenApi,
  auth: authApi,
  health: healthApi,
  publicProfile: publicProfileApi,
  userActivity: userActivityApi,
  userAddress: userAddressApi,
  userContact: userContactApi,
  userKyc: userKycApi,
  userPreferences: userPreferencesApi,
  userProfile: userProfileApi,
  userSettings: userSettingsApi,
  user: userApi,
};
