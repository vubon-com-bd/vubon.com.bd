import type { VerifyToken } from '@vubon/shared-types/common/primitives';
import { generateOpaqueToken } from '../../common/token/token.generator';

export function generateVerificationToken(): {
  token: VerifyToken;
  expiresAt: string;
} {
  const token = generateOpaqueToken(32) as VerifyToken;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  return { token, expiresAt };
}
