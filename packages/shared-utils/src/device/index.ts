/**
 * Device Utilities - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/device/index
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// Fingerprint Utilities (fingerprint.util.ts)
// ============================================================
export {
  // Core fingerprint generation
  generateFingerprint,
  generateFingerprintFromHeaders,
  generateFingerprintFromClient,
  generateVersionedFingerprint,
  generateShortFingerprint,

  // Fingerprint comparison
  compareFingerprints,
  fingerprintSimilarity,
  fingerprintDistance,

  // Component helpers
  normalizeFingerprintComponents,
  isValidFingerprint,
  getFingerprintAlgorithm,
  getMaxFingerprintLength,
  getMinFingerprintLength,

  // Constants
  FINGERPRINT_HASH_ALGORITHM,
  FINGERPRINT_SEPARATOR,
  DEFAULT_FINGERPRINT_VERSION,
  FINGERPRINT_CONFIG_EXPORTS,
} from './fingerprint.util';

export type {
  FingerprintComponents,
} from './fingerprint.util';

// ============================================================
// IP Utilities (ip.util.ts)
// ============================================================
export {
  // Validation
  isIPv4,
  isIPv6,
  isIP,
  getIPVersion,

  // Masking
  maskIPv4,
  maskIPv6,
  maskIP,

  // Parsing & Extraction
  normalizeIP,
  extractIPFromHeaders,
  getClientIP,

  // IP Classification
  isPrivateIP,
  isPublicIP,

  // CIDR Helpers
  isIPInCIDR,
  getNetworkAddress,
} from './ip.util';

export type {
  IPVersion,
} from './ip.util';

// ============================================================
// User Agent Utilities (user-agent.util.ts)
// ============================================================
export {
  // Core parsing
  parseUserAgent,

  // Device type detection
  detectDeviceType,
  detectBrowser,
  detectOS,
  detectBrowserVersion,
  detectOSVersion,

  // Device type checks
  isMobile,
  isTablet,
  isDesktop,
  isBot,
  isFeaturePhone,

  // Detailed info & summary
  getDeviceInfo,
  getUserAgentSummary,
} from './user-agent.util';

export type {
  ParsedUserAgent,
  DeviceInfo,
} from './user-agent.util';
