import { Module } from '@nestjs/common';
import { FeatureStoreService } from './feature-store.service';
import { RedisFeatureStoreProvider } from './providers/redis-feature-store.provider';
import { FeastProvider } from './providers/feast.provider';

@Module({
  providers: [FeatureStoreService, RedisFeatureStoreProvider, FeastProvider],
  exports: [FeatureStoreService],
})
export class FeatureStoreModule {}
