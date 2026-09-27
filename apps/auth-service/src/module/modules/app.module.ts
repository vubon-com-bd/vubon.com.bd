/**
 * AppModule — Root module for auth-service
 * @module auth-service/modules
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.module';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.module';

import { AuthCommonModule } from './common/auth-common.module.js';

import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AuthSessionModule } from './auth-session/auth-session.module.js';
import { AuthTokenModule } from './auth-token/auth-token.module.js';
import { AuthMfaModule } from './auth-mfa/auth-mfa.module.js';
import { AuthRecoveryCodeModule } from './auth-recovery-code/auth-recovery-code.module.js';
import { AuthAccountLockModule } from './auth-account-lock/auth-account-lock.module.js';
import { AuthLoginAttemptModule } from './auth-login-attempt/auth-login-attempt.module.js';
import { AuthDeviceModule } from './auth-device/auth-device.module.js';
import { AuthSocialModule } from './auth-social/auth-social.module.js';
import { AuthOAuthModule } from './auth-oauth/auth-oauth.module.js';
import { AuthSsoModule } from './auth-sso/auth-sso.module.js';
import { Auth2FaModule } from './auth-2fa/auth-2fa.module.js';
import { AuthBiometricModule } from './auth-biometric/auth-biometric.module.js';
import { AuthPermissionModule } from './auth-permission/auth-permission.module.js';
import { AuthRoleModule } from './auth-role/auth-role.module.js';
import { AuthSettingsModule } from './auth-settings/auth-settings.module.js';
import { AuthPreferencesModule } from './auth-preferences/auth-preferences.module.js';

import { UserProfileModule } from './user-profile/user-profile.module.js';
import { UserSettingsModule } from './user-settings/user-settings.module.js';
import { UserPreferencesModule } from './user-preferences/user-preferences.module.js';
import { UserAddressModule } from './user-address/user-address.module.js';
import { UserContactModule } from './user-contact/user-contact.module.js';
import { UserVerificationModule } from './user-verification/user-verification.module.js';
import { UserKycModule } from './user-kyc/user-kyc.module.js';
import { UserActivityModule } from './user-activity/user-activity.module.js';
import { UserRolePermissionModule } from './user-role-permission/user-role-permission.module.js';

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
