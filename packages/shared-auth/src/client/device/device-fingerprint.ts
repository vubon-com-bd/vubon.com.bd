import { hashSha256 } from '@vubon/shared-utils/infrastructure/crypto';

/**
 * Build a lightweight device fingerprint from browser attributes.
 * ⚠️ Not cryptographic identity — UI + server-side hints only.
 */
export async function buildDeviceFingerprint(): Promise<string> {
  if (typeof navigator === 'undefined') {
    return 'server-side';
  }
  const parts = [
    navigator.userAgent,
    navigator.language,
    String(navigator.hardwareConcurrency ?? ''),
    String((navigator as { deviceMemory?: number }).deviceMemory ?? ''),
    String(screen?.width ?? ''),
    String(screen?.height ?? ''),
    String(new Date().getTimezoneOffset()),
  ];
  return hashSha256(parts.join('|'));
}
