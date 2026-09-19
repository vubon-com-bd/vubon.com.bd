/**
 * Recovery/backup code configuration
 * @module shared-config/auth/mfa
 *
 * Values আসে shared-constants/auth থেকে।
 */
import { AUTH_MFA } from '@vubon/shared-constants/auth';
import { getOptionalEnvBool } from '../../common/env/env.helper';

export const RECOVERY_CODE_CONFIG = Object.freeze({
  count: AUTH_MFA.BACKUP_CODES_COUNT,
  length: AUTH_MFA.BACKUP_CODE_LENGTH,
  format: 'alphanumeric',
  caseSensitive: false,
  hash: true,
  singleUse: true,
  regenerateOnUse: getOptionalEnvBool('RECOVERY_CODE_REGENERATE', true),
});
