/**
 * AI Service — Infrastructure Layer Barrel
 *
 * Adapters, persistence, external integrations.
 */

export { InfrastructureModule } from './infrastructure.module';

// Config
export * from './config';

// Persistence
export * from './persistence/prisma/repositories';
export * from './persistence/cache/repositories';
export { PrismaService } from './persistence/prisma/prisma.service';
export { PrismaModule } from './persistence/prisma/prisma.module';

// Vector DB
export * from './vector-db';

// ML Providers
export * from './ml-providers';

// Services
export * from './services';

// Queues
export * from './queues';

// Workers
export * from './workers';

// External — selective to avoid collision with services/internal
export {
  StorageService,
  type StorageUploadResult,
} from './external/storage/storage.service';
export { ModelArtifactStorageService } from './external/storage/model-artifact-storage.service';
export { StorageModule } from './external/storage/storage.module';

export {
  FeatureStoreService as ExternalFeatureStoreService,
} from './external/feature-store/feature-store.service';
export { RedisFeatureStoreProvider } from './external/feature-store/providers/redis-feature-store.provider';
export { FeastProvider } from './external/feature-store/providers/feast.provider';
export { FeatureStoreModule } from './external/feature-store/feature-store.module';

export { MlflowService } from './external/ml-ops/mlflow.service';
export { MlflowModule } from './external/ml-ops/mlflow.module';
