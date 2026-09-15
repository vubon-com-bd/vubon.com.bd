import { generateOpaqueToken } from '../../common/token/token.generator';

/** Generate N single-use recovery codes (shown ONCE to user). */
export function generateRecoveryCodes(count = 8): readonly string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const raw = generateOpaqueToken(10);
    // Format: xxxx-xxxx-xxxx
    out.push(`${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`);
  }
  return out;
}

/** Constant-time-ish check: recovery codes are single-use. */
export function findRecoveryCodeIndex(codes: readonly string[], provided: string): number {
  const target = provided.trim().toLowerCase();
  for (let i = 0; i < codes.length; i++) {
    if ((codes[i] ?? '').toLowerCase() === target) return i;
  }
  return -1;
}
