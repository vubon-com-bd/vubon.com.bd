/**
 * Identity Service — Root App Module
 * @module identity-service
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

// Common (kernel + infra globals)
import { AuthCommonModule } from './module/modules/common/index.js';

// Health
import { HealthModule } from './module/modules/health/index.js';

// Auth features
import { AuthModule } from './module/modules/auth/index.js';
import { UserModule } from './module/modules/user/index.js';
import { AuthDeviceModule } from './module/modules/auth-device/index.js';
import { AuthSocialModule } from './module/modules/auth-social/index.js';
import { AuthBiometricModule } from './module/modules/auth-biometric/index.js';
import { AuthRoleModule } from './module/modules/auth-role/index.js';
import { AuthAccountLockModule } from './module/modules/auth-account-lock/index.js';

// NEW User sub-features
import { UserProfileModule } from './module/modules/user-profile/index.js';
import { UserSettingsModule } from './module/modules/user-settings/index.js';
import { UserPreferencesModule } from './module/modules/user-preferences/index.js';
import { UserAddressModule } from './module/modules/user-address/index.js';
import { UserContactModule } from './module/modules/user-contact/index.js';
import { UserKycModule } from './module/modules/user-kyc/index.js';
import { UserActivityModule } from './module/modules/user-activity/index.js';
import { PublicProfileModule } from './module/modules/public-profile/index.js';

@Module({
  imports: [
    // Root config
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),

    // Common (globals)
    AuthCommonModule,

    // Health
    HealthModule,

    // Auth features
    AuthModule,
    UserModule,
    AuthDeviceModule,
    AuthSocialModule,
    AuthBiometricModule,
    AuthRoleModule,
    AuthAccountLockModule,

    // User sub-features
    UserProfileModule,
    UserSettingsModule,
    UserPreferencesModule,
    UserAddressModule,
    UserContactModule,
    UserKycModule,
    UserActivityModule,
    PublicProfileModule,
  ],
})
export class AppModule {}
