/**
 * Fingerprint Utilities - Device fingerprint hashing
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-utils/src/device/fingerprint.util
 * 
 * RULES:
 * ✅ ONLY fingerprint hashing and comparison - NO business logic
 * ✅ NO tracking services, analytics sending
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import crypto from 'crypto';

// ==================== Constants (Enterprise grade) ====================

export const FINGERPRINT_HASH_ALGORITHM = 'sha256';
export const FINGERPRINT_SEPARATOR = '|';
export const DEFAULT_FINGERPRINT_VERSION = 1;

// Browser fingerprint components (passive collection)
const BROWSER_COMPONENTS = [
  'userAgent',
  'acceptLanguage',
  'acceptEncoding',
  'secChUa',
  'secChUaPlatform',
  'secChUaMobile',
  'platform',
  'timezone',
  'screenResolution',
  'colorDepth',
  'deviceMemory',
  'hardwareConcurrency',
] as const;

// ==================== Private Helpers ====================

/**
 * Validate fingerprint components
 */
const validateComponents = (components: string[]): string[] => {
  if (!Array.isArray(components) || components.length === 0) {
    throw new Error('Fingerprint components must be a non-empty array');
  }
  return components.map(comp => (typeof comp === 'string' ? comp : String(comp)));
};

/**
 * Normalize component value for consistency
 */
const normalizeComponent = (value: string): string => {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
};

// ==================== Fingerprint Generation ====================

/**
 * Generate deterministic device fingerprint from components
 * Uses SHA-256 hashing for consistent, irreversible fingerprints
 * 
 * @param components - Array of device attribute strings
 * @returns Hashed fingerprint (hex string)
 * 
 * @example
 * generateFingerprint(['Chrome 120', 'Windows', 'en-US'])
 * // Returns: "a1b2c3d4e5f6..."
 */
export const generateFingerprint = (components: string[]): string => {
  const validComponents = validateComponents(components);
  const normalizedComponents = validComponents.map(normalizeComponent);
  const fingerprintString = normalizedComponents.join(FINGERPRINT_SEPARATOR);
  
  return crypto
    .createHash(FINGERPRINT_HASH_ALGORITHM)
    .update(fingerprintString)
    .digest('hex');
};

/**
 * Generate fingerprint from HTTP headers (server-side)
 * 
 * @param headers - HTTP headers object
 * @returns Hashed fingerprint
 */
export const generateFingerprintFromHeaders = (headers: {
  userAgent?: string;
  acceptLanguage?: string;
  acceptEncoding?: string;
  secChUa?: string;
  secChUaPlatform?: string;
  secChUaMobile?: string;
}): string => {
  const components = [
    headers.userAgent || 'unknown',
    headers.acceptLanguage || 'unknown',
    headers.acceptEncoding || 'unknown',
    headers.secChUa || 'unknown',
    headers.secChUaPlatform || 'unknown',
    headers.secChUaMobile || 'unknown',
  ];
  
  return generateFingerprint(components);
};

/**
 * Generate fingerprint from browser client data (client-side)
 * Use this on the frontend with navigator/browser APIs
 * 
 * @param components - Browser/device components
 * @returns Hashed fingerprint
 */
export const generateFingerprintFromClient = (components: {
  userAgent: string;
  language: string;
  platform: string;
  screenResolution?: string;
  colorDepth?: number;
  timezone?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}): string => {
  const fingerprintComponents = [
    components.userAgent,
    components.language,
    components.platform,
    components.screenResolution || 'unknown',
    components.colorDepth?.toString() || 'unknown',
    components.timezone || 'unknown',
    components.deviceMemory?.toString() || 'unknown',
    components.hardwareConcurrency?.toString() || 'unknown',
  ];
  
  return generateFingerprint(fingerprintComponents);
};

/**
 * Normalize fingerprint components for consistent ordering
 * 
 * @param components - Record of key-value pairs
 * @returns Sorted and normalized array of components
 */
export const normalizeFingerprintComponents = (
  components: Record<string, string>
): string[] => {
  return Object.keys(components)
    .sort()
    .map((key) => `${key}:${normalizeComponent(components[key])}`);
};

/**
 * Generate fingerprint with versioning (for future algorithm changes)
 * 
 * @param components - Array of device attributes
 * @param version - Fingerprint version (default: 1)
 * @returns Versioned hashed fingerprint
 */
export const generateVersionedFingerprint = (
  components: string[],
  version: number = DEFAULT_FINGERPRINT_VERSION
): string => {
  const validComponents = validateComponents(components);
  const versionedString = `v${version}${FINGERPRINT_SEPARATOR}${validComponents.join(FINGERPRINT_SEPARATOR)}`;
  
  return crypto
    .createHash(FINGERPRINT_HASH_ALGORITHM)
    .update(versionedString)
    .digest('hex');
};

/**
 * Generate a shorter fingerprint (truncated for storage)
 * Useful for indexing or quick lookups
 * 
 * @param components - Array of device attributes
 * @param length - Desired length (default: 16, max: 32)
 * @returns Truncated fingerprint
 */
export const generateShortFingerprint = (
  components: string[],
  length: number = 16
): string => {
  const fullFingerprint = generateFingerprint(components);
  const validLength = Math.min(Math.max(length, 8), 32);
  return fullFingerprint.slice(0, validLength);
};

// ==================== Fingerprint Comparison ====================

/**
 * Compare two fingerprints using timing-safe comparison
 * Prevents timing attacks
 * 
 * @param fp1 - First fingerprint
 * @param fp2 - Second fingerprint
 * @returns True if fingerprints match
 */
export const compareFingerprints = (fp1: string, fp2: string): boolean => {
  if (!fp1 || !fp2) return false;
  if (fp1.length !== fp2.length) return false;
  
  try {
    return crypto.timingSafeEqual(Buffer.from(fp1), Buffer.from(fp2));
  } catch {
    return false;
  }
};

/**
 * Calculate fingerprint similarity score (0-1)
 * Useful for fuzzy matching of similar devices
 * 
 * @param fp1 - First fingerprint
 * @param fp2 - Second fingerprint
 * @returns Similarity score (0 = completely different, 1 = identical)
 */
export const fingerprintSimilarity = (fp1: string, fp2: string): number => {
  if (!fp1 || !fp2) return 0;
  if (fp1 === fp2) return 1;
  if (fp1.length !== fp2.length) return 0;
  
  let matches = 0;
  for (let i = 0; i < fp1.length; i++) {
    if (fp1[i] === fp2[i]) matches++;
  }
  return matches / fp1.length;
};

/**
 * Get Hamming distance between two fingerprints
 * Lower distance = more similar
 * 
 * @param fp1 - First fingerprint
 * @param fp2 - Second fingerprint
 * @returns Hamming distance (number of differing characters)
 */
export const fingerprintDistance = (fp1: string, fp2: string): number => {
  if (!fp1 || !fp2) return -1;
  if (fp1.length !== fp2.length) return -1;
  
  let distance = 0;
  for (let i = 0; i < fp1.length; i++) {
    if (fp1[i] !== fp2[i]) distance++;
  }
  return distance;
};

// ==================== Component Helpers ====================

/**
 * Get fingerprint hash algorithm info
 */
export const getFingerprintAlgorithm = (): {
  algorithm: string;
  separator: string;
  version: number;
} => {
  return {
    algorithm: FINGERPRINT_HASH_ALGORITHM,
    separator: FINGERPRINT_SEPARATOR,
    version: DEFAULT_FINGERPRINT_VERSION,
  };
};

/**
 * Check if fingerprint is valid (hex string format)
 * 
 * @param fingerprint - Fingerprint to validate
 * @returns True if valid fingerprint format
 */
export const isValidFingerprint = (fingerprint: string): boolean => {
  if (!fingerprint || typeof fingerprint !== 'string') return false;
  // SHA-256 produces 64 hex characters
  return /^[a-f0-9]{64}$/i.test(fingerprint);
};

// ==================== Type Exports ====================

export interface FingerprintComponents {
  userAgent: string;
  acceptLanguage: string;
  acceptEncoding: string;
  platform: string;
  screenResolution?: string;
  timezone?: string;
  colorDepth?: number;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  secChUa?: string;
  secChUaPlatform?: string;
  secChUaMobile?: string;
}
