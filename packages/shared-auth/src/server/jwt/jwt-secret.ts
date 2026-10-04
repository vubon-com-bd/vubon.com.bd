import { JWT_SECRET_CONFIG } from '@vubon/shared-config/security/jwt';

/**
 * Resolve JWT secret.
 * ⚠️ SERVER-ONLY. Never import this from client.
 */
export function getJwtSecret(): string {
  const secret = JWT_SECRET_CONFIG.secret;
  if (!secret || secret.length < JWT_SECRET_CONFIG.minSecretLength) {
    throw new Error(`JWT_SECRET must be at least ${JWT_SECRET_CONFIG.minSecretLength} chars`);
  }
  return secret;
}

export function getPreviousJwtSecret(): string | null {
  return JWT_SECRET_CONFIG.rotateEnabled && JWT_SECRET_CONFIG.previousSecret
    ? JWT_SECRET_CONFIG.previousSecret
    : null;
}
