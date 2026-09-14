/**
 * SQL injection protection configuration
 * @module shared-config/security/sql-injection
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SQL_INJECTION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SQL_INJECTION_PROTECTION_ENABLED', true),
  detectPatterns: getOptionalEnvBool('SQL_DETECT_PATTERNS', true),
  logSuspiciousQueries: getOptionalEnvBool('SQL_LOG_SUSPICIOUS', true),
  blockOnDetection: getOptionalEnvBool('SQL_BLOCK_ON_DETECTION', true),
  parameterizedQueriesOnly: getOptionalEnvBool('SQL_PARAMETERIZED_ONLY', true),
  forbiddenPatterns: Object.freeze([
    'DROP TABLE',
    'DROP DATABASE',
    'TRUNCATE TABLE',
    'INFORMATION_SCHEMA',
    'xp_cmdshell',
    'UNION SELECT',
    '--',
    '/*',
  ] as const),
  maxQueryLength: getOptionalEnvInt('SQL_MAX_QUERY_LENGTH', 100_000),
  timeoutMs: getOptionalEnvInt('SQL_QUERY_TIMEOUT_MS', 30_000),
});
