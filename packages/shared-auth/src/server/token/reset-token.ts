import type { ResetToken } from '@vubon/shared-types/common/primitives';
import { generateOpaqueToken } from '../../common/token/token.generator';

/** Password-reset tokens are opaque, single-use, short-lived. */
export function generateResetToken(): {
  token: ResetToken;
  expiresAt: string;
} {
  const token = generateOpaqueToken(32) as ResetToken;
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  return { token, expiresAt };
}
