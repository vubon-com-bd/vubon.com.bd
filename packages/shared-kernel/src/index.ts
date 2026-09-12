/**
 * Shared Kernel
 * শেয়ার্ড কার্নেল - Complete DDD building blocks with all layers
 */

// Domain Layer - re-export with namespace to avoid conflicts
export * from './domain';

// Application Layer
export * from './application';

// Infrastructure Layer
export * from './infrastructure';

// Interfaces Layer
export * from './interfaces';

// Modules Layer - skip conflicting exports
// Instead of export * from './modules', export specific modules
export { BaseModule, CqrsModule, EventBusModule, GuardsModule } from './modules';

export { HealthService, HealthController, HealthModule } from './modules/health';

export {
  BASE_CONSTANTS,
  CACHE_CONSTANTS,
  QUEUE_CONSTANTS,
} from './modules/shared-kernel/constants';

export { BASE_TOKENS } from './modules/shared-kernel/tokens';

export type {
  PrimitiveType,
  DeepPartial,
  Nullable,
  Optional,
  Paginated,
  SortOrder,
  SortOptions,
  FilterOperator,
  FilterCondition,
  Filter,
  ID,
  Timestamp,
  JSONValue,
  JSONObject,
  JSONArray,
  MaybePromise,
  Constructor,
} from './modules/shared-kernel/types';
