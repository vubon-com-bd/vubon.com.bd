/**
 * Runtime resource info (CPU, memory, node version)
 * @module shared-config/common/runtime
 */

export const RUNTIME_ENV_CONFIG = Object.freeze({
  nodeVersion:
    typeof process !== 'undefined' && process.versions?.node ? process.versions.node : '',
  platform:
    typeof process !== 'undefined' && typeof process.platform === 'string' ? process.platform : '',
  arch: typeof process !== 'undefined' && typeof process.arch === 'string' ? process.arch : '',
  pid: typeof process !== 'undefined' && typeof process.pid === 'number' ? process.pid : 0,
  cpuCount: typeof process !== 'undefined' && typeof process.cpuUsage === 'function' ? 1 : 1,
  timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC',
} as const);

export type RuntimeEnvConfig = typeof RUNTIME_ENV_CONFIG;
