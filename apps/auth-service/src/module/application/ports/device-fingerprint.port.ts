/**
 * Device Fingerprint Port
 * Application-layer contract for device fingerprint computation.
 * Implementation lives in infrastructure layer (crypto hash).
 */
export interface DeviceFingerprintInput {
  readonly ip: string;
  readonly userAgent: string;
}

export interface DeviceFingerprintPort {
  compute(input: DeviceFingerprintInput): string;
}
