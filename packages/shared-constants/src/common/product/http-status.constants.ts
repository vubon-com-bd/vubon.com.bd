/**
 * Product HTTP Status Codes Constants
 * Contains all HTTP status codes used in product management
 */

export const ProductHttpStatus = {
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

  // Custom Business Codes for Product
  PRODUCT_NOT_AVAILABLE: 6001,
  PRODUCT_OUT_OF_STOCK: 6002,
  PRODUCT_INVALID_SKU: 6003,
  PRODUCT_CATEGORY_NOT_FOUND: 6004,
  PRODUCT_BRAND_NOT_FOUND: 6005,
  PRODUCT_INVALID_PRICE: 6006,
  PRODUCT_DUPLICATE_SKU: 6007,
  PRODUCT_DISCONTINUED: 6008,
  PRODUCT_EXPIRED: 6009,
  PRODUCT_ALREADY_EXISTS: 6010,
  PRODUCT_IMAGE_UPLOAD_FAILED: 6011,
  PRODUCT_INVALID_ATTRIBUTE: 6012,
} as const;

// Type for HTTP Status Code
export type ProductHttpStatusCode = (typeof ProductHttpStatus)[keyof typeof ProductHttpStatus];

// Response message map
export const ProductHttpStatusMessages: Record<ProductHttpStatusCode, string> = {
  [ProductHttpStatus.OK]: 'Success',
  [ProductHttpStatus.CREATED]: 'Product created successfully',
  [ProductHttpStatus.ACCEPTED]: 'Product update accepted',
  [ProductHttpStatus.NON_AUTHORITATIVE_INFORMATION]: 'Non-authoritative information',
  [ProductHttpStatus.NO_CONTENT]: 'No content',
  [ProductHttpStatus.RESET_CONTENT]: 'Reset content',
  [ProductHttpStatus.PARTIAL_CONTENT]: 'Partial content',

  [ProductHttpStatus.MULTIPLE_CHOICES]: 'Multiple choices',
  [ProductHttpStatus.MOVED_PERMANENTLY]: 'Moved permanently',
  [ProductHttpStatus.FOUND]: 'Found',
  [ProductHttpStatus.SEE_OTHER]: 'See other',
  [ProductHttpStatus.NOT_MODIFIED]: 'Not modified',
  [ProductHttpStatus.USE_PROXY]: 'Use proxy',
  [ProductHttpStatus.TEMPORARY_REDIRECT]: 'Temporary redirect',
  [ProductHttpStatus.PERMANENT_REDIRECT]: 'Permanent redirect',

  [ProductHttpStatus.BAD_REQUEST]: 'Bad request',
  [ProductHttpStatus.UNAUTHORIZED]: 'Unauthorized',
  [ProductHttpStatus.PAYMENT_REQUIRED]: 'Payment required',
  [ProductHttpStatus.FORBIDDEN]: 'Forbidden',
  [ProductHttpStatus.NOT_FOUND]: 'Product not found',
  [ProductHttpStatus.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [ProductHttpStatus.NOT_ACCEPTABLE]: 'Not acceptable',
  [ProductHttpStatus.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy authentication required',
  [ProductHttpStatus.REQUEST_TIMEOUT]: 'Request timeout',
  [ProductHttpStatus.CONFLICT]: 'Conflict',
  [ProductHttpStatus.GONE]: 'Gone',
  [ProductHttpStatus.LENGTH_REQUIRED]: 'Length required',
  [ProductHttpStatus.PRECONDITION_FAILED]: 'Precondition failed',
  [ProductHttpStatus.PAYLOAD_TOO_LARGE]: 'Payload too large',
  [ProductHttpStatus.URI_TOO_LONG]: 'URI too long',
  [ProductHttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported media type',
  [ProductHttpStatus.RANGE_NOT_SATISFIABLE]: 'Range not satisfiable',
  [ProductHttpStatus.EXPECTATION_FAILED]: 'Expectation failed',
  [ProductHttpStatus.IM_A_TEAPOT]: 'Im a teapot',
  [ProductHttpStatus.MISDIRECTED_REQUEST]: 'Misdirected request',
  [ProductHttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
  [ProductHttpStatus.LOCKED]: 'Locked',
  [ProductHttpStatus.FAILED_DEPENDENCY]: 'Failed dependency',
  [ProductHttpStatus.TOO_EARLY]: 'Too early',
  [ProductHttpStatus.UPGRADE_REQUIRED]: 'Upgrade required',
  [ProductHttpStatus.PRECONDITION_REQUIRED]: 'Precondition required',
  [ProductHttpStatus.TOO_MANY_REQUESTS]: 'Too many requests',
  [ProductHttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request header fields too large',
  [ProductHttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS]: 'Unavailable for legal reasons',

  [ProductHttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [ProductHttpStatus.NOT_IMPLEMENTED]: 'Not implemented',
  [ProductHttpStatus.BAD_GATEWAY]: 'Bad gateway',
  [ProductHttpStatus.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [ProductHttpStatus.GATEWAY_TIMEOUT]: 'Gateway timeout',
  [ProductHttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP version not supported',
  [ProductHttpStatus.VARIANT_ALSO_NEGOTIATES]: 'Variant also negotiates',
  [ProductHttpStatus.INSUFFICIENT_STORAGE]: 'Insufficient storage',
  [ProductHttpStatus.LOOP_DETECTED]: 'Loop detected',
  [ProductHttpStatus.NOT_EXTENDED]: 'Not extended',
  [ProductHttpStatus.NETWORK_AUTHENTICATION_REQUIRED]: 'Network authentication required',

  // Custom business messages
  [ProductHttpStatus.PRODUCT_NOT_AVAILABLE]: 'Product is not available',
  [ProductHttpStatus.PRODUCT_OUT_OF_STOCK]: 'Product is out of stock',
  [ProductHttpStatus.PRODUCT_INVALID_SKU]: 'Invalid SKU format',
  [ProductHttpStatus.PRODUCT_CATEGORY_NOT_FOUND]: 'Product category not found',
  [ProductHttpStatus.PRODUCT_BRAND_NOT_FOUND]: 'Product brand not found',
  [ProductHttpStatus.PRODUCT_INVALID_PRICE]: 'Invalid product price',
  [ProductHttpStatus.PRODUCT_DUPLICATE_SKU]: 'Duplicate SKU found',
  [ProductHttpStatus.PRODUCT_DISCONTINUED]: 'Product has been discontinued',
  [ProductHttpStatus.PRODUCT_EXPIRED]: 'Product has expired',
  [ProductHttpStatus.PRODUCT_ALREADY_EXISTS]: 'Product already exists',
  [ProductHttpStatus.PRODUCT_IMAGE_UPLOAD_FAILED]: 'Product image upload failed',
  [ProductHttpStatus.PRODUCT_INVALID_ATTRIBUTE]: 'Invalid product attribute',
};

// Helper function to get status message
export const getProductHttpStatusMessage = (code: number): string => {
  return ProductHttpStatusMessages[code as ProductHttpStatusCode] || 'Unknown status code';
};

// Helper to check if status is success
export const isProductHttpSuccess = (code: number): boolean => {
  return code >= 200 && code < 300;
};

// Helper to check if status is client error
export const isProductHttpClientError = (code: number): boolean => {
  return code >= 400 && code < 500;
};

// Helper to check if status is server error
export const isProductHttpServerError = (code: number): boolean => {
  return code >= 500 && code < 600;
};
