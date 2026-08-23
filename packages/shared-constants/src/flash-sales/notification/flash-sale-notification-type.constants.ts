/**
 * Flash Sale Notification Type Constants
 * Types and classifications of flash sale notifications
 */

export const FLASH_SALE_NOTIFICATION_TYPE = {
  // Notification Categories
  CATEGORIES: {
    SALE: 'sale',
    PRODUCT: 'product',
    PROMOTIONAL: 'promotional',
    SYSTEM: 'system',
    USER: 'user',
    ALERT: 'alert',
    UPDATE: 'update',
    CUSTOM: 'custom',
  },

  // Notification Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  },

  // Notification Scope
  SCOPE: {
    GLOBAL: 'global',
    SALE_LEVEL: 'sale_level',
    USER_LEVEL: 'user_level',
    PRODUCT_LEVEL: 'product_level',
    REGIONAL: 'regional',
  },

  // Notification Delivery
  DELIVERY: {
    INSTANT: 'instant',
    SCHEDULED: 'scheduled',
    BATCH: 'batch',
    TRIGGERED: 'triggered',
    REAL_TIME: 'real_time',
  },

  // Notification Language
  LANGUAGE: {
    EN: 'en',
    BN: 'bn',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
    CUSTOM: 'custom',
  },

  // Notification Format
  FORMAT: {
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown',
    JSON: 'json',
    XML: 'xml',
    PLAIN: 'plain',
  },

  // Notification Action
  ACTION: {
    VIEW_SALE: 'view_sale',
    VIEW_PRODUCT: 'view_product',
    PARTICIPATE: 'participate',
    SHARE: 'share',
    SAVE: 'save',
    DISMISS: 'dismiss',
    CUSTOM: 'custom',
  },
} as const;

// Notification Categories
export type FlashSaleNotificationTypeCategory =
  (typeof FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES)[keyof typeof FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES];

// Notification Complexity
export type FlashSaleNotificationTypeComplexity =
  (typeof FLASH_SALE_NOTIFICATION_TYPE.COMPLEXITY)[keyof typeof FLASH_SALE_NOTIFICATION_TYPE.COMPLEXITY];

// Notification Scope
export type FlashSaleNotificationTypeScope =
  (typeof FLASH_SALE_NOTIFICATION_TYPE.SCOPE)[keyof typeof FLASH_SALE_NOTIFICATION_TYPE.SCOPE];

// Notification Delivery
export type FlashSaleNotificationTypeDelivery =
  (typeof FLASH_SALE_NOTIFICATION_TYPE.DELIVERY)[keyof typeof FLASH_SALE_NOTIFICATION_TYPE.DELIVERY];

// Notification Language
export type FlashSaleNotificationTypeLanguage =
  (typeof FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE)[keyof typeof FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE];

// Notification Format
export type FlashSaleNotificationTypeFormat =
  (typeof FLASH_SALE_NOTIFICATION_TYPE.FORMAT)[keyof typeof FLASH_SALE_NOTIFICATION_TYPE.FORMAT];

// Notification Action
export type FlashSaleNotificationTypeAction =
  (typeof FLASH_SALE_NOTIFICATION_TYPE.ACTION)[keyof typeof FLASH_SALE_NOTIFICATION_TYPE.ACTION];

// Utility Functions
export function flashsalesNotificationTypeGetCategoryLabel(
  category: FlashSaleNotificationTypeCategory
): string {
  const labels: Record<FlashSaleNotificationTypeCategory, string> = {
    [FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.SALE]: 'Sale Notification',
    [FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.PRODUCT]: 'Product Notification',
    [FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional Notification',
    [FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.SYSTEM]: 'System Notification',
    [FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.USER]: 'User Notification',
    [FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.ALERT]: 'Alert Notification',
    [FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.UPDATE]: 'Update Notification',
    [FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.CUSTOM]: 'Custom Notification',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesNotificationTypeGetComplexityLabel(
  complexity: FlashSaleNotificationTypeComplexity
): string {
  const labels: Record<FlashSaleNotificationTypeComplexity, string> = {
    [FLASH_SALE_NOTIFICATION_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [FLASH_SALE_NOTIFICATION_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [FLASH_SALE_NOTIFICATION_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [FLASH_SALE_NOTIFICATION_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesNotificationTypeGetScopeLabel(
  scope: FlashSaleNotificationTypeScope
): string {
  const labels: Record<FlashSaleNotificationTypeScope, string> = {
    [FLASH_SALE_NOTIFICATION_TYPE.SCOPE.GLOBAL]: 'Global',
    [FLASH_SALE_NOTIFICATION_TYPE.SCOPE.SALE_LEVEL]: 'Sale Level',
    [FLASH_SALE_NOTIFICATION_TYPE.SCOPE.USER_LEVEL]: 'User Level',
    [FLASH_SALE_NOTIFICATION_TYPE.SCOPE.PRODUCT_LEVEL]: 'Product Level',
    [FLASH_SALE_NOTIFICATION_TYPE.SCOPE.REGIONAL]: 'Regional',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesNotificationTypeGetDeliveryLabel(
  delivery: FlashSaleNotificationTypeDelivery
): string {
  const labels: Record<FlashSaleNotificationTypeDelivery, string> = {
    [FLASH_SALE_NOTIFICATION_TYPE.DELIVERY.INSTANT]: 'Instant',
    [FLASH_SALE_NOTIFICATION_TYPE.DELIVERY.SCHEDULED]: 'Scheduled',
    [FLASH_SALE_NOTIFICATION_TYPE.DELIVERY.BATCH]: 'Batch',
    [FLASH_SALE_NOTIFICATION_TYPE.DELIVERY.TRIGGERED]: 'Triggered',
    [FLASH_SALE_NOTIFICATION_TYPE.DELIVERY.REAL_TIME]: 'Real Time',
  };
  return labels[delivery] || 'Unknown Delivery';
}

export function flashsalesNotificationTypeGetLanguageLabel(
  language: FlashSaleNotificationTypeLanguage
): string {
  const labels: Record<FlashSaleNotificationTypeLanguage, string> = {
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.EN]: 'English',
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.BN]: 'Bengali',
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.AR]: 'Arabic',
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.ES]: 'Spanish',
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.FR]: 'French',
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.DE]: 'German',
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.ZH]: 'Chinese',
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.JA]: 'Japanese',
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.RU]: 'Russian',
    [FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE.CUSTOM]: 'Custom Language',
  };
  return labels[language] || 'Unknown Language';
}

export function flashsalesNotificationTypeGetFormatLabel(
  format: FlashSaleNotificationTypeFormat
): string {
  const labels: Record<FlashSaleNotificationTypeFormat, string> = {
    [FLASH_SALE_NOTIFICATION_TYPE.FORMAT.TEXT]: 'Plain Text',
    [FLASH_SALE_NOTIFICATION_TYPE.FORMAT.HTML]: 'HTML',
    [FLASH_SALE_NOTIFICATION_TYPE.FORMAT.MARKDOWN]: 'Markdown',
    [FLASH_SALE_NOTIFICATION_TYPE.FORMAT.JSON]: 'JSON',
    [FLASH_SALE_NOTIFICATION_TYPE.FORMAT.XML]: 'XML',
    [FLASH_SALE_NOTIFICATION_TYPE.FORMAT.PLAIN]: 'Plain Format',
  };
  return labels[format] || 'Unknown Format';
}

export function flashsalesNotificationTypeGetActionLabel(
  action: FlashSaleNotificationTypeAction
): string {
  const labels: Record<FlashSaleNotificationTypeAction, string> = {
    [FLASH_SALE_NOTIFICATION_TYPE.ACTION.VIEW_SALE]: 'View Sale',
    [FLASH_SALE_NOTIFICATION_TYPE.ACTION.VIEW_PRODUCT]: 'View Product',
    [FLASH_SALE_NOTIFICATION_TYPE.ACTION.PARTICIPATE]: 'Participate',
    [FLASH_SALE_NOTIFICATION_TYPE.ACTION.SHARE]: 'Share',
    [FLASH_SALE_NOTIFICATION_TYPE.ACTION.SAVE]: 'Save',
    [FLASH_SALE_NOTIFICATION_TYPE.ACTION.DISMISS]: 'Dismiss',
    [FLASH_SALE_NOTIFICATION_TYPE.ACTION.CUSTOM]: 'Custom Action',
  };
  return labels[action] || 'Unknown Action';
}

export function flashsalesNotificationTypeIsValidCategory(
  category: string
): category is FlashSaleNotificationTypeCategory {
  return Object.values(FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES).includes(
    category as FlashSaleNotificationTypeCategory
  );
}

export function flashsalesNotificationTypeIsValidScope(
  scope: string
): scope is FlashSaleNotificationTypeScope {
  return Object.values(FLASH_SALE_NOTIFICATION_TYPE.SCOPE).includes(
    scope as FlashSaleNotificationTypeScope
  );
}

export function flashsalesNotificationTypeIsValidLanguage(
  language: string
): language is FlashSaleNotificationTypeLanguage {
  return Object.values(FLASH_SALE_NOTIFICATION_TYPE.LANGUAGE).includes(
    language as FlashSaleNotificationTypeLanguage
  );
}

export function flashsalesNotificationTypeIsValidFormat(
  format: string
): format is FlashSaleNotificationTypeFormat {
  return Object.values(FLASH_SALE_NOTIFICATION_TYPE.FORMAT).includes(
    format as FlashSaleNotificationTypeFormat
  );
}

export function flashsalesNotificationTypeIsUrgent(
  category: FlashSaleNotificationTypeCategory
): boolean {
  const urgentCategories: FlashSaleNotificationTypeCategory[] = [
    FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.ALERT,
    FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.SYSTEM,
  ];
  return urgentCategories.includes(category);
}

export function flashsalesNotificationTypeIsPromotional(
  category: FlashSaleNotificationTypeCategory
): boolean {
  const promotionalCategories: FlashSaleNotificationTypeCategory[] = [
    FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.PROMOTIONAL,
    FLASH_SALE_NOTIFICATION_TYPE.CATEGORIES.SALE,
  ];
  return promotionalCategories.includes(category);
}
