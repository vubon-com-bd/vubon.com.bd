/**
 * Runtime environment snapshot
 * @module shared-config/common/runtime
 */
import { loadEnv } from '../env/env.loader';

function getGlobal(key: string): unknown {
  if (typeof globalThis === 'undefined') return undefined;
  return (globalThis as Record<string, unknown>)[key];
}

export const RUNTIME_CONFIG = Object.freeze({
  nodeEnv: loadEnv().NODE_ENV,
  isServer: typeof getGlobal('window') === 'undefined',
  isBrowser: typeof getGlobal('window') !== 'undefined',
  isNode:
    typeof process !== 'undefined' &&
    process.versions !== undefined &&
    process.versions.node !== undefined,
  isEdge: typeof getGlobal('EdgeRuntime') !== 'undefined',
  hasCrypto:
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.getRandomValues === 'function',
  hasCompressionStream: typeof CompressionStream !== 'undefined',
  hasDecompressionStream: typeof DecompressionStream !== 'undefined',
  hasIntl: typeof Intl !== 'undefined',
  hasFetch: typeof fetch === 'function',
} as const);

export type RuntimeConfig = typeof RUNTIME_CONFIG;
