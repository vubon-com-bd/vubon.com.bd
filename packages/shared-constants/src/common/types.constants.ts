/**
 * Types Constants
 * @module shared-constants/common/types.constants
 */

export const TYPES = {
  // Primitive types
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  NULL: 'null',
  UNDEFINED: 'undefined',
  SYMBOL: 'symbol',
  BIGINT: 'bigint',

  // Object types
  OBJECT: 'object',
  ARRAY: 'array',
  DATE: 'date',
  REGEXP: 'regexp',
  FUNCTION: 'function',
  CLASS: 'class',

  // Special types
  EMAIL: 'email',
  PHONE: 'phone',
  URL: 'url',
  UUID: 'uuid',
  SLUG: 'slug',
  PASSWORD: 'password',
  TOKEN: 'token',
  ID: 'id',

  // Database types
  MONGODB_ID: 'mongodb_id',
  POSTGRES_ID: 'postgres_id',
  MYSQL_ID: 'mysql_id',

  // File types
  FILE: 'file',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',

  // Money types
  MONEY: 'money',
  CURRENCY: 'currency',
  PRICE: 'price',

  // Date/Time types
  TIMESTAMP: 'timestamp',
  DATETIME: 'datetime',
  TIME: 'time',

  // Status types
  STATUS: 'status',
  ENUM: 'enum',
  UNION: 'union',

  // Custom types
  ADDRESS: 'address',
  LOCATION: 'location',
  GEO_POINT: 'geo_point',
  JSON: 'json',
  ANY: 'any',
  UNKNOWN: 'unknown',
  NEVER: 'never',
  VOID: 'void',
} as const;

export type TypeName = (typeof TYPES)[keyof typeof TYPES];

export const TYPE_GROUPS: Record<string, TypeName[]> = {
  PRIMITIVE: [
    TYPES.STRING,
    TYPES.NUMBER,
    TYPES.BOOLEAN,
    TYPES.NULL,
    TYPES.UNDEFINED,
    TYPES.SYMBOL,
    TYPES.BIGINT,
  ],
  OBJECT: [TYPES.OBJECT, TYPES.ARRAY, TYPES.DATE, TYPES.REGEXP, TYPES.FUNCTION, TYPES.CLASS],
  VALIDATION: [
    TYPES.EMAIL,
    TYPES.PHONE,
    TYPES.URL,
    TYPES.UUID,
    TYPES.SLUG,
    TYPES.PASSWORD,
    TYPES.TOKEN,
    TYPES.ID,
  ],
  FILE: [TYPES.FILE, TYPES.IMAGE, TYPES.VIDEO, TYPES.AUDIO, TYPES.DOCUMENT],
  MONEY: [TYPES.MONEY, TYPES.CURRENCY, TYPES.PRICE],
  DATE_TIME: [TYPES.TIMESTAMP, TYPES.DATETIME, TYPES.TIME],
  SPECIAL: [
    TYPES.STATUS,
    TYPES.ENUM,
    TYPES.UNION,
    TYPES.ADDRESS,
    TYPES.LOCATION,
    TYPES.GEO_POINT,
    TYPES.JSON,
  ],
};

// Use Record<string, unknown> instead of any
export const TYPES_WITH_DEFAULT_VALUES: Record<TypeName, unknown> = {
  [TYPES.STRING]: '',
  [TYPES.NUMBER]: 0,
  [TYPES.BOOLEAN]: false,
  [TYPES.ARRAY]: [],
  [TYPES.OBJECT]: {},
  [TYPES.NULL]: null,
  [TYPES.UNDEFINED]: undefined,
  [TYPES.SYMBOL]: Symbol(),
  [TYPES.BIGINT]: BigInt(0),
  [TYPES.DATE]: new Date(),
  [TYPES.REGEXP]: /.*/,
  [TYPES.FUNCTION]: () => {},
  [TYPES.CLASS]: class {},
  [TYPES.EMAIL]: '',
  [TYPES.PHONE]: '',
  [TYPES.URL]: '',
  [TYPES.UUID]: '',
  [TYPES.SLUG]: '',
  [TYPES.PASSWORD]: '',
  [TYPES.TOKEN]: '',
  [TYPES.ID]: '',
  [TYPES.MONGODB_ID]: '',
  [TYPES.POSTGRES_ID]: '',
  [TYPES.MYSQL_ID]: '',
  [TYPES.FILE]: null,
  [TYPES.IMAGE]: null,
  [TYPES.VIDEO]: null,
  [TYPES.AUDIO]: null,
  [TYPES.DOCUMENT]: null,
  [TYPES.MONEY]: 0,
  [TYPES.CURRENCY]: '',
  [TYPES.PRICE]: 0,
  [TYPES.TIMESTAMP]: 0,
  [TYPES.DATETIME]: '',
  [TYPES.TIME]: '',
  [TYPES.STATUS]: '',
  [TYPES.ENUM]: '',
  [TYPES.UNION]: '',
  [TYPES.ADDRESS]: {},
  [TYPES.LOCATION]: {},
  [TYPES.GEO_POINT]: {},
  [TYPES.JSON]: {},
  [TYPES.ANY]: null,
  [TYPES.UNKNOWN]: null,
  [TYPES.NEVER]: null,
  [TYPES.VOID]: undefined,
};

export const TYPE_VALIDATION_MESSAGES: Record<TypeName, string> = {
  [TYPES.STRING]: 'Must be a string',
  [TYPES.NUMBER]: 'Must be a number',
  [TYPES.BOOLEAN]: 'Must be a boolean',
  [TYPES.NULL]: 'Must be null',
  [TYPES.UNDEFINED]: 'Must be undefined',
  [TYPES.SYMBOL]: 'Must be a symbol',
  [TYPES.BIGINT]: 'Must be a bigint',
  [TYPES.OBJECT]: 'Must be an object',
  [TYPES.ARRAY]: 'Must be an array',
  [TYPES.DATE]: 'Must be a date',
  [TYPES.REGEXP]: 'Must be a regular expression',
  [TYPES.FUNCTION]: 'Must be a function',
  [TYPES.CLASS]: 'Must be a class',
  [TYPES.EMAIL]: 'Must be a valid email address',
  [TYPES.PHONE]: 'Must be a valid phone number',
  [TYPES.URL]: 'Must be a valid URL',
  [TYPES.UUID]: 'Must be a valid UUID',
  [TYPES.SLUG]: 'Must be a valid slug',
  [TYPES.PASSWORD]: 'Must be a valid password',
  [TYPES.TOKEN]: 'Must be a valid token',
  [TYPES.ID]: 'Must be a valid ID',
  [TYPES.MONGODB_ID]: 'Must be a valid MongoDB ID',
  [TYPES.POSTGRES_ID]: 'Must be a valid PostgreSQL ID',
  [TYPES.MYSQL_ID]: 'Must be a valid MySQL ID',
  [TYPES.FILE]: 'Must be a file',
  [TYPES.IMAGE]: 'Must be an image',
  [TYPES.VIDEO]: 'Must be a video',
  [TYPES.AUDIO]: 'Must be an audio file',
  [TYPES.DOCUMENT]: 'Must be a document',
  [TYPES.MONEY]: 'Must be a valid money value',
  [TYPES.CURRENCY]: 'Must be a valid currency',
  [TYPES.PRICE]: 'Must be a valid price',
  [TYPES.TIMESTAMP]: 'Must be a valid timestamp',
  [TYPES.DATETIME]: 'Must be a valid datetime',
  [TYPES.TIME]: 'Must be a valid time',
  [TYPES.STATUS]: 'Must be a valid status',
  [TYPES.ENUM]: 'Must be a valid enum value',
  [TYPES.UNION]: 'Must be a valid union type',
  [TYPES.ADDRESS]: 'Must be a valid address',
  [TYPES.LOCATION]: 'Must be a valid location',
  [TYPES.GEO_POINT]: 'Must be a valid geo point',
  [TYPES.JSON]: 'Must be valid JSON',
  [TYPES.ANY]: 'Any value is allowed',
  [TYPES.UNKNOWN]: 'Unknown type',
  [TYPES.NEVER]: 'Never type',
  [TYPES.VOID]: 'Void type',
};

// ===== METRICS CONSTANTS ADDED HERE =====
export const METRICS = {
  // User metrics
  USER_LOGIN: 'user_login',
  USER_REGISTER: 'user_register',
  USER_LOGOUT: 'user_logout',
  USER_ACTIVE: 'user_active',
  USER_INACTIVE: 'user_inactive',
  USER_DELETED: 'user_deleted',

  // Session metrics
  SESSION_CREATED: 'session_created',
  SESSION_EXPIRED: 'session_expired',
  SESSION_REVOKED: 'session_revoked',

  // Auth metrics
  AUTH_SUCCESS: 'auth_success',
  AUTH_FAILURE: 'auth_failure',
  AUTH_LOCKED: 'auth_locked',
  AUTH_UNLOCKED: 'auth_unlocked',

  // Verification metrics
  VERIFICATION_SENT: 'verification_sent',
  VERIFICATION_SUCCESS: 'verification_success',
  VERIFICATION_FAILURE: 'verification_failure',

  // API metrics
  API_REQUEST: 'api_request',
  API_SUCCESS: 'api_success',
  API_ERROR: 'api_error',
  API_RESPONSE_TIME: 'api_response_time',

  // Performance metrics
  PAGE_LOAD: 'page_load',
  RENDER_TIME: 'render_time',
  DB_QUERY_TIME: 'db_query_time',
  CACHE_HIT: 'cache_hit',
  CACHE_MISS: 'cache_miss',

  // Business metrics
  ORDER_PLACED: 'order_placed',
  ORDER_COMPLETED: 'order_completed',
  ORDER_CANCELLED: 'order_cancelled',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILURE: 'payment_failure',

  // Notification metrics
  NOTIFICATION_SENT: 'notification_sent',
  NOTIFICATION_OPENED: 'notification_opened',
  NOTIFICATION_DISMISSED: 'notification_dismissed',
} as const;

export type MetricName = (typeof METRICS)[keyof typeof METRICS];
