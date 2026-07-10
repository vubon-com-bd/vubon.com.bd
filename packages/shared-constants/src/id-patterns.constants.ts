/**
 * ID Patterns Constants - Enterprise Grade
 * @module shared-constants/id-patterns.constants
 * 
 * @description
 * Centralized ID pattern definitions for the entire enterprise.
 * Used for validation across all services (auth, product, order, payment, etc.)
 * 
 * Enterprise Rules:
 * ✅ SINGLE SOURCE OF TRUTH - All ID validation patterns
 * ✅ Cross-service consistency
 * ✅ Regex patterns with detailed comments
 * ✅ Versioned for future extensions
 * ✅ Type-safe exports with const assertions
 * ✅ Framework-free, no external dependencies
 * 
 * @example
 * import { ID_PATTERNS } from '@vubon/shared-constants';
 * 
 * if (ID_PATTERNS.UUID_V4.test(userId)) {
 *   // Valid UUID v4
 * }
 */

// ============================================================
// ID Patterns - Immutable Regex Constants
// ============================================================
export const ID_PATTERNS = {
  // ============================================================
  // UUID Patterns (RFC 4122)
  // ============================================================
  
  /**
   * UUID v4 pattern (RFC 4122)
   * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   * Version: 4, Variant: RFC 4122 (8,9,a,b)
   * Example: 550e8400-e29b-41d4-a716-446655440000
   * Usage: User IDs, Session IDs, Entity IDs
   */
  UUID_V4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  
  /**
   * UUID v1 pattern (RFC 4122)
   * Format: xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx
   * Version: 1 (timestamp-based)
   * Example: 123e4567-e89b-12d3-a456-426614174000
   * Usage: Legacy systems, timestamps in IDs
   */
  UUID_V1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  
  /**
   * UUID v5 pattern (RFC 4122)
   * Format: xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx
   * Version: 5 (name-based, SHA-1)
   * Example: 123e4567-e89b-12d3-a456-426614174000
   * Usage: Name-based UUIDs
   */
  UUID_V5: /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  
  /**
   * Any UUID version (v1, v4, v5)
   * Generic UUID validation - not version-specific
   * Usage: When version doesn't matter
   */
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  
  /**
   * UUID without hyphens (compact format)
   * Format: 32 hex characters
   * Example: 550e8400e29b41d4a716446655440000
   * Usage: URLs, file names, database keys
   */
  UUID_COMPACT: /^[0-9a-f]{32}$/i,
  
  // ============================================================
  // ULID Pattern (Universally Unique Lexicographically Sortable Identifier)
  // ============================================================
  
  /**
   * ULID format (26 characters, base32 encoding)
   * Format: 10 chars timestamp + 16 chars random
   * Example: 01ARZ3NDEKTSV4RRFFQ69G5FAV
   * Usage: Sortable IDs, event sourcing
   * @see https://github.com/ulid/spec
   */
  ULID: /^[0-9A-Z]{26}$/,
  
  // ============================================================
  // Snowflake ID Pattern (Twitter Snowflake)
  // ============================================================
  
  /**
   * Snowflake ID (Twitter Snowflake format)
   * Format: 19-digit numeric ID
   * Structure: timestamp(41 bits) + worker(10 bits) + sequence(12 bits)
   * Example: 1234567890123456789
   * Usage: Distributed systems, high-volume ID generation
   * @see https://developer.twitter.com/en/docs/twitter-ids
   */
  SNOWFLAKE: /^\d{19}$/,
  
  /**
   * Snowflake ID with optional prefix
   * Format: prefix_19digit_timestamp
   * Example: usr_1234567890123456789
   * Usage: Type-prefixed IDs
   */
  SNOWFLAKE_PREFIXED: /^[a-z]{2,4}_\d{19}$/i,
  
  // ============================================================
  // Alphanumeric ID Patterns
  // ============================================================
  
  /**
   * Alphanumeric ID with special characters
   * Allows: letters, numbers, hyphens, underscores, dots
   * Length: 1-255 characters
   * Usage: General purpose IDs
   */
  ALPHANUMERIC: /^[a-zA-Z0-9\-_.]{1,255}$/,
  
  /**
   * Strict alphanumeric ID (no special characters)
   * Allows: letters, numbers only
   * Length: 1-64 characters
   * Usage: Username, API keys, simple IDs
   */
  ALPHANUMERIC_STRICT: /^[a-zA-Z0-9]{1,64}$/,
  
  /**
   * Base64 URL-safe ID
   * Format: Base64 URL-safe characters (A-Z, a-z, 0-9, -, _)
   * Length: 1-255 characters
   * Usage: Tokens, session IDs
   */
  BASE64URL: /^[A-Za-z0-9\-_]{1,255}$/,
  
  // ============================================================
  // Domain-Specific ID Patterns
  // ============================================================
  
  /**
   * User ID pattern
   * Format: usr_ + ULID or UUID
   * Example: usr_01ARZ3NDEKTSV4RRFFQ69G5FAV
   * Usage: User entity IDs
   */
  USER_ID: /^(usr_)?(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9A-Z]{26})$/i,
  
  /**
   * Session ID pattern
   * Format: sess_ + UUID v4
   * Example: sess_550e8400-e29b-41d4-a716-446655440000
   * Usage: Session entity IDs
   */
  SESSION_ID: /^sess_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  
  /**
   * Product ID pattern
   * Format: prod_ + ULID or prd_ + ULID
   * Example: prod_01ARZ3NDEKTSV4RRFFQ69G5FAV
   * Usage: Product entity IDs
   */
  PRODUCT_ID: /^(prod|prd)_[0-9A-Z]{26}$/i,
  
  /**
   * Order ID pattern
   * Format: ord_ + ULID or ORD + timestamp + random
   * Example: ord_01ARZ3NDEKTSV4RRFFQ69G5FAV
   * Usage: Order entity IDs
   */
  ORDER_ID: /^ord_[0-9A-Z]{26}$/i,
  
  /**
   * Payment ID pattern
   * Format: pay_ + ULID or PAY + timestamp + random
   * Example: pay_01ARZ3NDEKTSV4RRFFQ69G5FAV
   * Usage: Payment entity IDs
   */
  PAYMENT_ID: /^pay_[0-9A-Z]{26}$/i,
  
  /**
   * Vendor ID pattern
   * Format: ven_ + ULID
   * Example: ven_01ARZ3NDEKTSV4RRFFQ69G5FAV
   * Usage: Vendor entity IDs
   */
  VENDOR_ID: /^ven_[0-9A-Z]{26}$/i,
  
  /**
   * Device ID pattern
   * Format: dev_ + 32 char hex or UUID
   * Example: dev_550e8400e29b41d4a716446655440000
   * Usage: Device entity IDs
   */
  DEVICE_ID: /^dev_(?:[0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i,
  
  // ============================================================
  // Bangladesh Specific IDs
  // ============================================================
  
  /**
   * Bangladesh NID (National ID)
   * Format: 10 digits (old) or 17 digits (new smart NID)
   * Example: 1234567890 or 12345678901234567
   * Usage: User KYC verification
   */
  NID_BD: /^\d{10}$|^\d{17}$/,
  
  /**
   * Bangladesh TIN (Tax Identification Number)
   * Format: 9 digits
   * Example: 123456789
   * Usage: Vendor verification
   */
  TIN_BD: /^\d{9}$/,
  
  /**
   * Bangladesh BIN (Business Identification Number)
   * Format: 9 digits (old VAT) or 11 digits (new BIN)
   * Example: 123456789 or 12345678901
   * Usage: Business verification
   */
  BIN_BD: /^\d{9}$|^\d{11}$/,
  
  /**
   * Bangladesh Phone Number (Used as ID in some contexts)
   * Format: 01XXXXXXXXX or +8801XXXXXXXXX
   * Example: 01712345678
   * Usage: Phone-based login, MFA
   */
  PHONE_BD: /^(?:\+880|0)1[3-9]\d{8}$/,
  
  /**
   * Bangladesh Mobile Operator Prefix
   * Used for operator detection in phone numbers
   * Example: 017 = Grameenphone, 018 = Robi
   */
  PHONE_PREFIX_BD: /^01(?:3|4|5|6|7|8|9)\d{8}$/,
  
  // ============================================================
  // Common ID Patterns
  // ============================================================
  
  /**
   * SKU (Stock Keeping Unit)
   * Format: Uppercase letters + numbers with optional hyphens
   * Length: 4-20 characters
   * Example: SKU-1234, PROD-001
   */
  SKU: /^[A-Z0-9]{4,20}$|^[A-Z0-9]+(?:-[A-Z0-9]+)*$/,
  
  /**
   * Barcode (EAN-13, UPC-A)
   * Format: 12-13 digits
   * Example: 123456789012, 1234567890123
   */
  BARCODE: /^\d{12,13}$/,
  
  /**
   * ISBN (International Standard Book Number)
   * Format: ISBN-10 or ISBN-13
   * Example: 978-3-16-148410-0
   */
  ISBN: /^(?:ISBN(?:-10)?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$)[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
  
  /**
   * Transaction ID
   * Format: TXN- + 8-16 alphanumeric
   * Example: TXN-ABC123DEF456
   * Usage: Payment transaction IDs
   */
  TRANSACTION_ID: /^TXN-[A-Z0-9]{8,16}$/i,
  
  /**
   * Reference ID
   * Format: REF- + 8-16 alphanumeric
   * Example: REF-ABC123DEF456
   * Usage: General reference IDs
   */
  REFERENCE_ID: /^REF-[A-Z0-9]{8,16}$/i,
  
  /**
   * Booking ID (Bangladesh specific - for shipping/delivery)
   * Format: BKG- + 10 digit timestamp + 4 random
   * Example: BKG-20240515-1234
   */
  BOOKING_ID: /^BKG-\d{8}-[A-Z0-9]{4}$/i,
  
  /**
   * Invoice Number
   * Format: INV-YYYYMMDD-XXXXX
   * Example: INV-20240515-00123
   */
  INVOICE_NUMBER: /^INV-\d{8}-[A-Z0-9]{5}$/i,
} as const;

// ============================================================
// ID Configuration - Length and Validation Rules
// ============================================================
export const ID_CONFIG = {
  /** Minimum length for any ID */
  MIN_LENGTH: 1,
  
  /** Maximum length for any ID */
  MAX_LENGTH: 255,
  
  /** Default ID type when not specified */
  DEFAULT_TYPE: 'uuid',
  
  /** Supported ID types */
  SUPPORTED_TYPES: ['uuid', 'ulid', 'snowflake', 'alphanumeric'] as const,
  
  /** Whether to allow special characters in IDs */
  ALLOW_SPECIAL_CHARS: true,
  
  /** Whether to enforce strict validation (throws error on invalid) */
  STRICT_VALIDATION: true,
} as const;

// ============================================================
// ID Type Mapping - Map pattern names to patterns
// ============================================================
export const ID_TYPE_MAP = {
  uuid: ID_PATTERNS.UUID,
  'uuid-v4': ID_PATTERNS.UUID_V4,
  'uuid-v1': ID_PATTERNS.UUID_V1,
  'uuid-v5': ID_PATTERNS.UUID_V5,
  'uuid-compact': ID_PATTERNS.UUID_COMPACT,
  ulid: ID_PATTERNS.ULID,
  snowflake: ID_PATTERNS.SNOWFLAKE,
  alphanumeric: ID_PATTERNS.ALPHANUMERIC,
  base64url: ID_PATTERNS.BASE64URL,
  user: ID_PATTERNS.USER_ID,
  session: ID_PATTERNS.SESSION_ID,
  product: ID_PATTERNS.PRODUCT_ID,
  order: ID_PATTERNS.ORDER_ID,
  payment: ID_PATTERNS.PAYMENT_ID,
  vendor: ID_PATTERNS.VENDOR_ID,
  device: ID_PATTERNS.DEVICE_ID,
  sku: ID_PATTERNS.SKU,
  transaction: ID_PATTERNS.TRANSACTION_ID,
} as const;

export type IDType = keyof typeof ID_TYPE_MAP;

// ============================================================
// Helper Type - Extract the type of ID patterns
// ============================================================
export type IDPatterns = typeof ID_PATTERNS;
export type IDConfigType = typeof ID_CONFIG;
export type IDTypeMap = typeof ID_TYPE_MAP;

// ============================================================
// Type Exports - For type-safe usage
// ============================================================
export type IDPatternKey = keyof IDPatterns;
export type IDConfigKey = keyof IDConfigType;

// ============================================================
// Default Export - For convenience
// ============================================================
export default {
  ID_PATTERNS,
  ID_CONFIG,
  ID_TYPE_MAP,
};
