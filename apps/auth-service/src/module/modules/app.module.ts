/**
 * AppModule — Root module for auth-service
 * @module auth-service/modules
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.module';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.module';

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

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    RedisModule,

    AuthCommonModule,

    // User base first
    UserModule,

    // Auth core
    AuthSessionModule,
    AuthTokenModule,
    AuthModule,
    AuthMfaModule,

    // Auth extended
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

    // User sub-modules
    UserProfileModule,
    UserSettingsModule,
    UserPreferencesModule,
    UserAddressModule,
    UserContactModule,
    UserVerificationModule,
    UserKycModule,
    UserActivityModule,
    UserRolePermissionModule,
  ],
})
export class AppModule {}
