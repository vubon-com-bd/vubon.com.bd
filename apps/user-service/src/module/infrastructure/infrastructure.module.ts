import { Module } from '@nestjs/common';

import { PrismaModule } from './persistence/prisma/prisma.module';

import {
  UserPrismaRepository,
  UserProfilePrismaRepository,
  UserSettingsPrismaRepository,
  UserPreferencesPrismaRepository,
  UserAddressPrismaRepository,
  UserContactPrismaRepository,
  UserKycPrismaRepository,
  UserActivityPrismaRepository,
} from './persistence/prisma/repositories';

import {
  UserCacheRepository,
  UserProfileCacheRepository,
  UserPreferencesCacheRepository,
  UserKycCacheRepository,
} from './persistence/cache/repositories';

import {
  ProfileCompletionCalculatorService,
  AvatarProcessorService,
  KycDocumentValidatorService,
  UserTierEvaluatorService,
  ActivityRecorderService,
} from './services/internal';

import {
  EmailService,
  SmsService,
  PushService,
  StorageService,
} from './services/external';

import {
  UserQueue,
  ProfileQueue,
  KycQueue,
  NotificationQueue,
  AnalyticsQueue,
} from './queues';

import {
  UserSyncWorker,
  ProfileCompletionWorker,
  KycExpiryWorker,
  ActivityCleanupWorker,
  AnalyticsProcessorWorker,
  NotificationDispatcherWorker,
} from './workers';

const REPOSITORIES = [
  UserPrismaRepository,
  UserProfilePrismaRepository,
  UserSettingsPrismaRepository,
  UserPreferencesPrismaRepository,
  UserAddressPrismaRepository,
  UserContactPrismaRepository,
  UserKycPrismaRepository,
  UserActivityPrismaRepository,
];

const CACHE_REPOSITORIES = [
  UserCacheRepository,
  UserProfileCacheRepository,
  UserPreferencesCacheRepository,
  UserKycCacheRepository,
];

const INTERNAL_SERVICES = [
  ProfileCompletionCalculatorService,
  AvatarProcessorService,
  KycDocumentValidatorService,
  UserTierEvaluatorService,
  ActivityRecorderService,
];

const EXTERNAL_SERVICES = [EmailService, SmsService, PushService, StorageService];

const QUEUES = [UserQueue, ProfileQueue, KycQueue, NotificationQueue, AnalyticsQueue];

const WORKERS = [
  UserSyncWorker,
  ProfileCompletionWorker,
  KycExpiryWorker,
  ActivityCleanupWorker,
  AnalyticsProcessorWorker,
  NotificationDispatcherWorker,
];

@Module({
  imports: [PrismaModule],
  providers: [
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
    ...WORKERS,
  ],
  exports: [
    PrismaModule,
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
  ],
})
export class InfrastructureModule {}
