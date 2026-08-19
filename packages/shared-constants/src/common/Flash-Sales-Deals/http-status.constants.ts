/**
 * Flash Sales & Deals HTTP Status Codes Constants
 * Contains all HTTP status codes used in flash sales and deals management
 */

// ==================== Standard HTTP Status Codes ====================

export const FlashSalesDealsHttpStatus = {
  // 2xx Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,

  // 3xx Redirection
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  SWITCH_PROXY: 306,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  // 4xx Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;

export type FlashSalesDealsHttpStatusCode =
  (typeof FlashSalesDealsHttpStatus)[keyof typeof FlashSalesDealsHttpStatus];

// ==================== Business Error Codes (Separate) ====================

export const FlashSalesDealsBusinessErrors = {
  // Flash Sale Errors (13001-13010)
  FLASH_SALE_NOT_FOUND: 13001,
  FLASH_SALE_EXPIRED: 13002,
  FLASH_SALE_NOT_STARTED: 13003,
  FLASH_SALE_ENDED: 13004,
  FLASH_SALE_FULLY_BOOKED: 13005,
  FLASH_SALE_ALREADY_STARTED: 13006,
  FLASH_SALE_ALREADY_ENDED: 13007,
  FLASH_SALE_INVALID_STATUS: 13008,
  FLASH_SALE_SCHEDULE_CONFLICT: 13009,
  FLASH_SALE_PARTICIPANT_LIMIT: 13010,

  // Deal Errors (13011-13020)
  DEAL_NOT_FOUND: 13011,
  DEAL_EXPIRED: 13012,
  DEAL_INACTIVE: 13013,
  DEAL_ALREADY_ACTIVE: 13014,
  DEAL_ALREADY_EXPIRED: 13015,
  DEAL_INVALID_TYPE: 13016,
  DEAL_PRIORITY_CONFLICT: 13017,
  DEAL_DISCOUNT_INVALID: 13018,
  DEAL_RESTRICTION_VIOLATION: 13019,
  DEAL_TARGET_INVALID: 13020,

  // Inventory Errors (13021-13030)
  INVENTORY_INSUFFICIENT: 13021,
  INVENTORY_EXCEEDED: 13022,
  INVENTORY_LOCK_FAILED: 13023,
  INVENTORY_RESERVATION_FAILED: 13024,
  INVENTORY_RELEASE_FAILED: 13025,
  INVENTORY_SYNC_FAILED: 13026,
  INVENTORY_NOT_FOUND: 13027,
  INVENTORY_UPDATE_FAILED: 13028,

  // Price Errors (13031-13040)
  PRICE_CHANGED: 13031,
  PRICE_INVALID: 13032,
  PRICE_NOT_FOUND: 13033,
  PRICE_UPDATE_FAILED: 13034,
  PRICE_DISCOUNT_INVALID: 13035,

  // Coupon & Voucher Errors (13041-13050)
  COUPON_INVALID: 13041,
  COUPON_EXPIRED: 13042,
  COUPON_ALREADY_USED: 13043,
  COUPON_LIMIT_EXCEEDED: 13044,
  COUPON_NOT_APPLICABLE: 13045,
  VOUCHER_INVALID: 13046,
  VOUCHER_EXPIRED: 13047,
  VOUCHER_ALREADY_USED: 13048,
  VOUCHER_LIMIT_EXCEEDED: 13049,
  VOUCHER_NOT_APPLICABLE: 13050,

  // Rule & Validation Errors (13051-13060)
  RULE_VIOLATION: 13051,
  RULE_NOT_FOUND: 13052,
  RULE_EXECUTION_FAILED: 13053,
  RULE_INVALID_CONFIG: 13054,
  RULE_PRIORITY_CONFLICT: 13055,
  VALIDATION_FAILED: 13056,
  PARTICIPANT_LIMIT_REACHED: 13057,
  PARTICIPANT_ALREADY_JOINED: 13058,
  PARTICIPANT_NOT_FOUND: 13059,
  PARTICIPANT_INVALID_STATUS: 13060,

  // Notification & Share Errors (13061-13070)
  NOTIFICATION_FAILED: 13061,
  NOTIFICATION_INVALID: 13062,
  NOTIFICATION_LIMIT_EXCEEDED: 13063,
  SHARE_FAILED: 13064,
  SHARE_INVALID_LINK: 13065,
  SHARE_LIMIT_EXCEEDED: 13066,
  WISHLIST_ALREADY_EXISTS: 13067,
  WISHLIST_NOT_FOUND: 13068,
  WISHLIST_LIMIT_EXCEEDED: 13069,

  // System Errors (13071-13080)
  DATABASE_ERROR: 13071,
  CACHE_ERROR: 13072,
  QUEUE_ERROR: 13073,
  THIRD_PARTY_ERROR: 13074,
  RATE_LIMIT_EXCEEDED: 13075,
  CONCURRENT_MODIFICATION: 13076,
  OPTIMISTIC_LOCK_FAILURE: 13077,
  RESOURCE_CONFLICT: 13078,
  SERVICE_UNAVAILABLE: 13079,
  MAINTENANCE_MODE: 13080,
} as const;

export type FlashSalesDealsBusinessErrorCode =
  (typeof FlashSalesDealsBusinessErrors)[keyof typeof FlashSalesDealsBusinessErrors];

// ==================== HTTP Status Messages ====================

export const FlashSalesDealsHttpStatusMessages: Record<FlashSalesDealsHttpStatusCode, string> = {
  [FlashSalesDealsHttpStatus.OK]: 'Success',
  [FlashSalesDealsHttpStatus.CREATED]: 'Flash sale created successfully',
  [FlashSalesDealsHttpStatus.ACCEPTED]: 'Flash sale request accepted',
  [FlashSalesDealsHttpStatus.NON_AUTHORITATIVE_INFORMATION]: 'Non-authoritative information',
  [FlashSalesDealsHttpStatus.NO_CONTENT]: 'No content',
  [FlashSalesDealsHttpStatus.RESET_CONTENT]: 'Reset content',
  [FlashSalesDealsHttpStatus.PARTIAL_CONTENT]: 'Partial content',

  [FlashSalesDealsHttpStatus.MULTIPLE_CHOICES]: 'Multiple choices',
  [FlashSalesDealsHttpStatus.MOVED_PERMANENTLY]: 'Moved permanently',
  [FlashSalesDealsHttpStatus.FOUND]: 'Found',
  [FlashSalesDealsHttpStatus.SEE_OTHER]: 'See other',
  [FlashSalesDealsHttpStatus.NOT_MODIFIED]: 'Not modified',
  [FlashSalesDealsHttpStatus.USE_PROXY]: 'Use proxy',
  [FlashSalesDealsHttpStatus.SWITCH_PROXY]: 'Switch proxy',
  [FlashSalesDealsHttpStatus.TEMPORARY_REDIRECT]: 'Temporary redirect',
  [FlashSalesDealsHttpStatus.PERMANENT_REDIRECT]: 'Permanent redirect',

  [FlashSalesDealsHttpStatus.BAD_REQUEST]: 'Bad request',
  [FlashSalesDealsHttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [FlashSalesDealsHttpStatus.PAYMENT_REQUIRED]: 'Payment required',
  [FlashSalesDealsHttpStatus.FORBIDDEN]: 'Forbidden',
  [FlashSalesDealsHttpStatus.NOT_FOUND]: 'Resource not found',
  [FlashSalesDealsHttpStatus.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [FlashSalesDealsHttpStatus.NOT_ACCEPTABLE]: 'Not acceptable',
  [FlashSalesDealsHttpStatus.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy authentication required',
  [FlashSalesDealsHttpStatus.REQUEST_TIMEOUT]: 'Request timeout',
  [FlashSalesDealsHttpStatus.CONFLICT]: 'Resource conflict',
  [FlashSalesDealsHttpStatus.GONE]: 'Resource gone',
  [FlashSalesDealsHttpStatus.LENGTH_REQUIRED]: 'Length required',
  [FlashSalesDealsHttpStatus.PRECONDITION_FAILED]: 'Precondition failed',
  [FlashSalesDealsHttpStatus.PAYLOAD_TOO_LARGE]: 'Payload too large',
  [FlashSalesDealsHttpStatus.URI_TOO_LONG]: 'URI too long',
  [FlashSalesDealsHttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported media type',
  [FlashSalesDealsHttpStatus.RANGE_NOT_SATISFIABLE]: 'Range not satisfiable',
  [FlashSalesDealsHttpStatus.EXPECTATION_FAILED]: 'Expectation failed',
  [FlashSalesDealsHttpStatus.IM_A_TEAPOT]: 'Im a teapot',
  [FlashSalesDealsHttpStatus.MISDIRECTED_REQUEST]: 'Misdirected request',
  [FlashSalesDealsHttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
  [FlashSalesDealsHttpStatus.LOCKED]: 'Resource locked',
  [FlashSalesDealsHttpStatus.FAILED_DEPENDENCY]: 'Failed dependency',
  [FlashSalesDealsHttpStatus.TOO_EARLY]: 'Too early',
  [FlashSalesDealsHttpStatus.UPGRADE_REQUIRED]: 'Upgrade required',
  [FlashSalesDealsHttpStatus.PRECONDITION_REQUIRED]: 'Precondition required',
  [FlashSalesDealsHttpStatus.TOO_MANY_REQUESTS]: 'Too many requests',
  [FlashSalesDealsHttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request header fields too large',
  [FlashSalesDealsHttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable for legal reasons',

  [FlashSalesDealsHttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [FlashSalesDealsHttpStatus.NOT_IMPLEMENTED]: 'Not implemented',
  [FlashSalesDealsHttpStatus.BAD_GATEWAY]: 'Bad gateway',
  [FlashSalesDealsHttpStatus.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [FlashSalesDealsHttpStatus.GATEWAY_TIMEOUT]: 'Gateway timeout',
  [FlashSalesDealsHttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP version not supported',
  [FlashSalesDealsHttpStatus.VARIANT_ALSO_NEGOTIATES]: 'Variant also negotiates',
  [FlashSalesDealsHttpStatus.INSUFFICIENT_STORAGE]: 'Insufficient storage',
  [FlashSalesDealsHttpStatus.LOOP_DETECTED]: 'Loop detected',
  [FlashSalesDealsHttpStatus.NOT_EXTENDED]: 'Not extended',
  [FlashSalesDealsHttpStatus.NETWORK_AUTHENTICATION_REQUIRED]: 'Network authentication required',
};

// ==================== Business Error Messages ====================

export const FlashSalesDealsBusinessErrorMessages: Record<
  FlashSalesDealsBusinessErrorCode,
  string
> = {
  [FlashSalesDealsBusinessErrors.FLASH_SALE_NOT_FOUND]: 'Flash sale not found',
  [FlashSalesDealsBusinessErrors.FLASH_SALE_EXPIRED]: 'Flash sale has expired',
  [FlashSalesDealsBusinessErrors.FLASH_SALE_NOT_STARTED]: 'Flash sale has not started yet',
  [FlashSalesDealsBusinessErrors.FLASH_SALE_ENDED]: 'Flash sale has ended',
  [FlashSalesDealsBusinessErrors.FLASH_SALE_FULLY_BOOKED]: 'Flash sale is fully booked',
  [FlashSalesDealsBusinessErrors.FLASH_SALE_ALREADY_STARTED]: 'Flash sale already started',
  [FlashSalesDealsBusinessErrors.FLASH_SALE_ALREADY_ENDED]: 'Flash sale already ended',
  [FlashSalesDealsBusinessErrors.FLASH_SALE_INVALID_STATUS]: 'Invalid flash sale status',
  [FlashSalesDealsBusinessErrors.FLASH_SALE_SCHEDULE_CONFLICT]: 'Schedule conflict detected',
  [FlashSalesDealsBusinessErrors.FLASH_SALE_PARTICIPANT_LIMIT]: 'Participant limit reached',

  [FlashSalesDealsBusinessErrors.DEAL_NOT_FOUND]: 'Deal not found',
  [FlashSalesDealsBusinessErrors.DEAL_EXPIRED]: 'Deal has expired',
  [FlashSalesDealsBusinessErrors.DEAL_INACTIVE]: 'Deal is inactive',
  [FlashSalesDealsBusinessErrors.DEAL_ALREADY_ACTIVE]: 'Deal already active',
  [FlashSalesDealsBusinessErrors.DEAL_ALREADY_EXPIRED]: 'Deal already expired',
  [FlashSalesDealsBusinessErrors.DEAL_INVALID_TYPE]: 'Invalid deal type',
  [FlashSalesDealsBusinessErrors.DEAL_PRIORITY_CONFLICT]: 'Priority conflict detected',
  [FlashSalesDealsBusinessErrors.DEAL_DISCOUNT_INVALID]: 'Invalid discount value',
  [FlashSalesDealsBusinessErrors.DEAL_RESTRICTION_VIOLATION]: 'Restriction violation',
  [FlashSalesDealsBusinessErrors.DEAL_TARGET_INVALID]: 'Invalid target audience',

  [FlashSalesDealsBusinessErrors.INVENTORY_INSUFFICIENT]: 'Insufficient inventory',
  [FlashSalesDealsBusinessErrors.INVENTORY_EXCEEDED]: 'Inventory limit exceeded',
  [FlashSalesDealsBusinessErrors.INVENTORY_LOCK_FAILED]: 'Inventory lock failed',
  [FlashSalesDealsBusinessErrors.INVENTORY_RESERVATION_FAILED]: 'Inventory reservation failed',
  [FlashSalesDealsBusinessErrors.INVENTORY_RELEASE_FAILED]: 'Inventory release failed',
  [FlashSalesDealsBusinessErrors.INVENTORY_SYNC_FAILED]: 'Inventory sync failed',
  [FlashSalesDealsBusinessErrors.INVENTORY_NOT_FOUND]: 'Inventory not found',
  [FlashSalesDealsBusinessErrors.INVENTORY_UPDATE_FAILED]: 'Inventory update failed',

  [FlashSalesDealsBusinessErrors.PRICE_CHANGED]: 'Price has changed',
  [FlashSalesDealsBusinessErrors.PRICE_INVALID]: 'Invalid price',
  [FlashSalesDealsBusinessErrors.PRICE_NOT_FOUND]: 'Price not found',
  [FlashSalesDealsBusinessErrors.PRICE_UPDATE_FAILED]: 'Price update failed',
  [FlashSalesDealsBusinessErrors.PRICE_DISCOUNT_INVALID]: 'Invalid discount price',

  [FlashSalesDealsBusinessErrors.COUPON_INVALID]: 'Invalid coupon code',
  [FlashSalesDealsBusinessErrors.COUPON_EXPIRED]: 'Coupon has expired',
  [FlashSalesDealsBusinessErrors.COUPON_ALREADY_USED]: 'Coupon already used',
  [FlashSalesDealsBusinessErrors.COUPON_LIMIT_EXCEEDED]: 'Coupon limit exceeded',
  [FlashSalesDealsBusinessErrors.COUPON_NOT_APPLICABLE]: 'Coupon not applicable',
  [FlashSalesDealsBusinessErrors.VOUCHER_INVALID]: 'Invalid voucher code',
  [FlashSalesDealsBusinessErrors.VOUCHER_EXPIRED]: 'Voucher has expired',
  [FlashSalesDealsBusinessErrors.VOUCHER_ALREADY_USED]: 'Voucher already used',
  [FlashSalesDealsBusinessErrors.VOUCHER_LIMIT_EXCEEDED]: 'Voucher limit exceeded',
  [FlashSalesDealsBusinessErrors.VOUCHER_NOT_APPLICABLE]: 'Voucher not applicable',

  [FlashSalesDealsBusinessErrors.RULE_VIOLATION]: 'Rule violation',
  [FlashSalesDealsBusinessErrors.RULE_NOT_FOUND]: 'Rule not found',
  [FlashSalesDealsBusinessErrors.RULE_EXECUTION_FAILED]: 'Rule execution failed',
  [FlashSalesDealsBusinessErrors.RULE_INVALID_CONFIG]: 'Invalid rule configuration',
  [FlashSalesDealsBusinessErrors.RULE_PRIORITY_CONFLICT]: 'Rule priority conflict',
  [FlashSalesDealsBusinessErrors.VALIDATION_FAILED]: 'Validation failed',
  [FlashSalesDealsBusinessErrors.PARTICIPANT_LIMIT_REACHED]: 'Participant limit reached',
  [FlashSalesDealsBusinessErrors.PARTICIPANT_ALREADY_JOINED]: 'Already joined',
  [FlashSalesDealsBusinessErrors.PARTICIPANT_NOT_FOUND]: 'Participant not found',
  [FlashSalesDealsBusinessErrors.PARTICIPANT_INVALID_STATUS]: 'Invalid participant status',

  [FlashSalesDealsBusinessErrors.NOTIFICATION_FAILED]: 'Notification failed',
  [FlashSalesDealsBusinessErrors.NOTIFICATION_INVALID]: 'Invalid notification',
  [FlashSalesDealsBusinessErrors.NOTIFICATION_LIMIT_EXCEEDED]: 'Notification limit exceeded',
  [FlashSalesDealsBusinessErrors.SHARE_FAILED]: 'Share failed',
  [FlashSalesDealsBusinessErrors.SHARE_INVALID_LINK]: 'Invalid share link',
  [FlashSalesDealsBusinessErrors.SHARE_LIMIT_EXCEEDED]: 'Share limit exceeded',
  [FlashSalesDealsBusinessErrors.WISHLIST_ALREADY_EXISTS]: 'Already in wishlist',
  [FlashSalesDealsBusinessErrors.WISHLIST_NOT_FOUND]: 'Wishlist item not found',
  [FlashSalesDealsBusinessErrors.WISHLIST_LIMIT_EXCEEDED]: 'Wishlist limit exceeded',

  [FlashSalesDealsBusinessErrors.DATABASE_ERROR]: 'Database error',
  [FlashSalesDealsBusinessErrors.CACHE_ERROR]: 'Cache error',
  [FlashSalesDealsBusinessErrors.QUEUE_ERROR]: 'Queue error',
  [FlashSalesDealsBusinessErrors.THIRD_PARTY_ERROR]: 'Third party service error',
  [FlashSalesDealsBusinessErrors.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
  [FlashSalesDealsBusinessErrors.CONCURRENT_MODIFICATION]: 'Concurrent modification',
  [FlashSalesDealsBusinessErrors.OPTIMISTIC_LOCK_FAILURE]: 'Optimistic lock failure',
  [FlashSalesDealsBusinessErrors.RESOURCE_CONFLICT]: 'Resource conflict',
  [FlashSalesDealsBusinessErrors.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [FlashSalesDealsBusinessErrors.MAINTENANCE_MODE]: 'Maintenance mode',
};

// ==================== Status Categories ====================

// Using readonly arrays with const assertion
const SUCCESS_CODES = [200, 201, 202, 203, 204, 205, 206] as const;
const REDIRECTION_CODES = [300, 301, 302, 303, 304, 305, 306, 307, 308] as const;
const CLIENT_ERROR_CODES = [
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
  421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
] as const;
const SERVER_ERROR_CODES = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511] as const;

export const FlashSalesDealsHttpStatusCategories = {
  SUCCESS: SUCCESS_CODES,
  REDIRECTION: REDIRECTION_CODES,
  CLIENT_ERROR: CLIENT_ERROR_CODES,
  SERVER_ERROR: SERVER_ERROR_CODES,
} as const;

export type FlashSalesDealsHttpStatusCategory = keyof typeof FlashSalesDealsHttpStatusCategories;

// ==================== Helper Functions ====================

export function isFlashSalesDealsBusinessError(
  code: number
): code is FlashSalesDealsBusinessErrorCode {
  return Object.values(FlashSalesDealsBusinessErrors).includes(
    code as FlashSalesDealsBusinessErrorCode
  );
}

export function getFlashSalesDealsErrorMessage(code: number): string {
  if (isFlashSalesDealsBusinessError(code)) {
    return FlashSalesDealsBusinessErrorMessages[code];
  }
  return (
    FlashSalesDealsHttpStatusMessages[code as FlashSalesDealsHttpStatusCode] || 'Unknown error'
  );
}

export function getFlashSalesDealsStatusCategory(
  code: number
): FlashSalesDealsHttpStatusCategory | 'BUSINESS_ERROR' {
  if (isFlashSalesDealsBusinessError(code)) {
    return 'BUSINESS_ERROR';
  }

  // Type-safe checking using type assertion
  const categories = FlashSalesDealsHttpStatusCategories;

  // Check each category
  if ((categories.SUCCESS as readonly number[]).includes(code)) {
    return 'SUCCESS';
  }
  if ((categories.REDIRECTION as readonly number[]).includes(code)) {
    return 'REDIRECTION';
  }
  if ((categories.CLIENT_ERROR as readonly number[]).includes(code)) {
    return 'CLIENT_ERROR';
  }
  if ((categories.SERVER_ERROR as readonly number[]).includes(code)) {
    return 'SERVER_ERROR';
  }

  return 'CLIENT_ERROR';
}
