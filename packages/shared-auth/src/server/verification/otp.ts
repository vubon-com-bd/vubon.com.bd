import { generateNumericOtp } from '../../common/token/token.generator';
import { hashSha256 } from '@vubon/shared-utils/infrastructure/crypto';

export async function createOtp(digits = 6): Promise<{ code: string; hash: string }> {
  const code = generateNumericOtp(digits);
  const hash = await hashSha256(code);
  return { code, hash };
}

export async function verifyOtp(code: string, hash: string): Promise<boolean> {
  const computed = await hashSha256(code);
  if (computed.length !== hash.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) {
    diff |= computed.charCodeAt(i) ^ hash.charCodeAt(i);
  }
  return diff === 0;
}
