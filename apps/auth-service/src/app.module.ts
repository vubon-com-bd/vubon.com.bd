import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';
import { ServiceRegistryModule } from './module/modules/registry.module';
import { JwtMiddleware } from './module/interfaces/middlewares/jwt.middleware';

import {
  // ⚠️ Order matters — সব `users/*` sub-routes আগে
  UserProfileModule,
  UserSettingsModule,
  UserPreferencesModule,
  UserAddressModule,
  UserContactModule,
  UserVerificationModule,
  UserKycModule,
  UserActivityModule,
  UserLogModule,
  // তারপর main user module (এইটাই users/:id capture করবে)
  UserModule,
  // Auth modules
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
} from './module/modules';

@Module({
  imports: [
    KernelCommonModule,
    ServiceRegistryModule,
    UserProfileModule,
    UserSettingsModule,
    UserPreferencesModule,
    UserAddressModule,
    UserContactModule,
    UserVerificationModule,
    UserKycModule,
    UserActivityModule,
    UserLogModule,
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
