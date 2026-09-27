/**
 * AppModule — Root module for user-service
 *
 * RolesGuard এবং PermissionsGuard — এই দুইটা guard kernel এর নিজস্ব
 * সংস্করণে Reflector inject fail করে (pnpm peer-dep mismatch)।
 * তাই user-service এর local version ব্যবহার করা হয়।
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

// Kernel modules (safe ones only)
import {
  KernelConfigModule,
  KernelEventBusModule,
} from '@vubon/shared-kernel/modules';

// Kernel guards — no Reflector dependency
import {
  JwtAuthGuard,
  PublicGuard,
  OwnerGuard,
  RateLimitGuard,
  CorrelationIdInterceptor,
  LoggingInterceptor,
  TimeoutInterceptor,
  AllExceptionsFilter,
  ValidationExceptionFilter,
  HttpExceptionFilter,
  DomainExceptionFilter,
} from '@vubon/shared-kernel/interfaces';

// LOCAL guards — with Reflector
import { RolesGuard } from '@interfaces/guards/roles.guard';
import { PermissionsGuard } from '@interfaces/guards/permissions.guard';

// Infrastructure
import { PrismaModule } from '@infrastructure/persistence/prisma/prisma.module';
import { RedisModule } from '@infrastructure/persistence/cache/redis.module';
import { UserEmailModule } from '@infrastructure/external/email/email.module';
import { UserSmsModule } from '@infrastructure/external/sms/sms.module';
import { UserPushModule } from '@infrastructure/external/push/push.module';
import { UserStorageModule } from '@infrastructure/external/storage/storage.module';

// Feature modules
import { CommonModule } from './common/common.module.js';
import { UserModule } from './user/user.module.js';
import { UserProfileModule } from './user-profile/user-profile.module.js';
import { UserSettingsModule } from './user-settings/user-settings.module.js';
import { UserPreferencesModule } from './user-preferences/user-preferences.module.js';
import { UserAddressModule } from './user-address/user-address.module.js';
import { UserContactModule } from './user-contact/user-contact.module.js';
import { UserKycModule } from './user-kyc/user-kyc.module.js';
import { UserActivityModule } from './user-activity/user-activity.module.js';
import { PublicProfileModule } from './public-profile/public-profile.module.js';

@Module({
  imports: [
    CqrsModule,
    KernelConfigModule,
    KernelEventBusModule,
    PrismaModule,
    RedisModule,
    UserEmailModule,
    UserSmsModule,
    UserPushModule,
    UserStorageModule,
    CommonModule,
    UserModule,
    UserProfileModule,
    UserSettingsModule,
    UserPreferencesModule,
    UserAddressModule,
    UserContactModule,
    UserKycModule,
    UserActivityModule,
    PublicProfileModule,
  ],
  providers: [
    // Global Guards
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },           // ← LOCAL
    { provide: APP_GUARD, useClass: PermissionsGuard },     // ← LOCAL
    { provide: APP_GUARD, useClass: OwnerGuard },
    { provide: APP_GUARD, useClass: RateLimitGuard },
    { provide: APP_GUARD, useClass: PublicGuard },

    // Global Interceptors
    { provide: APP_INTERCEPTOR, useClass: CorrelationIdInterceptor },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },

    // Global Filters
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: DomainExceptionFilter },
  ],
})
export class AppModule {}
