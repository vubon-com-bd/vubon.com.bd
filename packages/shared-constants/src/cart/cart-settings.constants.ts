/**
 * Cart Settings Constants
 * Cart settings and configuration options
 */

export const CART_SETTINGS = {
  // Settings Categories
  CATEGORIES: {
    GENERAL: 'general',
    CHECKOUT: 'checkout',
    SHIPPING: 'shipping',
    TAX: 'tax',
    DISCOUNT: 'discount',
    PAYMENT: 'payment',
    NOTIFICATION: 'notification',
    ABANDONMENT: 'abandonment',
    CUSTOM: 'custom',
  } as const,

  // Setting Types
  TYPES: {
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    STRING: 'string',
    ARRAY: 'array',
    OBJECT: 'object',
    JSON: 'json',
    CUSTOM: 'custom',
  } as const,

  // Setting Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ARCHIVED: 'archived',
  } as const,

  // Setting Scopes
  SCOPES: {
    GLOBAL: 'global',
    USER: 'user',
    ROLE: 'role',
    SEGMENT: 'segment',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
  } as const,

  // Setting Defaults
  DEFAULTS: {
    DEFAULT_CATEGORY: 'general',
    DEFAULT_TYPE: 'string',
    DEFAULT_STATUS: 'active',
    DEFAULT_SCOPE: 'global',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_LOCALE: 'bn_BD',
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
    DEFAULT_MAX_ITEMS: 50,
    DEFAULT_MIN_ORDER: 0,
    DEFAULT_MAX_ORDER: 1000000,
    DEFAULT_SESSION_TIMEOUT: 3600,
    DEFAULT_ABANDONMENT_THRESHOLD: 30,
    DEFAULT_REMINDER_INTERVAL: 3600,
    DEFAULT_MAX_REMINDERS: 4,
    DEFAULT_ALLOW_GUEST_CHECKOUT: true,
    DEFAULT_ALLOW_CART_SAVING: true,
    DEFAULT_ALLOW_CART_SHARING: false,
    DEFAULT_ALLOW_WISHLIST: true,
    DEFAULT_SHIPPING_ENABLED: true,
    DEFAULT_TAX_ENABLED: true,
    DEFAULT_DISCOUNT_ENABLED: true,
    DEFAULT_COUPON_ENABLED: true,
  } as const,

  // Settings Limits
  LIMITS: {
    MAX_SETTINGS: 100,
    MAX_CATEGORIES: 20,
    MAX_SCOPES: 10,
    MAX_SETTINGS_PER_CATEGORY: 20,
    MAX_SETTINGS_PER_SCOPE: 50,
  } as const,

  // Settings Errors
  ERRORS: {
    SETTING_NOT_FOUND: 'setting_not_found',
    INVALID_CATEGORY: 'invalid_category',
    INVALID_TYPE: 'invalid_type',
    INVALID_VALUE: 'invalid_value',
    INVALID_SCOPE: 'invalid_scope',
    PERMISSION_DENIED: 'permission_denied',
    DUPLICATE_SETTING: 'duplicate_setting',
    SETTING_LIMIT_EXCEEDED: 'setting_limit_exceeded',
  } as const,
} as const;

// Settings Categories
export type CartSettingsCategory =
  (typeof CART_SETTINGS.CATEGORIES)[keyof typeof CART_SETTINGS.CATEGORIES];

// Setting Types
export type CartSettingType = (typeof CART_SETTINGS.TYPES)[keyof typeof CART_SETTINGS.TYPES];

// Setting Statuses
export type CartSettingStatus =
  (typeof CART_SETTINGS.STATUSES)[keyof typeof CART_SETTINGS.STATUSES];

// Setting Scopes
export type CartSettingScope = (typeof CART_SETTINGS.SCOPES)[keyof typeof CART_SETTINGS.SCOPES];

// Setting Defaults
export type CartSettingDefault =
  (typeof CART_SETTINGS.DEFAULTS)[keyof typeof CART_SETTINGS.DEFAULTS];

// Settings Limits
export type CartSettingsLimit = (typeof CART_SETTINGS.LIMITS)[keyof typeof CART_SETTINGS.LIMITS];

// Settings Errors
export type CartSettingsError = (typeof CART_SETTINGS.ERRORS)[keyof typeof CART_SETTINGS.ERRORS];

// Utility Functions
export function cartsettingsGetCategoryLabel(category: CartSettingsCategory): string {
  const labels: Record<CartSettingsCategory, string> = {
    [CART_SETTINGS.CATEGORIES.GENERAL]: 'General',
    [CART_SETTINGS.CATEGORIES.CHECKOUT]: 'Checkout',
    [CART_SETTINGS.CATEGORIES.SHIPPING]: 'Shipping',
    [CART_SETTINGS.CATEGORIES.TAX]: 'Tax',
    [CART_SETTINGS.CATEGORIES.DISCOUNT]: 'Discount',
    [CART_SETTINGS.CATEGORIES.PAYMENT]: 'Payment',
    [CART_SETTINGS.CATEGORIES.NOTIFICATION]: 'Notification',
    [CART_SETTINGS.CATEGORIES.ABANDONMENT]: 'Abandonment',
    [CART_SETTINGS.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function cartsettingsGetTypeLabel(type: CartSettingType): string {
  const labels: Record<CartSettingType, string> = {
    [CART_SETTINGS.TYPES.BOOLEAN]: 'Boolean',
    [CART_SETTINGS.TYPES.NUMBER]: 'Number',
    [CART_SETTINGS.TYPES.STRING]: 'String',
    [CART_SETTINGS.TYPES.ARRAY]: 'Array',
    [CART_SETTINGS.TYPES.OBJECT]: 'Object',
    [CART_SETTINGS.TYPES.JSON]: 'JSON',
    [CART_SETTINGS.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function cartsettingsGetStatusLabel(status: CartSettingStatus): string {
  const labels: Record<CartSettingStatus, string> = {
    [CART_SETTINGS.STATUSES.ACTIVE]: 'Active',
    [CART_SETTINGS.STATUSES.INACTIVE]: 'Inactive',
    [CART_SETTINGS.STATUSES.DRAFT]: 'Draft',
    [CART_SETTINGS.STATUSES.PENDING]: 'Pending',
    [CART_SETTINGS.STATUSES.APPROVED]: 'Approved',
    [CART_SETTINGS.STATUSES.REJECTED]: 'Rejected',
    [CART_SETTINGS.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function cartsettingsGetScopeLabel(scope: CartSettingScope): string {
  const labels: Record<CartSettingScope, string> = {
    [CART_SETTINGS.SCOPES.GLOBAL]: 'Global',
    [CART_SETTINGS.SCOPES.USER]: 'User',
    [CART_SETTINGS.SCOPES.ROLE]: 'Role',
    [CART_SETTINGS.SCOPES.SEGMENT]: 'Segment',
    [CART_SETTINGS.SCOPES.DEPARTMENT]: 'Department',
    [CART_SETTINGS.SCOPES.TEAM]: 'Team',
    [CART_SETTINGS.SCOPES.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function cartsettingsGetErrorLabel(error: CartSettingsError): string {
  const labels: Record<CartSettingsError, string> = {
    [CART_SETTINGS.ERRORS.SETTING_NOT_FOUND]: 'Setting Not Found',
    [CART_SETTINGS.ERRORS.INVALID_CATEGORY]: 'Invalid Category',
    [CART_SETTINGS.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [CART_SETTINGS.ERRORS.INVALID_VALUE]: 'Invalid Value',
    [CART_SETTINGS.ERRORS.INVALID_SCOPE]: 'Invalid Scope',
    [CART_SETTINGS.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [CART_SETTINGS.ERRORS.DUPLICATE_SETTING]: 'Duplicate Setting',
    [CART_SETTINGS.ERRORS.SETTING_LIMIT_EXCEEDED]: 'Setting Limit Exceeded',
  };
  return labels[error] || 'Unknown Error';
}

export function cartsettingsIsActive(status: CartSettingStatus): boolean {
  const activeStatuses: CartSettingStatus[] = [
    CART_SETTINGS.STATUSES.ACTIVE,
    CART_SETTINGS.STATUSES.APPROVED,
  ];
  return activeStatuses.includes(status);
}

export function cartsettingsIsGlobal(scope: CartSettingScope): boolean {
  return scope === CART_SETTINGS.SCOPES.GLOBAL;
}

export function cartsettingsIsUserScope(scope: CartSettingScope): boolean {
  return scope === CART_SETTINGS.SCOPES.USER;
}

export function cartsettingsGetDefaultCurrency(): string {
  return CART_SETTINGS.DEFAULTS.DEFAULT_CURRENCY;
}

export function cartsettingsGetDefaultLocale(): string {
  return CART_SETTINGS.DEFAULTS.DEFAULT_LOCALE;
}

export function cartsettingsGetDefaultMaxItems(): number {
  return CART_SETTINGS.DEFAULTS.DEFAULT_MAX_ITEMS;
}

export function cartsettingsGetDefaultSessionTimeout(): number {
  return CART_SETTINGS.DEFAULTS.DEFAULT_SESSION_TIMEOUT;
}
