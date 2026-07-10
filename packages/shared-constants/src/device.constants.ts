// packages/shared-constants/src/device-patterns.constants.ts

/**
 * Device ID Patterns - Enterprise Grade Shared Constants
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/device-patterns.constants
 * 
 * @description
 * Centralized repository for all device identification patterns used across the ecosystem.
 * Ensures consistent device ID validation across all services (auth, session, device, etc.)
 * 
 * Enterprise Features:
 * ✅ Single Source of Truth for all device ID patterns
 * ✅ Comprehensive pattern coverage (UUID, fingerprint, mobile, IoT)
 * ✅ Bangladesh specific patterns (mobile operators, local formats)
 * ✅ Type-safe with 'as const' for immutability
 * ✅ Pattern versioning for future evolution
 * ✅ Cross-service consistency
 * 
 * @example
 * import { DEVICE_ID_PATTERNS, isValidDeviceId } from '@vubon/shared-constants';
 * 
 * if (DEVICE_ID_PATTERNS.UUID_V4.test(deviceId)) {
 *   // Valid UUID v4 device ID
 * }
 * 
 * if (isValidDeviceId(deviceId)) {
 *   // Device ID matches any known pattern
 * }
 * 
 * @see {@link https://vubon.com.bd/docs/device-id-standards} for documentation
 */

// ============================================================
// Imports
// ============================================================

// No external imports - pure constants

// ============================================================
// Core Device ID Patterns
// ============================================================

/**
 * Comprehensive device ID patterns for the entire ecosystem.
 * All patterns are immutable and readonly.
 * 
 * Pattern Categories:
 * - UUID Standards (v1, v4, generic)
 * - Fingerprint Formats (browser, hash-based)
 * - Mobile Platforms (Android, iOS, Bangladesh mobile)
 * - Device Types (tablet, TV, console, wearable)
 * - Generic Formats (alphanumeric, custom)
 */
export const DEVICE_ID_PATTERNS = {
  // ==========================================================
  // UUID Standards (RFC 4122 compliant)
  // ==========================================================
  
  /**
   * UUID v4 - Random UUID (most common)
   * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   * Example: 550e8400-e29b-41d4-a716-446655440000
   */
  UUID_V4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  
  /**
   * UUID v1 - Time-based UUID
   * Format: xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx
   * Example: 6ba7b810-9dad-11d1-80b4-00c04fd430c8
   */
  UUID_V1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  
  /**
   * UUID v6 - Ordered-Time UUID (draft)
   * Format: xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx
   * Example: 1efc2f6e-9dad-6b11-80b4-00c04fd430c8
   */
  UUID_V6: /^[0-9a-f]{8}-[0-9a-f]{4}-6[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  
  /**
   * UUID v7 - Unix Epoch time-based (draft)
   * Format: xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx
   * Example: 018f4d1a-9dad-7b11-80b4-00c04fd430c8
   */
  UUID_V7: /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  
  /**
   * Generic UUID (any version - v1, v4, v6, v7)
   * Use this for backward compatibility
   */
  UUID_GENERIC: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  
  // ==========================================================
  // ULID (Universally Unique Lexicographically Sortable Identifier)
  // ==========================================================
  
  /**
   * ULID - Sortable unique identifier
   * Format: 26 character Crockford's Base32
   * Example: 01ARZ3NDEKTSV4RRFFQ69G5FAV
   * Features: Time-sortable, URL-safe, 128-bit entropy
   */
  ULID: /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i,
  
  // ==========================================================
  // Snowflake ID (Twitter/Social Media)
  // ==========================================================
  
  /**
   * Snowflake ID - 64-bit integer with timestamp
   * Format: 19 digits (Twitter snowflake)
   * Example: 1234567890123456789
   * Features: Time-sortable, distributed generation
   */
  SNOWFLAKE: /^\d{19}$/,
  
  // ==========================================================
  // Fingerprint Formats
  // ==========================================================
  
  /**
   * Browser fingerprint (client-side generated)
   * Format: fp_[a-zA-Z0-9]{16,64}
   * Example: fp_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7
   */
  BROWSER_FINGERPRINT: /^fp_[a-zA-Z0-9]{16,64}$/,
  
  /**
   * Browser fingerprint with retry context
   * Format: fp(_retry\d+)?(_[a-zA-Z0-9]{1,6})?_[a-z0-9]+_[a-z0-9]+_\d+
   * Example: fp_retry2_abc123_a1b2c3d4_e5f6g7h8_123
   * Features: Tracks retry attempts and correlation for connection resilience
   */
  BROWSER_FINGERPRINT_RETRY: /^fp(_retry\d+)?(_[a-zA-Z0-9]{1,6})?_[a-z0-9]+_[a-z0-9]+_\d+$/i,
  
  /**
   * Secure hash-based fingerprint
   * Format: 32-128 hex characters
   * Example: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
   * Use SHA-256 (64 chars) or SHA-512 (128 chars)
   */
  FINGERPRINT_HASH: /^[a-f0-9]{32,128}$/i,
  
  // ==========================================================
  // Mobile Platform Patterns
  // ==========================================================
  
  /**
   * Android device ID
   * Format: ANDROID_[a-zA-Z0-9]{16,64}
   * Example: ANDROID_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u
   */
  MOBILE_ANDROID: /^ANDROID_[a-zA-Z0-9]{16,64}$/i,
  
  /**
   * iOS device ID (Apple UDID or vendor ID)
   * Format: IOS_[a-zA-Z0-9]{16,64}
   * Example: IOS_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u
   */
  MOBILE_IOS: /^IOS_[a-zA-Z0-9]{16,64}$/i,
  
  /**
   * Bangladesh mobile number based device ID
   * Format: BD_MOBILE_01[3-9][0-9]{8}
   * Example: BD_MOBILE_01712345678
   * Features: Bangladesh specific mobile number format
   */
  MOBILE_BD: /^BD_MOBILE_01[3-9][0-9]{8}$/i,
  
  /**
   * Feature phone device ID (Bangladesh specific)
   * Format: FP_BD_[a-zA-Z0-9]{8,16}
   * Example: FP_BD_aB3cD5eF7gH9iJ1k
   * Features: Optimized for feature phones with limited storage
   */
  FEATURE_PHONE_BD: /^FP_BD_[a-zA-Z0-9]{8,16}$/i,
  
  // ==========================================================
  // Device Type Patterns
  // ==========================================================
  
  /**
   * Tablet device ID
   * Format: TABLET_[a-zA-Z0-9]{16,64}
   * Example: TABLET_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u
   */
  TABLET: /^TABLET_[a-zA-Z0-9]{16,64}$/i,
  
  /**
   * Smart TV device ID
   * Format: TV_[a-zA-Z0-9]{16,64}
   * Example: TV_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u
   */
  SMART_TV: /^TV_[a-zA-Z0-9]{16,64}$/i,
  
  /**
   * Gaming console device ID
   * Format: CONSOLE_[a-zA-Z0-9]{16,64}
   * Example: CONSOLE_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u
   */
  CONSOLE: /^CONSOLE_[a-zA-Z0-9]{16,64}$/i,
  
  /**
   * Wearable device ID (smartwatch, fitness tracker)
   * Format: WEARABLE_[a-zA-Z0-9]{16,64}
   * Example: WEARABLE_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u
   */
  WEARABLE: /^WEARABLE_[a-zA-Z0-9]{16,64}$/i,
  
  /**
   * IoT device ID (smart home, sensors)
   * Format: IOT_[a-zA-Z0-9]{16,64}
   * Example: IOT_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u
   */
  IOT: /^IOT_[a-zA-Z0-9]{16,64}$/i,
  
  // ==========================================================
  // POS / Kiosk Device Patterns (Bangladesh specific)
  // ==========================================================
  
  /**
   * POS (Point of Sale) device ID
   * Format: POS_[a-zA-Z0-9]{12,32}
   * Example: POS_aB3cD5eF7gH9iJ1kL3mN5oP7q
   * Features: For retail/merchant POS terminals
   */
  POS_DEVICE: /^POS_[a-zA-Z0-9]{12,32}$/i,
  
  /**
   * Kiosk device ID (public e-commerce kiosks)
   * Format: KIOSK_[a-zA-Z0-9]{12,32}
   * Example: KIOSK_aB3cD5eF7gH9iJ1kL3mN5oP7q
   * Features: For public self-service kiosks in Bangladesh
   */
  KIOSK: /^KIOSK_[a-zA-Z0-9]{12,32}$/i,
  
  // ==========================================================
  // Generic and Legacy Formats
  // ==========================================================
  
  /**
   * Standard alphanumeric device ID
   * Format: Alphanumeric with hyphens, underscores, dots, colons
   * Length: 1-512 characters
   * Example: device_123-abc_def:ghi
   * Features: Most permissive - for backward compatibility
   */
  STANDARD: /^[a-zA-Z0-9\-_.:]{1,512}$/,
  
  /**
   * Sequential numeric device ID (legacy)
   * Format: 1-20 digits
   * Example: 123456789
   * Features: For legacy systems, deprecated for new development
   */
  SEQUENTIAL_NUMERIC: /^\d{1,20}$/,
  
  /**
   * Session-based ephemeral device ID
   * Format: SESS_[a-zA-Z0-9]{16,32}
   * Example: SESS_aB3cD5eF7gH9iJ1kL3mN5oP7q
   * Features: Temporary device ID for guest/incognito sessions
   */
  SESSION_EPHEMERAL: /^SESS_[a-zA-Z0-9]{16,32}$/,
  
  /**
   * Anonymous device ID (GDPR compliant)
   * Format: ANON_[a-zA-Z0-9]{16,32}
   * Example: ANON_aB3cD5eF7gH9iJ1kL3mN5oP7q
   * Features: Non-identifiable device tracking
   */
  ANONYMOUS: /^ANON_[a-zA-Z0-9]{16,32}$/i,
  
  // ==========================================================
  // Special Format: OAuth / Social Provider Device IDs
  // ==========================================================
  
  /**
   * OAuth provider device ID
   * Format: OAUTH_[PROVIDER]_[TOKEN]
   * Example: OAUTH_GOOGLE_aB3cD5eF7gH9iJ1kL3mN5oP7q
   */
  OAUTH_DEVICE: /^OAUTH_[A-Z]+_[a-zA-Z0-9]{16,64}$/i,
  
  /**
   * Social provider device ID (Bangladesh specific)
   * Format: SOCIAL_[PROVIDER]_[TOKEN]
   * Example: SOCIAL_WHATSAPP_aB3cD5eF7gH9iJ1kL3mN5oP7q
   */
  SOCIAL_DEVICE: /^SOCIAL_[A-Z]+_[a-zA-Z0-9]{16,64}$/i,
} as const;

// ============================================================
// Type Definitions
// ============================================================

/**
 * All available device ID pattern keys
 */
export type DeviceIdPatternKey = keyof typeof DEVICE_ID_PATTERNS;

/**
 * All available device ID patterns as a union type
 */
export type DeviceIdPattern = typeof DEVICE_ID_PATTERNS[DeviceIdPatternKey];

// ============================================================
// Pattern Metadata (for validation and documentation)
// ============================================================

/**
 * Metadata for each device ID pattern
 * Provides additional context for validation and error messages
 */
export const DEVICE_ID_PATTERN_METADATA = {
  UUID_V4: {
    description: 'UUID v4 - Random UUID (RFC 4122 compliant)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    category: 'uuid',
    version: '4.0',
  },
  UUID_V1: {
    description: 'UUID v1 - Time-based UUID (RFC 4122 compliant)',
    example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    category: 'uuid',
    version: '1.0',
  },
  UUID_V6: {
    description: 'UUID v6 - Ordered-Time UUID (draft)',
    example: '1efc2f6e-9dad-6b11-80b4-00c04fd430c8',
    category: 'uuid',
    version: '6.0',
  },
  UUID_V7: {
    description: 'UUID v7 - Unix Epoch time-based (draft)',
    example: '018f4d1a-9dad-7b11-80b4-00c04fd430c8',
    category: 'uuid',
    version: '7.0',
  },
  UUID_GENERIC: {
    description: 'Generic UUID (any version)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    category: 'uuid',
    version: 'generic',
  },
  ULID: {
    description: 'ULID - Universally Unique Lexicographically Sortable Identifier',
    example: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
    category: 'sortable',
    version: '1.0',
  },
  SNOWFLAKE: {
    description: 'Snowflake ID - 64-bit timestamp-based (Twitter format)',
    example: '1234567890123456789',
    category: 'sortable',
    version: '1.0',
  },
  BROWSER_FINGERPRINT: {
    description: 'Browser fingerprint (client-side generated)',
    example: 'fp_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7',
    category: 'fingerprint',
    version: '1.0',
  },
  BROWSER_FINGERPRINT_RETRY: {
    description: 'Browser fingerprint with retry context',
    example: 'fp_retry2_abc123_a1b2c3d4_e5f6g7h8_123',
    category: 'fingerprint',
    version: '2.0',
  },
  FINGERPRINT_HASH: {
    description: 'Secure hash-based fingerprint (SHA-256 or SHA-512)',
    example: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
    category: 'fingerprint',
    version: '1.0',
  },
  MOBILE_ANDROID: {
    description: 'Android device ID',
    example: 'ANDROID_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u',
    category: 'mobile',
    version: '1.0',
  },
  MOBILE_IOS: {
    description: 'iOS device ID (Apple UDID or vendor ID)',
    example: 'IOS_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u',
    category: 'mobile',
    version: '1.0',
  },
  MOBILE_BD: {
    description: 'Bangladesh mobile number based device ID',
    example: 'BD_MOBILE_01712345678',
    category: 'bangladesh',
    version: '1.0',
  },
  FEATURE_PHONE_BD: {
    description: 'Feature phone device ID (Bangladesh specific)',
    example: 'FP_BD_aB3cD5eF7gH9iJ1k',
    category: 'bangladesh',
    version: '1.0',
  },
  TABLET: {
    description: 'Tablet device ID',
    example: 'TABLET_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u',
    category: 'device',
    version: '1.0',
  },
  SMART_TV: {
    description: 'Smart TV device ID',
    example: 'TV_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u',
    category: 'device',
    version: '1.0',
  },
  CONSOLE: {
    description: 'Gaming console device ID',
    example: 'CONSOLE_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u',
    category: 'device',
    version: '1.0',
  },
  WEARABLE: {
    description: 'Wearable device ID (smartwatch, fitness tracker)',
    example: 'WEARABLE_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u',
    category: 'device',
    version: '1.0',
  },
  IOT: {
    description: 'IoT device ID (smart home, sensors)',
    example: 'IOT_aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1u',
    category: 'device',
    version: '1.0',
  },
  POS_DEVICE: {
    description: 'POS (Point of Sale) device ID (Bangladesh retail)',
    example: 'POS_aB3cD5eF7gH9iJ1kL3mN5oP7q',
    category: 'bangladesh',
    version: '1.0',
  },
  KIOSK: {
    description: 'Kiosk device ID (public e-commerce kiosks)',
    example: 'KIOSK_aB3cD5eF7gH9iJ1kL3mN5oP7q',
    category: 'bangladesh',
    version: '1.0',
  },
  STANDARD: {
    description: 'Standard alphanumeric device ID (legacy compatible)',
    example: 'device_123-abc_def:ghi',
    category: 'legacy',
    version: '1.0',
  },
  SEQUENTIAL_NUMERIC: {
    description: 'Sequential numeric device ID (legacy) - DEPRECATED',
    example: '123456789',
    category: 'legacy',
    version: '1.0',
  },
  SESSION_EPHEMERAL: {
    description: 'Session-based ephemeral device ID (guest/incognito)',
    example: 'SESS_aB3cD5eF7gH9iJ1kL3mN5oP7q',
    category: 'ephemeral',
    version: '1.0',
  },
  ANONYMOUS: {
    description: 'Anonymous device ID (GDPR compliant)',
    example: 'ANON_aB3cD5eF7gH9iJ1kL3mN5oP7q',
    category: 'anonymous',
    version: '1.0',
  },
  OAUTH_DEVICE: {
    description: 'OAuth provider device ID',
    example: 'OAUTH_GOOGLE_aB3cD5eF7gH9iJ1kL3mN5oP7q',
    category: 'oauth',
    version: '1.0',
  },
  SOCIAL_DEVICE: {
    description: 'Social provider device ID (Bangladesh specific)',
    example: 'SOCIAL_WHATSAPP_aB3cD5eF7gH9iJ1kL3mN5oP7q',
    category: 'social',
    version: '1.0',
  },
} as const;

// ============================================================
// Pattern Categories (for grouping)
// ============================================================

/**
 * Device ID pattern categories for grouping and filtering
 */
export const DEVICE_ID_PATTERN_CATEGORIES = {
  UUID: ['UUID_V4', 'UUID_V1', 'UUID_V6', 'UUID_V7', 'UUID_GENERIC'] as const,
  SORTABLE: ['ULID', 'SNOWFLAKE'] as const,
  FINGERPRINT: ['BROWSER_FINGERPRINT', 'BROWSER_FINGERPRINT_RETRY', 'FINGERPRINT_HASH'] as const,
  MOBILE: ['MOBILE_ANDROID', 'MOBILE_IOS', 'MOBILE_BD', 'FEATURE_PHONE_BD'] as const,
  DEVICE: ['TABLET', 'SMART_TV', 'CONSOLE', 'WEARABLE', 'IOT'] as const,
  BANGLADESH: ['MOBILE_BD', 'FEATURE_PHONE_BD', 'POS_DEVICE', 'KIOSK'] as const,
  LEGACY: ['STANDARD', 'SEQUENTIAL_NUMERIC'] as const,
  EPHEMERAL: ['SESSION_EPHEMERAL', 'ANONYMOUS'] as const,
  SOCIAL: ['OAUTH_DEVICE', 'SOCIAL_DEVICE'] as const,
} as const;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Check if a device ID matches any known pattern
 * 
 * @param deviceId - The device ID to validate
 * @param options - Validation options
 * @returns True if the device ID matches any pattern
 * 
 * @example
 * isValidDeviceId('550e8400-e29b-41d4-a716-446655440000') // true
 * isValidDeviceId('invalid-id') // false
 */
export const isValidDeviceId = (
  deviceId: string,
  options: {
    /** Allow legacy/deprecated patterns (default: false) */
    allowLegacy?: boolean;
    /** Allow ephemeral/guest patterns (default: true) */
    allowEphemeral?: boolean;
    /** Specific categories to check (default: all) */
    categories?: (keyof typeof DEVICE_ID_PATTERN_CATEGORIES)[];
  } = {}
): boolean => {
  if (!deviceId || typeof deviceId !== 'string') {
    return false;
  }

  const { allowLegacy = false, allowEphemeral = true, categories } = options;

  // Get patterns to check
  let patterns: DeviceIdPatternKey[] = Object.keys(DEVICE_ID_PATTERNS) as DeviceIdPatternKey[];

  // Filter by categories if specified
  if (categories && categories.length > 0) {
    const categoryPatterns = categories.flatMap(
      (cat) => DEVICE_ID_PATTERN_CATEGORIES[cat] as readonly DeviceIdPatternKey[]
    );
    patterns = patterns.filter((p) => categoryPatterns.includes(p));
  }

  // Remove legacy patterns if not allowed
  if (!allowLegacy) {
    patterns = patterns.filter((p) => !DEVICE_ID_PATTERN_CATEGORIES.LEGACY.includes(p as any));
  }

  // Remove ephemeral patterns if not allowed
  if (!allowEphemeral) {
    patterns = patterns.filter((p) => !DEVICE_ID_PATTERN_CATEGORIES.EPHEMERAL.includes(p as any));
  }

  return patterns.some((key) => DEVICE_ID_PATTERNS[key].test(deviceId));
};

/**
 * Get the pattern key that matches a device ID
 * 
 * @param deviceId - The device ID to check
 * @param options - Validation options
 * @returns The matching pattern key or null
 * 
 * @example
 * getDeviceIdPattern('550e8400-e29b-41d4-a716-446655440000') // 'UUID_V4'
 */
export const getDeviceIdPattern = (
  deviceId: string,
  options: {
    allowLegacy?: boolean;
    allowEphemeral?: boolean;
  } = {}
): DeviceIdPatternKey | null => {
  if (!deviceId || typeof deviceId !== 'string') {
    return null;
  }

  const { allowLegacy = false, allowEphemeral = true } = options;

  let patterns = Object.keys(DEVICE_ID_PATTERNS) as DeviceIdPatternKey[];

  if (!allowLegacy) {
    patterns = patterns.filter((p) => !DEVICE_ID_PATTERN_CATEGORIES.LEGACY.includes(p as any));
  }

  if (!allowEphemeral) {
    patterns = patterns.filter((p) => !DEVICE_ID_PATTERN_CATEGORIES.EPHEMERAL.includes(p as any));
  }

  for (const key of patterns) {
    if (DEVICE_ID_PATTERNS[key].test(deviceId)) {
      return key;
    }
  }

  return null;
};

/**
 * Get pattern metadata for a device ID
 * 
 * @param deviceId - The device ID to check
 * @returns Pattern metadata or null
 */
export const getDeviceIdPatternMetadata = (
  deviceId: string
): (typeof DEVICE_ID_PATTERN_METADATA)[DeviceIdPatternKey] | null => {
  const pattern = getDeviceIdPattern(deviceId);
  if (!pattern) return null;
  return DEVICE_ID_PATTERN_METADATA[pattern];
};

/**
 * Get the category of a device ID
 * 
 * @param deviceId - The device ID to check
 * @returns The category or null
 */
export const getDeviceIdCategory = (
  deviceId: string
): keyof typeof DEVICE_ID_PATTERN_CATEGORIES | null => {
  const pattern = getDeviceIdPattern(deviceId);
  if (!pattern) return null;

  for (const [category, patterns] of Object.entries(DEVICE_ID_PATTERN_CATEGORIES)) {
    if ((patterns as readonly string[]).includes(pattern)) {
      return category as keyof typeof DEVICE_ID_PATTERN_CATEGORIES;
    }
  }

  return null;
};

/**
 * Check if a device ID is from Bangladesh specific format
 */
export const isBangladeshDeviceId = (deviceId: string): boolean => {
  const category = getDeviceIdCategory(deviceId);
  return category === 'BANGLADESH';
};

/**
 * Check if a device ID is ephemeral/guest
 */
export const isEphemeralDeviceId = (deviceId: string): boolean => {
  const category = getDeviceIdCategory(deviceId);
  return category === 'EPHEMERAL';
};

/**
 * Check if a device ID is a fingerprint
 */
export const isFingerprintDeviceId = (deviceId: string): boolean => {
  const category = getDeviceIdCategory(deviceId);
  return category === 'FINGERPRINT';
};

/**
 * Check if a device ID is a UUID
 */
export const isUuidDeviceId = (deviceId: string): boolean => {
  const category = getDeviceIdCategory(deviceId);
  return category === 'UUID';
};

/**
 * Check if a device ID is a mobile device ID
 */
export const isMobileDeviceId = (deviceId: string): boolean => {
  const category = getDeviceIdCategory(deviceId);
  return category === 'MOBILE';
};

// ============================================================
// Export All Constants
// ============================================================

export const DEVICE_ID_CONFIG = {
  /** All patterns */
  PATTERNS: DEVICE_ID_PATTERNS,
  /** Pattern metadata */
  METADATA: DEVICE_ID_PATTERN_METADATA,
  /** Pattern categories */
  CATEGORIES: DEVICE_ID_PATTERN_CATEGORIES,
  /** Current version of the device ID specification */
  VERSION: '2.0.0',
  /** Minimum length for device IDs */
  MIN_LENGTH: 1,
  /** Maximum length for device IDs */
  MAX_LENGTH: 512,
  /** Default device ID format for new devices */
  DEFAULT_FORMAT: 'UUID_V4',
  /** Bangladesh specific default format */
  BANGLADESH_DEFAULT_FORMAT: 'MOBILE_BD',
  /** Ephemeral/guest default format */
  EPHEMERAL_DEFAULT_FORMAT: 'SESSION_EPHEMERAL',
} as const;



// packages/shared-constants/src/device-patterns.constants.ts
// ✅ এই কোডের শেষে যোগ করুন

// ============================================================
// Device Configuration
// ============================================================
export const DEVICE_CONFIG = {
  /** Maximum devices per user */
  MAX_DEVICES_PER_USER: 10,
  
  /** Maximum trusted devices per user */
  MAX_TRUSTED_DEVICES: 5,
  
  /** Fingerprint normalization enabled */
  FINGERPRINT_NORMALIZATION: true,
  
  /** Device trust expiration days */
  TRUST_EXPIRATION_DAYS: 30,
  
  /** ✅ NEW: Days after which device is considered stale */
  STALE_DAYS_THRESHOLD: 30,
  /** Device trust score thresholds */
  TRUST_SCORE_THRESHOLDS: {
    HIGH: 80,
    MEDIUM: 50,
    LOW: 30,
  },
  
  /** Device types that can be trusted */
  TRUSTABLE_DEVICE_TYPES: ['desktop', 'laptop', 'mobile', 'tablet'],
  
  /** Blocked device types (cannot be registered) */
  BLOCKED_DEVICE_TYPES: ['bot', 'unknown'],
} as const;

// ============================================================
// Device Config Type
// ============================================================
export type DeviceConfig = typeof DEVICE_CONFIG;

// ============================================================
// Type Exports
// ============================================================

export type DeviceIdConfig = typeof DEVICE_ID_CONFIG;
export type DeviceIdPatternMetadata = typeof DEVICE_ID_PATTERN_METADATA;
export type DeviceIdPatternCategory = keyof typeof DEVICE_ID_PATTERN_CATEGORIES;

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features Applied:
// 1. ✅ Single Source of Truth for all device ID patterns
// 2. ✅ Comprehensive pattern coverage (23+ patterns)
// 3. ✅ Type-safe with 'as const' for immutability
// 4. ✅ Bangladesh specific patterns (mobile, feature phone, POS, kiosk)
// 5. ✅ Pattern versioning and metadata for documentation
// 6. ✅ Pattern categories for grouping and filtering
// 7. ✅ Helper functions for validation and detection
// 8. ✅ Support for retry context (connection resilience)
// 9. ✅ GDPR compliant anonymous device IDs
// 10. ✅ OAuth and social provider device ID support
// 11. ✅ Cross-service consistency and reusability
// 12. ✅ Future-proof with draft UUID versions (v6, v7)
// 
// Bangladesh Specific Features:
// - BD_MOBILE_* pattern for mobile number based IDs
// - FEATURE_PHONE_BD for feature phone optimization
// - POS_DEVICE for retail POS terminals
// - KIOSK for public self-service kiosks
// 
// Performance Optimizations:
// - Patterns are pre-compiled RegExp objects
// - Helper functions use early returns for performance
// - Category-based filtering reduces pattern checks
// 
// ============================================================
