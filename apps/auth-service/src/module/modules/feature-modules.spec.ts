/**
 * Feature Modules — Structural Tests
 * @module auth-service/modules
 */
import 'reflect-metadata';

import { AuthCommonModule } from './common/auth-common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthSessionModule } from './auth-session/auth-session.module';
import { AuthTokenModule } from './auth-token/auth-token.module';
import { AuthMfaModule } from './auth-mfa/auth-mfa.module';
import { AuthRecoveryCodeModule } from './auth-recovery-code/auth-recovery-code.module';
import { AuthAccountLockModule } from './auth-account-lock/auth-account-lock.module';
import { AuthLoginAttemptModule } from './auth-login-attempt/auth-login-attempt.module';
import { AuthDeviceModule } from './auth-device/auth-device.module';
import { AuthSocialModule } from './auth-social/auth-social.module';
import { AuthOAuthModule } from './auth-oauth/auth-oauth.module';
import { AuthSsoModule } from './auth-sso/auth-sso.module';
import { Auth2FaModule } from './auth-2fa/auth-2fa.module';
import { AuthBiometricModule } from './auth-biometric/auth-biometric.module';
import { AuthPermissionModule } from './auth-permission/auth-permission.module';
import { AuthRoleModule } from './auth-role/auth-role.module';
import { AuthSettingsModule } from './auth-settings/auth-settings.module';
import { AuthPreferencesModule } from './auth-preferences/auth-preferences.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { UserAddressModule } from './user-address/user-address.module';
import { UserContactModule } from './user-contact/user-contact.module';
import { UserVerificationModule } from './user-verification/user-verification.module';
import { UserKycModule } from './user-kyc/user-kyc.module';
import { UserActivityModule } from './user-activity/user-activity.module';
import { UserRolePermissionModule } from './user-role-permission/user-role-permission.module';

const MODULES: Record<string, unknown> = {
  AuthCommonModule,
  UserModule,
  AuthModule,
  AuthSessionModule,
  AuthTokenModule,
  AuthMfaModule,
  AuthRecoveryCodeModule,
  AuthAccountLockModule,
  AuthLoginAttemptModule,
  AuthDeviceModule,
  AuthSocialModule,
  AuthOAuthModule,
  AuthSsoModule,
  Auth2FaModule,
  AuthBiometricModule,
  AuthPermissionModule,
  AuthRoleModule,
  AuthSettingsModule,
  AuthPreferencesModule,
  UserProfileModule,
  UserSettingsModule,
  UserPreferencesModule,
  UserAddressModule,
  UserContactModule,
  UserVerificationModule,
  UserKycModule,
  UserActivityModule,
  UserRolePermissionModule,
};

describe('Feature Modules — Structural', () => {
  it('should have 28 feature modules (including AuthCommon)', () => {
    expect(Object.keys(MODULES).length).toBe(28);
  });

  describe('Every module is a valid class', () => {
    Object.entries(MODULES).forEach(([name, ModClass]) => {
      it(`${name} should be a class`, () => {
        expect(typeof ModClass).toBe('function');
        expect((ModClass as { name: string }).name).toBe(name);
      });
    });
  });

  describe('Critical modules exist', () => {
    it('UserModule defined', () => expect(UserModule).toBeDefined());
    it('AuthModule defined', () => expect(AuthModule).toBeDefined());
    it('AuthCommonModule defined', () => expect(AuthCommonModule).toBeDefined());
    it('UserRolePermissionModule defined', () => {
      expect(UserRolePermissionModule).toBeDefined();
    });
  });
});
