/**
 * Runtime feature flags based on environment (not business features)
 * @module shared-config/common/runtime
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../env/env.helper';

export const RUNTIME_FLAGS_CONFIG = Object.freeze({
  ssrEnabled: getOptionalEnvBool('SSR_ENABLED', false),
  clusterEnabled: getOptionalEnvBool('CLUSTER_ENABLED', false),
  clusterWorkers: getOptionalEnvInt('CLUSTER_WORKERS', 0),
  workerThreadsEnabled: getOptionalEnvBool('WORKER_THREADS_ENABLED', false),
  gracefulShutdownEnabled: getOptionalEnvBool('GRACEFUL_SHUTDOWN_ENABLED', true),
  gracefulShutdownTimeoutMs: getOptionalEnvInt('GRACEFUL_SHUTDOWN_TIMEOUT_MS', 10_000),
  strictEnv: getOptionalEnvBool('STRICT_ENV', true),
} as const);

export type RuntimeFlagsConfig = typeof RUNTIME_FLAGS_CONFIG;
