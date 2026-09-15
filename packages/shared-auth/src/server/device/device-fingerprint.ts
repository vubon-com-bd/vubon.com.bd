import { createHash } from 'node:crypto';

/** Server-side device fingerprint hash. */
export function fingerprintDevice(parts: {
  userAgent?: string;
  ipAddress?: string;
  acceptLanguage?: string;
}): string {
  const input = [parts.userAgent ?? '', parts.ipAddress ?? '', parts.acceptLanguage ?? ''].join(
    '|'
  );
  return createHash('sha256').update(input).digest('hex');
}
