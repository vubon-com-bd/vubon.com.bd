/**
 * Session & token rotation configuration
 * @module shared-config/auth/session
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SESSION_ROTATION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SESSION_ROTATION_ENABLED', true),
  rotateOnLogin: getOptionalEnvBool('SESSION_ROTATE_ON_LOGIN', true),
  rotateOnRefresh: getOptionalEnvBool('SESSION_ROTATE_ON_REFRESH', true),
  rotateOnRoleChange: getOptionalEnvBool('SESSION_ROTATE_ON_ROLE_CHANGE', true),
  rotateOnPasswordChange: getOptionalEnvBool('SESSION_ROTATE_ON_PASSWORD_CHANGE', true),
  rotationIntervalSeconds: getOptionalEnvInt('SESSION_ROTATION_INTERVAL_SECONDS', 900),
  reuseDetectionEnabled: getOptionalEnvBool('SESSION_REUSE_DETECTION', true),
});
