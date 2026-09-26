/**
 * Argon2 password hashing configuration
 * @module shared-config/auth/password
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ARGON2_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ARGON2_ENABLED', false),
  type: getOptionalEnv('ARGON2_TYPE', 'argon2id'), // argon2i | argon2d | argon2id
  memoryCostKb: getOptionalEnvInt('ARGON2_MEMORY_COST_KB', 19456), // ~19 MiB
  timeCost: getOptionalEnvInt('ARGON2_TIME_COST', 2),
  parallelism: getOptionalEnvInt('ARGON2_PARALLELISM', 1),
  hashLength: getOptionalEnvInt('ARGON2_HASH_LENGTH', 32),
  saltBytes: getOptionalEnvInt('ARGON2_SALT_BYTES', 16),
});
