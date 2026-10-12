/**
 * InterfacesModule — aggregates all interface layer components
 * @module identity-service/interfaces
 *
 * Note: Controllers/resolvers are registered in feature modules,
 * NOT here. This module only exports shared infrastructure items
 * (mappers, validators, guards) so feature modules can use them.
 */
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  AuthControllerMapper,
  AuthSessionControllerMapper,
  AuthTokenControllerMapper,
  AuthMfaControllerMapper,
  AuthDeviceControllerMapper,
  AuthSocialControllerMapper,
  AuthSsoControllerMapper,
  AuthBiometricControllerMapper,
  AuthRecoveryCodeControllerMapper,
  AuthAccountLockControllerMapper,
  AuthLoginAttemptControllerMapper,
  AuthRoleControllerMapper,
  AuthPermissionControllerMapper,
  AuthSettingsControllerMapper,
  UserControllerMapper,
  UserProfileControllerMapper,
  UserAddressControllerMapper,
  UserKycControllerMapper,
} from './mappers/index.js';

import {
  MfaGuard,
  BiometricGuard,
  VerifiedGuard,
  DeviceGuard,
  AccountLockGuard,
} from './guards/index.js';

import {
  AuthCacheInterceptor,
  AuthTimeoutInterceptor,
  AuthLoggingInterceptor,
  TokenRefreshInterceptor,
} from './interceptors/index.js';

const MAPPERS = [
  AuthControllerMapper,
  AuthSessionControllerMapper,
  AuthTokenControllerMapper,
  AuthMfaControllerMapper,
  AuthDeviceControllerMapper,
  AuthSocialControllerMapper,
  AuthSsoControllerMapper,
  AuthBiometricControllerMapper,
  AuthRecoveryCodeControllerMapper,
  AuthAccountLockControllerMapper,
  AuthLoginAttemptControllerMapper,
  AuthRoleControllerMapper,
  AuthPermissionControllerMapper,
  AuthSettingsControllerMapper,
  UserControllerMapper,
  UserProfileControllerMapper,
  UserAddressControllerMapper,
  UserKycControllerMapper,
];

const GUARDS = [
  MfaGuard,
  BiometricGuard,
  VerifiedGuard,
  DeviceGuard,
  AccountLockGuard,
];

const INTERCEPTORS = [
  AuthCacheInterceptor,
  AuthTimeoutInterceptor,
  AuthLoggingInterceptor,
  TokenRefreshInterceptor,
];

@Global()
@Module({
  imports: [CqrsModule],
  providers: [...MAPPERS, ...GUARDS, ...INTERCEPTORS],
  exports: [...MAPPERS, ...GUARDS, ...INTERCEPTORS],
})
export class InterfacesModule {}
