/**
 * Error Constants
 * Common error codes, error types, and error messages
 */

/**
 * Error codes for different modules
 */
export const ERROR_CODE = {
  // System errors (1000-1999)
  SYSTEM_ERROR: 'ERR_SYSTEM_001',
  SYSTEM_MAINTENANCE: 'ERR_SYSTEM_002',
  SYSTEM_OVERLOAD: 'ERR_SYSTEM_003',
  SYSTEM_UNKNOWN: 'ERR_SYSTEM_999',

  // Validation errors (2000-2999)
  VALIDATION_ERROR: 'ERR_VALIDATION_001',
  INVALID_INPUT: 'ERR_VALIDATION_002',
  INVALID_EMAIL: 'ERR_VALIDATION_003',
  INVALID_PHONE: 'ERR_VALIDATION_004',
  INVALID_PASSWORD: 'ERR_VALIDATION_005',
  INVALID_USERNAME: 'ERR_VALIDATION_006',
  INVALID_URL: 'ERR_VALIDATION_007',
  INVALID_UUID: 'ERR_VALIDATION_008',
  INVALID_DATE: 'ERR_VALIDATION_009',
  INVALID_AMOUNT: 'ERR_VALIDATION_010',
  INVALID_STATUS: 'ERR_VALIDATION_011',
  INVALID_TYPE: 'ERR_VALIDATION_012',
  INVALID_ENUM: 'ERR_VALIDATION_013',
  INVALID_LENGTH: 'ERR_VALIDATION_014',
  INVALID_RANGE: 'ERR_VALIDATION_015',
  INVALID_FORMAT: 'ERR_VALIDATION_016',
  INVALID_FILE: 'ERR_VALIDATION_017',
  INVALID_FILE_SIZE: 'ERR_VALIDATION_018',
  INVALID_FILE_TYPE: 'ERR_VALIDATION_019',
  INVALID_IMAGE: 'ERR_VALIDATION_020',
  INVALID_CREDIT_CARD: 'ERR_VALIDATION_021',

  // Authentication errors (3000-3999)
  AUTH_ERROR: 'ERR_AUTH_001',
  UNAUTHORIZED: 'ERR_AUTH_002',
  FORBIDDEN: 'ERR_AUTH_003',
  INVALID_CREDENTIALS: 'ERR_AUTH_004',
  INVALID_TOKEN: 'ERR_AUTH_005',
  EXPIRED_TOKEN: 'ERR_AUTH_006',
  REVOKED_TOKEN: 'ERR_AUTH_007',
  INVALID_REFRESH_TOKEN: 'ERR_AUTH_008',
  EXPIRED_REFRESH_TOKEN: 'ERR_AUTH_009',
  INVALID_OTP: 'ERR_AUTH_010',
  EXPIRED_OTP: 'ERR_AUTH_011',
  INVALID_SESSION: 'ERR_AUTH_012',
  EXPIRED_SESSION: 'ERR_AUTH_013',
  ACCOUNT_LOCKED: 'ERR_AUTH_014',
  ACCOUNT_DISABLED: 'ERR_AUTH_015',
  ACCOUNT_DELETED: 'ERR_AUTH_016',
  TOO_MANY_ATTEMPTS: 'ERR_AUTH_017',
  PASSWORD_MISMATCH: 'ERR_AUTH_018',
  PASSWORD_WEAK: 'ERR_AUTH_019',
  PASSWORD_EXPIRED: 'ERR_AUTH_020',
  PASSWORD_ALREADY_USED: 'ERR_AUTH_021',
  EMAIL_NOT_VERIFIED: 'ERR_AUTH_022',
  PHONE_NOT_VERIFIED: 'ERR_AUTH_023',
  MFA_REQUIRED: 'ERR_AUTH_024',
  MFA_INVALID: 'ERR_AUTH_025',
  MFA_NOT_ENABLED: 'ERR_AUTH_026',
  TWO_FACTOR_REQUIRED: 'ERR_AUTH_027',
  TWO_FACTOR_INVALID: 'ERR_AUTH_028',
  DEVICE_NOT_RECOGNIZED: 'ERR_AUTH_029',
  IP_BLOCKED: 'ERR_AUTH_030',

  // Authorization errors (4000-4999)
  PERMISSION_DENIED: 'ERR_AUTH_401',
  INSUFFICIENT_PERMISSIONS: 'ERR_AUTH_402',
  ROLE_NOT_FOUND: 'ERR_AUTH_403',
  PERMISSION_NOT_FOUND: 'ERR_AUTH_404',
  RESOURCE_NOT_OWNED: 'ERR_AUTH_405',
  ADMIN_REQUIRED: 'ERR_AUTH_406',
  SUPER_ADMIN_REQUIRED: 'ERR_AUTH_407',
  VENDOR_REQUIRED: 'ERR_AUTH_408',
  USER_REQUIRED: 'ERR_AUTH_409',
  MODERATOR_REQUIRED: 'ERR_AUTH_410',

  // Not found errors (5000-5999)
  NOT_FOUND: 'ERR_NOT_FOUND_001',
  USER_NOT_FOUND: 'ERR_NOT_FOUND_002',
  ADMIN_NOT_FOUND: 'ERR_NOT_FOUND_003',
  VENDOR_NOT_FOUND: 'ERR_NOT_FOUND_004',
  PRODUCT_NOT_FOUND: 'ERR_NOT_FOUND_005',
  CATEGORY_NOT_FOUND: 'ERR_NOT_FOUND_006',
  BRAND_NOT_FOUND: 'ERR_NOT_FOUND_007',
  ORDER_NOT_FOUND: 'ERR_NOT_FOUND_008',
  CART_NOT_FOUND: 'ERR_NOT_FOUND_009',
  PAYMENT_NOT_FOUND: 'ERR_NOT_FOUND_010',
  TRANSACTION_NOT_FOUND: 'ERR_NOT_FOUND_011',
  SHIPMENT_NOT_FOUND: 'ERR_NOT_FOUND_012',
  REVIEW_NOT_FOUND: 'ERR_NOT_FOUND_013',
  COUPON_NOT_FOUND: 'ERR_NOT_FOUND_014',
  FLASH_SALE_NOT_FOUND: 'ERR_NOT_FOUND_015',
  DEAL_NOT_FOUND: 'ERR_NOT_FOUND_016',
  INVENTORY_NOT_FOUND: 'ERR_NOT_FOUND_017',
  WAREHOUSE_NOT_FOUND: 'ERR_NOT_FOUND_018',
  SHIPPING_METHOD_NOT_FOUND: 'ERR_NOT_FOUND_019',
  TAX_RULE_NOT_FOUND: 'ERR_NOT_FOUND_020',
  DISCOUNT_NOT_FOUND: 'ERR_NOT_FOUND_021',
  SETTINGS_NOT_FOUND: 'ERR_NOT_FOUND_022',
  CONFIG_NOT_FOUND: 'ERR_NOT_FOUND_023',
  TEMPLATE_NOT_FOUND: 'ERR_NOT_FOUND_024',
  FILE_NOT_FOUND: 'ERR_NOT_FOUND_025',
  SESSION_NOT_FOUND: 'ERR_NOT_FOUND_026',
  NOTIFICATION_NOT_FOUND: 'ERR_NOT_FOUND_027',
  REPORT_NOT_FOUND: 'ERR_NOT_FOUND_028',
  ANALYTICS_NOT_FOUND: 'ERR_NOT_FOUND_029',

  // Duplicate errors (6000-6999)
  DUPLICATE_ENTRY: 'ERR_DUPLICATE_001',
  DUPLICATE_EMAIL: 'ERR_DUPLICATE_002',
  DUPLICATE_PHONE: 'ERR_DUPLICATE_003',
  DUPLICATE_USERNAME: 'ERR_DUPLICATE_004',
  DUPLICATE_PRODUCT: 'ERR_DUPLICATE_005',
  DUPLICATE_CATEGORY: 'ERR_DUPLICATE_006',
  DUPLICATE_BRAND: 'ERR_DUPLICATE_007',
  DUPLICATE_COUPON: 'ERR_DUPLICATE_008',
  DUPLICATE_ORDER: 'ERR_DUPLICATE_009',
  DUPLICATE_TRANSACTION: 'ERR_DUPLICATE_010',
  DUPLICATE_SHIPMENT: 'ERR_DUPLICATE_011',
  DUPLICATE_REVIEW: 'ERR_DUPLICATE_012',
  DUPLICATE_KEY: 'ERR_DUPLICATE_013',

  // Conflict errors (7000-7999)
  CONFLICT: 'ERR_CONFLICT_001',
  ORDER_CONFLICT: 'ERR_CONFLICT_002',
  PAYMENT_CONFLICT: 'ERR_CONFLICT_003',
  INVENTORY_CONFLICT: 'ERR_CONFLICT_004',
  SHIPPING_CONFLICT: 'ERR_CONFLICT_005',
  CART_CONFLICT: 'ERR_CONFLICT_006',
  COUPON_CONFLICT: 'ERR_CONFLICT_007',
  FLASH_SALE_CONFLICT: 'ERR_CONFLICT_008',

  // Business errors (8000-8999)
  BUSINESS_ERROR: 'ERR_BUSINESS_001',
  INSUFFICIENT_STOCK: 'ERR_BUSINESS_002',
  INSUFFICIENT_BALANCE: 'ERR_BUSINESS_003',
  INSUFFICIENT_CREDIT: 'ERR_BUSINESS_004',
  ORDER_CANCELLED: 'ERR_BUSINESS_005',
  ORDER_COMPLETED: 'ERR_BUSINESS_006',
  PAYMENT_FAILED: 'ERR_BUSINESS_007',
  PAYMENT_PENDING: 'ERR_BUSINESS_008',
  PAYMENT_REFUNDED: 'ERR_BUSINESS_009',
  SHIPMENT_DELAYED: 'ERR_BUSINESS_010',
  SHIPMENT_FAILED: 'ERR_BUSINESS_011',
  COUPON_EXPIRED: 'ERR_BUSINESS_012',
  COUPON_USED: 'ERR_BUSINESS_013',
  COUPON_INVALID: 'ERR_BUSINESS_014',
  FLASH_SALE_EXPIRED: 'ERR_BUSINESS_015',
  FLASH_SALE_FULL: 'ERR_BUSINESS_016',
  DEAL_EXPIRED: 'ERR_BUSINESS_017',
  DEAL_FULL: 'ERR_BUSINESS_018',
  MINIMUM_ORDER_AMOUNT: 'ERR_BUSINESS_019',
  MAXIMUM_ORDER_AMOUNT: 'ERR_BUSINESS_020',
  SHIPPING_NOT_AVAILABLE: 'ERR_BUSINESS_021',
  DELIVERY_NOT_AVAILABLE: 'ERR_BUSINESS_022',
  PICKUP_NOT_AVAILABLE: 'ERR_BUSINESS_023',
  RETURN_EXPIRED: 'ERR_BUSINESS_024',
  REFUND_EXPIRED: 'ERR_BUSINESS_025',
  WARRANTY_EXPIRED: 'ERR_BUSINESS_026',
  VENDOR_SUSPENDED: 'ERR_BUSINESS_027',
  VENDOR_INACTIVE: 'ERR_BUSINESS_028',
  USER_SUSPENDED: 'ERR_BUSINESS_029',
  USER_INACTIVE: 'ERR_BUSINESS_030',

  // Database errors (9000-9999)
  DATABASE_ERROR: 'ERR_DB_001',
  DATABASE_CONNECTION: 'ERR_DB_002',
  DATABASE_TIMEOUT: 'ERR_DB_003',
  DATABASE_QUERY: 'ERR_DB_004',
  DATABASE_INSERT: 'ERR_DB_005',
  DATABASE_UPDATE: 'ERR_DB_006',
  DATABASE_DELETE: 'ERR_DB_007',
  DATABASE_TRANSACTION: 'ERR_DB_008',
  DATABASE_LOCK: 'ERR_DB_009',
  DATABASE_DEADLOCK: 'ERR_DB_010',

  // External service errors (10000-10999)
  EXTERNAL_ERROR: 'ERR_EXTERNAL_001',
  API_ERROR: 'ERR_EXTERNAL_002',
  API_TIMEOUT: 'ERR_EXTERNAL_003',
  API_RATE_LIMIT: 'ERR_EXTERNAL_004',
  API_UNAVAILABLE: 'ERR_EXTERNAL_005',
  THIRD_PARTY_ERROR: 'ERR_EXTERNAL_006',
  WEBHOOK_ERROR: 'ERR_EXTERNAL_007',
  WEBHOOK_DELIVERY: 'ERR_EXTERNAL_008',
  PAYMENT_GATEWAY_ERROR: 'ERR_EXTERNAL_009',
  PAYMENT_GATEWAY_TIMEOUT: 'ERR_EXTERNAL_010',
  PAYMENT_GATEWAY_FAILED: 'ERR_EXTERNAL_011',
  SHIPPING_GATEWAY_ERROR: 'ERR_EXTERNAL_012',
  SMS_GATEWAY_ERROR: 'ERR_EXTERNAL_013',
  EMAIL_GATEWAY_ERROR: 'ERR_EXTERNAL_014',
  CLOUD_STORAGE_ERROR: 'ERR_EXTERNAL_015',
  CLOUD_STORAGE_UPLOAD: 'ERR_EXTERNAL_016',
  CLOUD_STORAGE_DOWNLOAD: 'ERR_EXTERNAL_017',
  CACHE_ERROR: 'ERR_EXTERNAL_018',
  CACHE_READ: 'ERR_EXTERNAL_019',
  CACHE_WRITE: 'ERR_EXTERNAL_020',
  QUEUE_ERROR: 'ERR_EXTERNAL_021',
  QUEUE_PUBLISH: 'ERR_EXTERNAL_022',
  QUEUE_CONSUME: 'ERR_EXTERNAL_023',
  SEARCH_INDEX_ERROR: 'ERR_EXTERNAL_024',
  SEARCH_QUERY_ERROR: 'ERR_EXTERNAL_025',
  ANALYTICS_ERROR: 'ERR_EXTERNAL_026',
  REPORT_GENERATION_ERROR: 'ERR_EXTERNAL_027',

  // Security errors (11000-11999)
  SECURITY_ERROR: 'ERR_SECURITY_001',
  CSRF_ERROR: 'ERR_SECURITY_002',
  XSS_ERROR: 'ERR_SECURITY_003',
  SQL_INJECTION: 'ERR_SECURITY_004',
  FILE_UPLOAD_ERROR: 'ERR_SECURITY_005',
  MALICIOUS_FILE: 'ERR_SECURITY_006',
  SUSPICIOUS_ACTIVITY: 'ERR_SECURITY_008',
  IP_ABUSE: 'ERR_SECURITY_009',
  DEVICE_ABUSE: 'ERR_SECURITY_010',

  // Network errors (12000-12999)
  NETWORK_ERROR: 'ERR_NETWORK_001',
  CONNECTION_ERROR: 'ERR_NETWORK_002',
  CONNECTION_TIMEOUT: 'ERR_NETWORK_003',
  DNS_ERROR: 'ERR_NETWORK_004',
  SSL_ERROR: 'ERR_NETWORK_005',

  // File errors (13000-13999)
  FILE_ERROR: 'ERR_FILE_001',
  FILE_UPLOAD: 'ERR_FILE_002',
  FILE_DOWNLOAD: 'ERR_FILE_003',
  FILE_READ: 'ERR_FILE_004',
  FILE_WRITE: 'ERR_FILE_005',
  FILE_DELETE: 'ERR_FILE_006',
  FILE_CONVERT: 'ERR_FILE_007',
  FILE_COMPRESS: 'ERR_FILE_008',
  FILE_ENCRYPT: 'ERR_FILE_009',
  FILE_DECRYPT: 'ERR_FILE_010',

  // Import/Export errors (14000-14999)
  IMPORT_ERROR: 'ERR_IMPORT_001',
  IMPORT_INVALID: 'ERR_IMPORT_002',
  IMPORT_PARTIAL: 'ERR_IMPORT_003',
  EXPORT_ERROR: 'ERR_EXPORT_001',
  EXPORT_FAILED: 'ERR_EXPORT_002',

  // Schedule errors (15000-15999)
  SCHEDULE_ERROR: 'ERR_SCHEDULE_001',
  SCHEDULE_CONFLICT: 'ERR_SCHEDULE_002',
  SCHEDULE_EXPIRED: 'ERR_SCHEDULE_003',

  // Notification errors (16000-16999)
  NOTIFICATION_ERROR: 'ERR_NOTIFICATION_001',
  NOTIFICATION_SEND: 'ERR_NOTIFICATION_002',
  NOTIFICATION_DELIVERY: 'ERR_NOTIFICATION_003',
  NOTIFICATION_TEMPLATE: 'ERR_NOTIFICATION_004',

  // Webhook errors (17000-17999)
  WEBHOOK_SEND: 'ERR_WEBHOOK_001',
  WEBHOOK_RECEIVE: 'ERR_WEBHOOK_002',
  WEBHOOK_SIGNATURE: 'ERR_WEBHOOK_003',

  // Rate limit errors (18000-18999)
  RATE_LIMIT_EXCEEDED: 'ERR_RATE_LIMIT_001',
  RATE_LIMIT_BURST: 'ERR_RATE_LIMIT_002',
  RATE_LIMIT_CONCURRENT: 'ERR_RATE_LIMIT_003',

  // Version errors (19000-19999)
  VERSION_INCOMPATIBLE: 'ERR_VERSION_001',
  VERSION_MISMATCH: 'ERR_VERSION_002',
  VERSION_EXPIRED: 'ERR_VERSION_003',

  // Configuration errors (20000-20999)
  CONFIG_ERROR: 'ERR_CONFIG_001',
  CONFIG_INVALID: 'ERR_CONFIG_002',
  CONFIG_MISSING: 'ERR_CONFIG_003',
  CONFIG_TYPE: 'ERR_CONFIG_004',

  // Cache errors (21000-21999)
  CACHE_MISS: 'ERR_CACHE_001',
  CACHE_EXPIRED: 'ERR_CACHE_002',
  CACHE_INVALID: 'ERR_CACHE_003',

  // State errors (22000-22999)
  INVALID_STATE: 'ERR_STATE_001',
  STATE_CONFLICT: 'ERR_STATE_002',
  STATE_TRANSITION: 'ERR_STATE_003',

  // Timeout errors (23000-23999)
  TIMEOUT: 'ERR_TIMEOUT_001',
  OPERATION_TIMEOUT: 'ERR_TIMEOUT_002',
  PROCESS_TIMEOUT: 'ERR_TIMEOUT_003',

  // Lock errors (24000-24999)
  LOCK_ERROR: 'ERR_LOCK_001',
  LOCK_TIMEOUT: 'ERR_LOCK_002',
  LOCK_CONFLICT: 'ERR_LOCK_003',

  // Transaction errors (25000-25999)
  TRANSACTION_ERROR: 'ERR_TRANSACTION_001',
  TRANSACTION_FAILED: 'ERR_TRANSACTION_002',
  TRANSACTION_TIMEOUT: 'ERR_TRANSACTION_003',
  TRANSACTION_CANCELLED: 'ERR_TRANSACTION_004',

  // Dependency errors (26000-26999)
  DEPENDENCY_ERROR: 'ERR_DEPENDENCY_001',
  DEPENDENCY_FAILED: 'ERR_DEPENDENCY_002',
  DEPENDENCY_UNAVAILABLE: 'ERR_DEPENDENCY_003',

  // Server errors (27000-27999)
  SERVER_ERROR: 'ERR_SERVER_001',
  SERVER_BUSY: 'ERR_SERVER_002',
  SERVER_OVERLOAD: 'ERR_SERVER_003',

  // Service errors (28000-28999)
  SERVICE_ERROR: 'ERR_SERVICE_001',
  SERVICE_UNAVAILABLE: 'ERR_SERVICE_002',
  SERVICE_TIMEOUT: 'ERR_SERVICE_003',

  // Resource errors (29000-29999)
  RESOURCE_LIMIT: 'ERR_RESOURCE_001',
  RESOURCE_EXHAUSTED: 'ERR_RESOURCE_002',
  RESOURCE_UNAVAILABLE: 'ERR_RESOURCE_003',
} as const;

/**
 * Error messages for different error codes
 */
export const ERROR_MESSAGES: Record<string, string> = {
  // System errors
  [ERROR_CODE.SYSTEM_ERROR]: 'A system error occurred',
  [ERROR_CODE.SYSTEM_MAINTENANCE]: 'System is under maintenance',
  [ERROR_CODE.SYSTEM_OVERLOAD]: 'System is overloaded',
  [ERROR_CODE.SYSTEM_UNKNOWN]: 'An unknown system error occurred',

  // Validation errors
  [ERROR_CODE.VALIDATION_ERROR]: 'Validation failed',
  [ERROR_CODE.INVALID_INPUT]: 'Invalid input provided',
  [ERROR_CODE.INVALID_EMAIL]: 'Invalid email address',
  [ERROR_CODE.INVALID_PHONE]: 'Invalid phone number',
  [ERROR_CODE.INVALID_PASSWORD]: 'Invalid password format',
  [ERROR_CODE.INVALID_USERNAME]: 'Invalid username format',
  [ERROR_CODE.INVALID_URL]: 'Invalid URL format',
  [ERROR_CODE.INVALID_UUID]: 'Invalid UUID format',
  [ERROR_CODE.INVALID_DATE]: 'Invalid date format',
  [ERROR_CODE.INVALID_AMOUNT]: 'Invalid amount',
  [ERROR_CODE.INVALID_STATUS]: 'Invalid status',
  [ERROR_CODE.INVALID_TYPE]: 'Invalid type',
  [ERROR_CODE.INVALID_ENUM]: 'Invalid enum value',
  [ERROR_CODE.INVALID_LENGTH]: 'Invalid length',
  [ERROR_CODE.INVALID_RANGE]: 'Invalid range',
  [ERROR_CODE.INVALID_FORMAT]: 'Invalid format',
  [ERROR_CODE.INVALID_FILE]: 'Invalid file',
  [ERROR_CODE.INVALID_FILE_SIZE]: 'Invalid file size',
  [ERROR_CODE.INVALID_FILE_TYPE]: 'Invalid file type',
  [ERROR_CODE.INVALID_IMAGE]: 'Invalid image',
  [ERROR_CODE.INVALID_CREDIT_CARD]: 'Invalid credit card number',

  // Authentication errors
  [ERROR_CODE.AUTH_ERROR]: 'Authentication failed',
  [ERROR_CODE.UNAUTHORIZED]: 'Unauthorized access',
  [ERROR_CODE.FORBIDDEN]: 'Forbidden access',
  [ERROR_CODE.INVALID_CREDENTIALS]: 'Invalid credentials',
  [ERROR_CODE.INVALID_TOKEN]: 'Invalid token',
  [ERROR_CODE.EXPIRED_TOKEN]: 'Token has expired',
  [ERROR_CODE.REVOKED_TOKEN]: 'Token has been revoked',
  [ERROR_CODE.INVALID_REFRESH_TOKEN]: 'Invalid refresh token',
  [ERROR_CODE.EXPIRED_REFRESH_TOKEN]: 'Refresh token has expired',
  [ERROR_CODE.INVALID_OTP]: 'Invalid OTP',
  [ERROR_CODE.EXPIRED_OTP]: 'OTP has expired',
  [ERROR_CODE.INVALID_SESSION]: 'Invalid session',
  [ERROR_CODE.EXPIRED_SESSION]: 'Session has expired',
  [ERROR_CODE.ACCOUNT_LOCKED]: 'Account has been locked',
  [ERROR_CODE.ACCOUNT_DISABLED]: 'Account has been disabled',
  [ERROR_CODE.ACCOUNT_DELETED]: 'Account has been deleted',
  [ERROR_CODE.TOO_MANY_ATTEMPTS]: 'Too many attempts',
  [ERROR_CODE.PASSWORD_MISMATCH]: 'Password mismatch',
  [ERROR_CODE.PASSWORD_WEAK]: 'Password is too weak',
  [ERROR_CODE.PASSWORD_EXPIRED]: 'Password has expired',
  [ERROR_CODE.PASSWORD_ALREADY_USED]: 'Password already used',
  [ERROR_CODE.EMAIL_NOT_VERIFIED]: 'Email not verified',
  [ERROR_CODE.PHONE_NOT_VERIFIED]: 'Phone not verified',
  [ERROR_CODE.MFA_REQUIRED]: 'MFA required',
  [ERROR_CODE.MFA_INVALID]: 'Invalid MFA',
  [ERROR_CODE.MFA_NOT_ENABLED]: 'MFA not enabled',
  [ERROR_CODE.TWO_FACTOR_REQUIRED]: 'Two-factor authentication required',
  [ERROR_CODE.TWO_FACTOR_INVALID]: 'Invalid two-factor authentication',
  [ERROR_CODE.DEVICE_NOT_RECOGNIZED]: 'Device not recognized',
  [ERROR_CODE.IP_BLOCKED]: 'IP address blocked',

  // Authorization errors
  [ERROR_CODE.PERMISSION_DENIED]: 'Permission denied',
  [ERROR_CODE.INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions',
  [ERROR_CODE.ROLE_NOT_FOUND]: 'Role not found',
  [ERROR_CODE.PERMISSION_NOT_FOUND]: 'Permission not found',
  [ERROR_CODE.RESOURCE_NOT_OWNED]: 'Resource not owned',
  [ERROR_CODE.ADMIN_REQUIRED]: 'Admin access required',
  [ERROR_CODE.SUPER_ADMIN_REQUIRED]: 'Super admin access required',
  [ERROR_CODE.VENDOR_REQUIRED]: 'Vendor access required',
  [ERROR_CODE.USER_REQUIRED]: 'User access required',
  [ERROR_CODE.MODERATOR_REQUIRED]: 'Moderator access required',

  // Not found errors
  [ERROR_CODE.NOT_FOUND]: 'Resource not found',
  [ERROR_CODE.USER_NOT_FOUND]: 'User not found',
  [ERROR_CODE.ADMIN_NOT_FOUND]: 'Admin not found',
  [ERROR_CODE.VENDOR_NOT_FOUND]: 'Vendor not found',
  [ERROR_CODE.PRODUCT_NOT_FOUND]: 'Product not found',
  [ERROR_CODE.CATEGORY_NOT_FOUND]: 'Category not found',
  [ERROR_CODE.BRAND_NOT_FOUND]: 'Brand not found',
  [ERROR_CODE.ORDER_NOT_FOUND]: 'Order not found',
  [ERROR_CODE.CART_NOT_FOUND]: 'Cart not found',
  [ERROR_CODE.PAYMENT_NOT_FOUND]: 'Payment not found',
  [ERROR_CODE.TRANSACTION_NOT_FOUND]: 'Transaction not found',
  [ERROR_CODE.SHIPMENT_NOT_FOUND]: 'Shipment not found',
  [ERROR_CODE.REVIEW_NOT_FOUND]: 'Review not found',
  [ERROR_CODE.COUPON_NOT_FOUND]: 'Coupon not found',
  [ERROR_CODE.FLASH_SALE_NOT_FOUND]: 'Flash sale not found',
  [ERROR_CODE.DEAL_NOT_FOUND]: 'Deal not found',
  [ERROR_CODE.INVENTORY_NOT_FOUND]: 'Inventory not found',
  [ERROR_CODE.WAREHOUSE_NOT_FOUND]: 'Warehouse not found',
  [ERROR_CODE.SHIPPING_METHOD_NOT_FOUND]: 'Shipping method not found',
  [ERROR_CODE.TAX_RULE_NOT_FOUND]: 'Tax rule not found',
  [ERROR_CODE.DISCOUNT_NOT_FOUND]: 'Discount not found',
  [ERROR_CODE.SETTINGS_NOT_FOUND]: 'Settings not found',
  [ERROR_CODE.CONFIG_NOT_FOUND]: 'Configuration not found',
  [ERROR_CODE.TEMPLATE_NOT_FOUND]: 'Template not found',
  [ERROR_CODE.FILE_NOT_FOUND]: 'File not found',
  [ERROR_CODE.SESSION_NOT_FOUND]: 'Session not found',
  [ERROR_CODE.NOTIFICATION_NOT_FOUND]: 'Notification not found',
  [ERROR_CODE.REPORT_NOT_FOUND]: 'Report not found',
  [ERROR_CODE.ANALYTICS_NOT_FOUND]: 'Analytics data not found',

  // Duplicate errors
  [ERROR_CODE.DUPLICATE_ENTRY]: 'Duplicate entry',
  [ERROR_CODE.DUPLICATE_EMAIL]: 'Email already exists',
  [ERROR_CODE.DUPLICATE_PHONE]: 'Phone number already exists',
  [ERROR_CODE.DUPLICATE_USERNAME]: 'Username already taken',
  [ERROR_CODE.DUPLICATE_PRODUCT]: 'Product already exists',
  [ERROR_CODE.DUPLICATE_CATEGORY]: 'Category already exists',
  [ERROR_CODE.DUPLICATE_BRAND]: 'Brand already exists',
  [ERROR_CODE.DUPLICATE_COUPON]: 'Coupon already exists',
  [ERROR_CODE.DUPLICATE_ORDER]: 'Order already exists',
  [ERROR_CODE.DUPLICATE_TRANSACTION]: 'Transaction already exists',
  [ERROR_CODE.DUPLICATE_SHIPMENT]: 'Shipment already exists',
  [ERROR_CODE.DUPLICATE_REVIEW]: 'Review already exists',
  [ERROR_CODE.DUPLICATE_KEY]: 'Duplicate key',

  // Conflict errors
  [ERROR_CODE.CONFLICT]: 'Conflict',
  [ERROR_CODE.ORDER_CONFLICT]: 'Order conflict',
  [ERROR_CODE.PAYMENT_CONFLICT]: 'Payment conflict',
  [ERROR_CODE.INVENTORY_CONFLICT]: 'Inventory conflict',
  [ERROR_CODE.SHIPPING_CONFLICT]: 'Shipping conflict',
  [ERROR_CODE.CART_CONFLICT]: 'Cart conflict',
  [ERROR_CODE.COUPON_CONFLICT]: 'Coupon conflict',
  [ERROR_CODE.FLASH_SALE_CONFLICT]: 'Flash sale conflict',

  // Business errors
  [ERROR_CODE.BUSINESS_ERROR]: 'Business rule violation',
  [ERROR_CODE.INSUFFICIENT_STOCK]: 'Insufficient stock',
  [ERROR_CODE.INSUFFICIENT_BALANCE]: 'Insufficient balance',
  [ERROR_CODE.INSUFFICIENT_CREDIT]: 'Insufficient credit',
  [ERROR_CODE.ORDER_CANCELLED]: 'Order has been cancelled',
  [ERROR_CODE.ORDER_COMPLETED]: 'Order has been completed',
  [ERROR_CODE.PAYMENT_FAILED]: 'Payment failed',
  [ERROR_CODE.PAYMENT_PENDING]: 'Payment pending',
  [ERROR_CODE.PAYMENT_REFUNDED]: 'Payment refunded',
  [ERROR_CODE.SHIPMENT_DELAYED]: 'Shipment delayed',
  [ERROR_CODE.SHIPMENT_FAILED]: 'Shipment failed',
  [ERROR_CODE.COUPON_EXPIRED]: 'Coupon has expired',
  [ERROR_CODE.COUPON_USED]: 'Coupon already used',
  [ERROR_CODE.COUPON_INVALID]: 'Invalid coupon',
  [ERROR_CODE.FLASH_SALE_EXPIRED]: 'Flash sale expired',
  [ERROR_CODE.FLASH_SALE_FULL]: 'Flash sale is full',
  [ERROR_CODE.DEAL_EXPIRED]: 'Deal expired',
  [ERROR_CODE.DEAL_FULL]: 'Deal is full',
  [ERROR_CODE.MINIMUM_ORDER_AMOUNT]: 'Minimum order amount not met',
  [ERROR_CODE.MAXIMUM_ORDER_AMOUNT]: 'Maximum order amount exceeded',
  [ERROR_CODE.SHIPPING_NOT_AVAILABLE]: 'Shipping not available',
  [ERROR_CODE.DELIVERY_NOT_AVAILABLE]: 'Delivery not available',
  [ERROR_CODE.PICKUP_NOT_AVAILABLE]: 'Pickup not available',
  [ERROR_CODE.RETURN_EXPIRED]: 'Return period has expired',
  [ERROR_CODE.REFUND_EXPIRED]: 'Refund period has expired',
  [ERROR_CODE.WARRANTY_EXPIRED]: 'Warranty has expired',
  [ERROR_CODE.VENDOR_SUSPENDED]: 'Vendor suspended',
  [ERROR_CODE.VENDOR_INACTIVE]: 'Vendor inactive',
  [ERROR_CODE.USER_SUSPENDED]: 'User suspended',
  [ERROR_CODE.USER_INACTIVE]: 'User inactive',

  // Database errors
  [ERROR_CODE.DATABASE_ERROR]: 'Database error',
  [ERROR_CODE.DATABASE_CONNECTION]: 'Database connection failed',
  [ERROR_CODE.DATABASE_TIMEOUT]: 'Database timeout',
  [ERROR_CODE.DATABASE_QUERY]: 'Database query failed',
  [ERROR_CODE.DATABASE_INSERT]: 'Database insert failed',
  [ERROR_CODE.DATABASE_UPDATE]: 'Database update failed',
  [ERROR_CODE.DATABASE_DELETE]: 'Database delete failed',
  [ERROR_CODE.DATABASE_TRANSACTION]: 'Database transaction failed',
  [ERROR_CODE.DATABASE_LOCK]: 'Database lock error',
  [ERROR_CODE.DATABASE_DEADLOCK]: 'Database deadlock',

  // External service errors
  [ERROR_CODE.EXTERNAL_ERROR]: 'External service error',
  [ERROR_CODE.API_ERROR]: 'API error',
  [ERROR_CODE.API_TIMEOUT]: 'API timeout',
  [ERROR_CODE.API_RATE_LIMIT]: 'API rate limit exceeded',
  [ERROR_CODE.API_UNAVAILABLE]: 'API unavailable',
  [ERROR_CODE.THIRD_PARTY_ERROR]: 'Third-party service error',
  [ERROR_CODE.WEBHOOK_ERROR]: 'Webhook error',
  [ERROR_CODE.WEBHOOK_DELIVERY]: 'Webhook delivery failed',
  [ERROR_CODE.PAYMENT_GATEWAY_ERROR]: 'Payment gateway error',
  [ERROR_CODE.PAYMENT_GATEWAY_TIMEOUT]: 'Payment gateway timeout',
  [ERROR_CODE.PAYMENT_GATEWAY_FAILED]: 'Payment gateway failed',
  [ERROR_CODE.SHIPPING_GATEWAY_ERROR]: 'Shipping gateway error',
  [ERROR_CODE.SMS_GATEWAY_ERROR]: 'SMS gateway error',
  [ERROR_CODE.EMAIL_GATEWAY_ERROR]: 'Email gateway error',
  [ERROR_CODE.CLOUD_STORAGE_ERROR]: 'Cloud storage error',
  [ERROR_CODE.CLOUD_STORAGE_UPLOAD]: 'Cloud storage upload failed',
  [ERROR_CODE.CLOUD_STORAGE_DOWNLOAD]: 'Cloud storage download failed',
  [ERROR_CODE.CACHE_ERROR]: 'Cache error',
  [ERROR_CODE.CACHE_READ]: 'Cache read failed',
  [ERROR_CODE.CACHE_WRITE]: 'Cache write failed',
  [ERROR_CODE.QUEUE_ERROR]: 'Queue error',
  [ERROR_CODE.QUEUE_PUBLISH]: 'Queue publish failed',
  [ERROR_CODE.QUEUE_CONSUME]: 'Queue consume failed',
  [ERROR_CODE.SEARCH_INDEX_ERROR]: 'Search index error',
  [ERROR_CODE.SEARCH_QUERY_ERROR]: 'Search query error',
  [ERROR_CODE.ANALYTICS_ERROR]: 'Analytics error',
  [ERROR_CODE.REPORT_GENERATION_ERROR]: 'Report generation error',

  // Security errors
  [ERROR_CODE.SECURITY_ERROR]: 'Security error',
  [ERROR_CODE.CSRF_ERROR]: 'CSRF validation failed',
  [ERROR_CODE.XSS_ERROR]: 'XSS attack detected',
  [ERROR_CODE.SQL_INJECTION]: 'SQL injection detected',
  [ERROR_CODE.FILE_UPLOAD_ERROR]: 'File upload error',
  [ERROR_CODE.MALICIOUS_FILE]: 'Malicious file detected',
  [ERROR_CODE.SUSPICIOUS_ACTIVITY]: 'Suspicious activity detected',
  [ERROR_CODE.IP_ABUSE]: 'IP abuse detected',
  [ERROR_CODE.DEVICE_ABUSE]: 'Device abuse detected',

  // Network errors
  [ERROR_CODE.NETWORK_ERROR]: 'Network error',
  [ERROR_CODE.CONNECTION_ERROR]: 'Connection error',
  [ERROR_CODE.CONNECTION_TIMEOUT]: 'Connection timeout',
  [ERROR_CODE.DNS_ERROR]: 'DNS error',
  [ERROR_CODE.SSL_ERROR]: 'SSL error',

  // File errors
  [ERROR_CODE.FILE_ERROR]: 'File error',
  [ERROR_CODE.FILE_UPLOAD]: 'File upload failed',
  [ERROR_CODE.FILE_DOWNLOAD]: 'File download failed',
  [ERROR_CODE.FILE_READ]: 'File read failed',
  [ERROR_CODE.FILE_WRITE]: 'File write failed',
  [ERROR_CODE.FILE_DELETE]: 'File delete failed',
  [ERROR_CODE.FILE_CONVERT]: 'File conversion failed',
  [ERROR_CODE.FILE_COMPRESS]: 'File compression failed',
  [ERROR_CODE.FILE_ENCRYPT]: 'File encryption failed',
  [ERROR_CODE.FILE_DECRYPT]: 'File decryption failed',

  // Import/Export errors
  [ERROR_CODE.IMPORT_ERROR]: 'Import failed',
  [ERROR_CODE.IMPORT_INVALID]: 'Invalid import data',
  [ERROR_CODE.IMPORT_PARTIAL]: 'Partial import completed with errors',
  [ERROR_CODE.EXPORT_ERROR]: 'Export failed',
  [ERROR_CODE.EXPORT_FAILED]: 'Export generation failed',

  // Schedule errors
  [ERROR_CODE.SCHEDULE_ERROR]: 'Schedule error',
  [ERROR_CODE.SCHEDULE_CONFLICT]: 'Schedule conflict',
  [ERROR_CODE.SCHEDULE_EXPIRED]: 'Schedule expired',

  // Notification errors
  [ERROR_CODE.NOTIFICATION_ERROR]: 'Notification error',
  [ERROR_CODE.NOTIFICATION_SEND]: 'Notification send failed',
  [ERROR_CODE.NOTIFICATION_DELIVERY]: 'Notification delivery failed',
  [ERROR_CODE.NOTIFICATION_TEMPLATE]: 'Notification template error',

  // Webhook errors
  [ERROR_CODE.WEBHOOK_SEND]: 'Webhook send failed',
  [ERROR_CODE.WEBHOOK_RECEIVE]: 'Webhook receive failed',
  [ERROR_CODE.WEBHOOK_SIGNATURE]: 'Webhook signature validation failed',

  // Version errors
  [ERROR_CODE.VERSION_INCOMPATIBLE]: 'Version incompatible',
  [ERROR_CODE.VERSION_MISMATCH]: 'Version mismatch',
  [ERROR_CODE.VERSION_EXPIRED]: 'Version expired',

  // Configuration errors
  [ERROR_CODE.CONFIG_ERROR]: 'Configuration error',
  [ERROR_CODE.CONFIG_INVALID]: 'Invalid configuration',
  [ERROR_CODE.CONFIG_MISSING]: 'Missing configuration',
  [ERROR_CODE.CONFIG_TYPE]: 'Invalid configuration type',

  // Cache errors
  [ERROR_CODE.CACHE_MISS]: 'Cache miss',
  [ERROR_CODE.CACHE_EXPIRED]: 'Cache expired',
  [ERROR_CODE.CACHE_INVALID]: 'Invalid cache',

  // State errors
  [ERROR_CODE.INVALID_STATE]: 'Invalid state',
  [ERROR_CODE.STATE_CONFLICT]: 'State conflict',
  [ERROR_CODE.STATE_TRANSITION]: 'Invalid state transition',

  // Timeout errors
  [ERROR_CODE.TIMEOUT]: 'Timeout',
  [ERROR_CODE.OPERATION_TIMEOUT]: 'Operation timeout',
  [ERROR_CODE.PROCESS_TIMEOUT]: 'Process timeout',

  // Lock errors
  [ERROR_CODE.LOCK_ERROR]: 'Lock error',
  [ERROR_CODE.LOCK_TIMEOUT]: 'Lock timeout',
  [ERROR_CODE.LOCK_CONFLICT]: 'Lock conflict',

  // Transaction errors
  [ERROR_CODE.TRANSACTION_ERROR]: 'Transaction error',
  [ERROR_CODE.TRANSACTION_FAILED]: 'Transaction failed',
  [ERROR_CODE.TRANSACTION_TIMEOUT]: 'Transaction timeout',
  [ERROR_CODE.TRANSACTION_CANCELLED]: 'Transaction cancelled',

  // Dependency errors
  [ERROR_CODE.DEPENDENCY_ERROR]: 'Dependency error',
  [ERROR_CODE.DEPENDENCY_FAILED]: 'Dependency failed',
  [ERROR_CODE.DEPENDENCY_UNAVAILABLE]: 'Dependency unavailable',

  // Server errors
  [ERROR_CODE.SERVER_ERROR]: 'Server error',
  [ERROR_CODE.SERVER_BUSY]: 'Server busy',
  [ERROR_CODE.SERVER_OVERLOAD]: 'Server overloaded',

  // Service errors
  [ERROR_CODE.SERVICE_ERROR]: 'Service error',
  [ERROR_CODE.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [ERROR_CODE.SERVICE_TIMEOUT]: 'Service timeout',

  // Resource errors
  [ERROR_CODE.RESOURCE_LIMIT]: 'Resource limit reached',
  [ERROR_CODE.RESOURCE_EXHAUSTED]: 'Resource exhausted',
  [ERROR_CODE.RESOURCE_UNAVAILABLE]: 'Resource unavailable',
};

/**
 * Error categories
 */
export const ERROR_CATEGORY = {
  SYSTEM: 'system',
  VALIDATION: 'validation',
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization',
  NOT_FOUND: 'not_found',
  DUPLICATE: 'duplicate',
  CONFLICT: 'conflict',
  BUSINESS: 'business',
  DATABASE: 'database',
  EXTERNAL: 'external',
  SECURITY: 'security',
  NETWORK: 'network',
  FILE: 'file',
  IMPORT_EXPORT: 'import_export',
  SCHEDULE: 'schedule',
  NOTIFICATION: 'notification',
  WEBHOOK: 'webhook',
  RATE_LIMIT: 'rate_limit',
  VERSION: 'version',
  CONFIGURATION: 'configuration',
  CACHE: 'cache',
  STATE: 'state',
  TIMEOUT: 'timeout',
  LOCK: 'lock',
  TRANSACTION: 'transaction',
  DEPENDENCY: 'dependency',
  SERVER: 'server',
  SERVICE: 'service',
  RESOURCE: 'resource',
} as const;

/**
 * Error severity levels
 */
export const ERROR_SEVERITY = {
  DEBUG: 'debug',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
  FATAL: 'fatal',
} as const;

/**
 * Get error category from error code
 */
export function getErrorCategory(errorCode: string): string {
  const code = errorCode.split('_')[1];

  if (!code) {
    return 'UNKNOWN';
  }

  const categoryMap: Record<string, string> = {
    VALIDATION: 'VALIDATION',
    AUTH: 'AUTHENTICATION',
    NOT_FOUND: 'NOT_FOUND',
    DUPLICATE: 'DUPLICATE',
    CONFLICT: 'CONFLICT',
    BUSINESS: 'BUSINESS',
    DB: 'DATABASE',
    EXTERNAL: 'EXTERNAL',
    SECURITY: 'SECURITY',
    NETWORK: 'NETWORK',
    FILE: 'FILE',
    IMPORT: 'IMPORT_EXPORT',
    EXPORT: 'IMPORT_EXPORT',
    SCHEDULE: 'SCHEDULE',
    NOTIFICATION: 'NOTIFICATION',
    WEBHOOK: 'WEBHOOK',
    RATE_LIMIT: 'RATE_LIMIT',
    VERSION: 'VERSION',
    CONFIG: 'CONFIGURATION',
    CACHE: 'CACHE',
    STATE: 'STATE',
    TIMEOUT: 'TIMEOUT',
    LOCK: 'LOCK',
    TRANSACTION: 'TRANSACTION',
    DEPENDENCY: 'DEPENDENCY',
    SERVER: 'SERVER',
    SERVICE: 'SERVICE',
    RESOURCE: 'RESOURCE',
  };

  return categoryMap[code] || 'UNKNOWN';
}

/**
 * Check if error is fatal
 */
export function isFatalError(errorCode: string): boolean {
  const fatalCodes: string[] = [
    ERROR_CODE.SYSTEM_ERROR,
    ERROR_CODE.SYSTEM_MAINTENANCE,
    ERROR_CODE.DATABASE_ERROR,
    ERROR_CODE.DATABASE_CONNECTION,
    ERROR_CODE.SERVER_ERROR,
    ERROR_CODE.SERVICE_UNAVAILABLE,
  ];

  return fatalCodes.includes(errorCode);
}

/**
 * Check if error is recoverable
 */
export function isRecoverableError(errorCode: string): boolean {
  const recoverableCodes: string[] = [
    ERROR_CODE.INVALID_INPUT,
    ERROR_CODE.INVALID_CREDENTIALS,
    ERROR_CODE.INVALID_TOKEN,
    ERROR_CODE.EXPIRED_TOKEN,
    ERROR_CODE.TOO_MANY_ATTEMPTS,
    ERROR_CODE.NETWORK_ERROR,
    ERROR_CODE.CONNECTION_TIMEOUT,
    ERROR_CODE.CACHE_MISS,
  ];

  return recoverableCodes.includes(errorCode);
}

/**
 * Get error message with optional context
 */
export function getErrorMessage(errorCode: string, context?: Record<string, unknown>): string {
  let message = ERROR_MESSAGES[errorCode] || 'Unknown error occurred';

  if (context) {
    const contextStr = Object.entries(context)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    message = `${message} (${contextStr})`;
  }

  return message;
}

/**
 * Create error object
 */
export function createError(
  errorCode: string,
  message?: string,
  context?: Record<string, unknown>
): {
  code: string;
  message: string;
  category: string;
  severity: string;
  context?: Record<string, unknown>;
  timestamp: Date;
} {
  return {
    code: errorCode,
    message: message || getErrorMessage(errorCode),
    category: getErrorCategory(errorCode),
    severity: isFatalError(errorCode) ? ERROR_SEVERITY.FATAL : ERROR_SEVERITY.ERROR,
    context,
    timestamp: new Date(),
  };
}
