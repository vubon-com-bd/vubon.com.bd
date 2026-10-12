/**
 * Redis Repositories Module
 * @module identity-service/infrastructure/persistence/cache
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import {
  AuthCacheRepository,
  SessionCacheRepository,
  TokenCacheRepository,
  MfaCacheRepository,
  AccountLockCacheRepository,
  IdempotencyCacheRepository,
  UserCacheRepository,
  UserProfileCacheRepository,
  UserPreferencesCacheRepository,
  UserKycCacheRepository,
} from './repositories/index.js';

const REPOSITORIES = [
  AuthCacheRepository,
  SessionCacheRepository,
  TokenCacheRepository,
  MfaCacheRepository,
  AccountLockCacheRepository,
  IdempotencyCacheRepository,
  UserCacheRepository,
  UserProfileCacheRepository,
  UserPreferencesCacheRepository,
  UserKycCacheRepository,
];

@Module({
  imports: [RedisModule],
  providers: REPOSITORIES,
  exports: REPOSITORIES,
})
export class RedisRepositoriesModule {}
