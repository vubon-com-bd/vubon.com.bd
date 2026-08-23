/**
 * SMS Marketing Type Constants
 * Type definitions and classifications for SMS
 */

export const MARKETINGSMS_TYPE = {
  // SMS Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    RELATIONAL: 'relational',
    PROMOTIONAL: 'promotional',
    INFORMATIONAL: 'informational',
    SECURITY: 'security',
    URGENT: 'urgent',
    NOTIFICATION: 'notification',
  } as const,

  // SMS Sub-Types
  SUB_TYPES: {
    // Marketing
    NEWSLETTER: 'newsletter',
    CAMPAIGN: 'campaign',
    AUTOMATION: 'automation',
    SEGMENTED: 'segmented',
    PERSONALIZED: 'personalized',

    // Transactional
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    DELIVERY: 'delivery',
    RETURN: 'return',
    REFUND: 'refund',

    // Operational
    SYSTEM: 'system',
    MAINTENANCE: 'maintenance',
    ALERT: 'alert',
    REMINDER: 'reminder',
    REPORT: 'report',

    // Relational
    WELCOME: 'welcome',
    REENGAGEMENT: 'reengagement',
    WIN_BACK: 'win_back',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',

    // Promotional
    SALE: 'sale',
    DISCOUNT: 'discount',
    OFFER: 'offer',
    COUPON: 'coupon',
    VOUCHER: 'voucher',
    FLASH_SALE: 'flash_sale',
    LIMITED_TIME: 'limited_time',

    // Security
    OTP: 'otp',
    VERIFICATION: 'verification',
    TWO_FA: 'two_fa',
    RESET_PASSWORD: 'reset_password',
    SECURITY_ALERT: 'security_alert',

    // Notification
    UPDATE: 'update',
    ANNOUNCEMENT: 'announcement',
    NEWS: 'news',
    EVENT: 'event',
    REMINDER_NOTIFICATION: 'reminder_notification',
  } as const,

  // SMS Formats
  FORMATS: {
    PLAIN_TEXT: 'plain_text',
    UNICODE: 'unicode',
    GSM: 'gsm',
    RICH_TEXT: 'rich_text',
    TEMPLATE: 'template',
    DYNAMIC: 'dynamic',
    PERSONALIZED: 'personalized',
  } as const,

  // SMS Purposes
  PURPOSES: {
    AWARENESS: 'awareness',
    EDUCATION: 'education',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    REACTIVATION: 'reactivation',
    REVENUE: 'revenue',
    RELATIONSHIP: 'relationship',
    SECURITY: 'security',
    VERIFICATION: 'verification',
  } as const,

  // SMS Personalization Types
  PERSONALIZATION_TYPES: {
    NONE: 'none',
    BASIC: 'basic',
    SEGMENT_BASED: 'segment_based',
    BEHAVIOR_BASED: 'behavior_based',
    DYNAMIC: 'dynamic',
    AI_POWERED: 'ai_powered',
    HYPER_PERSONALIZED: 'hyper_personalized',
  } as const,

  // SMS Character Sets
  CHARACTER_SETS: {
    GSM_7BIT: 'gsm_7bit',
    UCS_2: 'ucs_2',
    ISO_8859_1: 'iso_8859_1',
    UTF_8: 'utf_8',
    UTF_16: 'utf_16',
    ASCII: 'ascii',
  } as const,
} as const;

// SMS Categories
export type MarketingSMSCategoryType =
  (typeof MARKETINGSMS_TYPE.CATEGORIES)[keyof typeof MARKETINGSMS_TYPE.CATEGORIES];

// SMS Sub-Types
export type MarketingSMSSubType =
  (typeof MARKETINGSMS_TYPE.SUB_TYPES)[keyof typeof MARKETINGSMS_TYPE.SUB_TYPES];

// SMS Formats
export type MarketingSMSFormat =
  (typeof MARKETINGSMS_TYPE.FORMATS)[keyof typeof MARKETINGSMS_TYPE.FORMATS];

// SMS Purposes
export type MarketingSMSPurpose =
  (typeof MARKETINGSMS_TYPE.PURPOSES)[keyof typeof MARKETINGSMS_TYPE.PURPOSES];

// SMS Personalization Types
export type MarketingSMSPersonalizationType =
  (typeof MARKETINGSMS_TYPE.PERSONALIZATION_TYPES)[keyof typeof MARKETINGSMS_TYPE.PERSONALIZATION_TYPES];

// SMS Character Sets
export type MarketingSMSCharacterSet =
  (typeof MARKETINGSMS_TYPE.CHARACTER_SETS)[keyof typeof MARKETINGSMS_TYPE.CHARACTER_SETS];

// Utility Functions
export function marketingsmsGetCategoryLabel(category: MarketingSMSCategoryType): string {
  const labels: Record<MarketingSMSCategoryType, string> = {
    [MARKETINGSMS_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [MARKETINGSMS_TYPE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [MARKETINGSMS_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [MARKETINGSMS_TYPE.CATEGORIES.RELATIONAL]: 'Relational',
    [MARKETINGSMS_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [MARKETINGSMS_TYPE.CATEGORIES.INFORMATIONAL]: 'Informational',
    [MARKETINGSMS_TYPE.CATEGORIES.SECURITY]: 'Security',
    [MARKETINGSMS_TYPE.CATEGORIES.URGENT]: 'Urgent',
    [MARKETINGSMS_TYPE.CATEGORIES.NOTIFICATION]: 'Notification',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingsmsGetSubTypeLabel(subType: MarketingSMSSubType): string {
  const labels: Record<MarketingSMSSubType, string> = {
    // Marketing
    [MARKETINGSMS_TYPE.SUB_TYPES.NEWSLETTER]: 'Newsletter',
    [MARKETINGSMS_TYPE.SUB_TYPES.CAMPAIGN]: 'Campaign',
    [MARKETINGSMS_TYPE.SUB_TYPES.AUTOMATION]: 'Automation',
    [MARKETINGSMS_TYPE.SUB_TYPES.SEGMENTED]: 'Segmented',
    [MARKETINGSMS_TYPE.SUB_TYPES.PERSONALIZED]: 'Personalized',

    // Transactional
    [MARKETINGSMS_TYPE.SUB_TYPES.ORDER]: 'Order',
    [MARKETINGSMS_TYPE.SUB_TYPES.PAYMENT]: 'Payment',
    [MARKETINGSMS_TYPE.SUB_TYPES.SHIPPING]: 'Shipping',
    [MARKETINGSMS_TYPE.SUB_TYPES.DELIVERY]: 'Delivery',
    [MARKETINGSMS_TYPE.SUB_TYPES.RETURN]: 'Return',
    [MARKETINGSMS_TYPE.SUB_TYPES.REFUND]: 'Refund',

    // Operational
    [MARKETINGSMS_TYPE.SUB_TYPES.SYSTEM]: 'System',
    [MARKETINGSMS_TYPE.SUB_TYPES.MAINTENANCE]: 'Maintenance',
    [MARKETINGSMS_TYPE.SUB_TYPES.ALERT]: 'Alert',
    [MARKETINGSMS_TYPE.SUB_TYPES.REMINDER]: 'Reminder',
    [MARKETINGSMS_TYPE.SUB_TYPES.REPORT]: 'Report',

    // Relational
    [MARKETINGSMS_TYPE.SUB_TYPES.WELCOME]: 'Welcome',
    [MARKETINGSMS_TYPE.SUB_TYPES.REENGAGEMENT]: 'Re-engagement',
    [MARKETINGSMS_TYPE.SUB_TYPES.WIN_BACK]: 'Win Back',
    [MARKETINGSMS_TYPE.SUB_TYPES.BIRTHDAY]: 'Birthday',
    [MARKETINGSMS_TYPE.SUB_TYPES.ANNIVERSARY]: 'Anniversary',

    // Promotional
    [MARKETINGSMS_TYPE.SUB_TYPES.SALE]: 'Sale',
    [MARKETINGSMS_TYPE.SUB_TYPES.DISCOUNT]: 'Discount',
    [MARKETINGSMS_TYPE.SUB_TYPES.OFFER]: 'Offer',
    [MARKETINGSMS_TYPE.SUB_TYPES.COUPON]: 'Coupon',
    [MARKETINGSMS_TYPE.SUB_TYPES.VOUCHER]: 'Voucher',
    [MARKETINGSMS_TYPE.SUB_TYPES.FLASH_SALE]: 'Flash Sale',
    [MARKETINGSMS_TYPE.SUB_TYPES.LIMITED_TIME]: 'Limited Time',

    // Security
    [MARKETINGSMS_TYPE.SUB_TYPES.OTP]: 'OTP',
    [MARKETINGSMS_TYPE.SUB_TYPES.VERIFICATION]: 'Verification',
    [MARKETINGSMS_TYPE.SUB_TYPES.TWO_FA]: '2FA',
    [MARKETINGSMS_TYPE.SUB_TYPES.RESET_PASSWORD]: 'Reset Password',
    [MARKETINGSMS_TYPE.SUB_TYPES.SECURITY_ALERT]: 'Security Alert',

    // Notification
    [MARKETINGSMS_TYPE.SUB_TYPES.UPDATE]: 'Update',
    [MARKETINGSMS_TYPE.SUB_TYPES.ANNOUNCEMENT]: 'Announcement',
    [MARKETINGSMS_TYPE.SUB_TYPES.NEWS]: 'News',
    [MARKETINGSMS_TYPE.SUB_TYPES.EVENT]: 'Event',
    [MARKETINGSMS_TYPE.SUB_TYPES.REMINDER_NOTIFICATION]: 'Reminder',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function marketingsmsGetFormatLabel(format: MarketingSMSFormat): string {
  const labels: Record<MarketingSMSFormat, string> = {
    [MARKETINGSMS_TYPE.FORMATS.PLAIN_TEXT]: 'Plain Text',
    [MARKETINGSMS_TYPE.FORMATS.UNICODE]: 'Unicode',
    [MARKETINGSMS_TYPE.FORMATS.GSM]: 'GSM',
    [MARKETINGSMS_TYPE.FORMATS.RICH_TEXT]: 'Rich Text',
    [MARKETINGSMS_TYPE.FORMATS.TEMPLATE]: 'Template',
    [MARKETINGSMS_TYPE.FORMATS.DYNAMIC]: 'Dynamic',
    [MARKETINGSMS_TYPE.FORMATS.PERSONALIZED]: 'Personalized',
  };
  return labels[format] || 'Unknown Format';
}

export function marketingsmsGetPurposeLabel(purpose: MarketingSMSPurpose): string {
  const labels: Record<MarketingSMSPurpose, string> = {
    [MARKETINGSMS_TYPE.PURPOSES.AWARENESS]: 'Awareness',
    [MARKETINGSMS_TYPE.PURPOSES.EDUCATION]: 'Education',
    [MARKETINGSMS_TYPE.PURPOSES.ENGAGEMENT]: 'Engagement',
    [MARKETINGSMS_TYPE.PURPOSES.CONVERSION]: 'Conversion',
    [MARKETINGSMS_TYPE.PURPOSES.RETENTION]: 'Retention',
    [MARKETINGSMS_TYPE.PURPOSES.REACTIVATION]: 'Reactivation',
    [MARKETINGSMS_TYPE.PURPOSES.REVENUE]: 'Revenue',
    [MARKETINGSMS_TYPE.PURPOSES.RELATIONSHIP]: 'Relationship',
    [MARKETINGSMS_TYPE.PURPOSES.SECURITY]: 'Security',
    [MARKETINGSMS_TYPE.PURPOSES.VERIFICATION]: 'Verification',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function marketingsmsGetPersonalizationTypeLabel(
  type: MarketingSMSPersonalizationType
): string {
  const labels: Record<MarketingSMSPersonalizationType, string> = {
    [MARKETINGSMS_TYPE.PERSONALIZATION_TYPES.NONE]: 'None',
    [MARKETINGSMS_TYPE.PERSONALIZATION_TYPES.BASIC]: 'Basic',
    [MARKETINGSMS_TYPE.PERSONALIZATION_TYPES.SEGMENT_BASED]: 'Segment Based',
    [MARKETINGSMS_TYPE.PERSONALIZATION_TYPES.BEHAVIOR_BASED]: 'Behavior Based',
    [MARKETINGSMS_TYPE.PERSONALIZATION_TYPES.DYNAMIC]: 'Dynamic',
    [MARKETINGSMS_TYPE.PERSONALIZATION_TYPES.AI_POWERED]: 'AI Powered',
    [MARKETINGSMS_TYPE.PERSONALIZATION_TYPES.HYPER_PERSONALIZED]: 'Hyper Personalized',
  };
  return labels[type] || 'Unknown Personalization Type';
}

export function marketingsmsGetCharacterSetLabel(charSet: MarketingSMSCharacterSet): string {
  const labels: Record<MarketingSMSCharacterSet, string> = {
    [MARKETINGSMS_TYPE.CHARACTER_SETS.GSM_7BIT]: 'GSM 7-bit',
    [MARKETINGSMS_TYPE.CHARACTER_SETS.UCS_2]: 'UCS-2',
    [MARKETINGSMS_TYPE.CHARACTER_SETS.ISO_8859_1]: 'ISO-8859-1',
    [MARKETINGSMS_TYPE.CHARACTER_SETS.UTF_8]: 'UTF-8',
    [MARKETINGSMS_TYPE.CHARACTER_SETS.UTF_16]: 'UTF-16',
    [MARKETINGSMS_TYPE.CHARACTER_SETS.ASCII]: 'ASCII',
  };
  return labels[charSet] || 'Unknown Character Set';
}

export function marketingsmsIsMarketingCategory(category: MarketingSMSCategoryType): boolean {
  const marketingCategories: MarketingSMSCategoryType[] = [
    MARKETINGSMS_TYPE.CATEGORIES.MARKETING,
    MARKETINGSMS_TYPE.CATEGORIES.PROMOTIONAL,
    MARKETINGSMS_TYPE.CATEGORIES.RELATIONAL,
  ];
  return marketingCategories.includes(category);
}

export function marketingsmsIsTransactionalCategory(category: MarketingSMSCategoryType): boolean {
  const transactionalCategories: MarketingSMSCategoryType[] = [
    MARKETINGSMS_TYPE.CATEGORIES.TRANSACTIONAL,
    MARKETINGSMS_TYPE.CATEGORIES.SECURITY,
  ];
  return transactionalCategories.includes(category);
}

export function marketingsmsIsOperationalCategory(category: MarketingSMSCategoryType): boolean {
  return category === MARKETINGSMS_TYPE.CATEGORIES.OPERATIONAL;
}

export function marketingsmsGetMaxGSMCharacters(): number {
  return 160; // Standard GSM 7-bit character limit
}

export function marketingsmsGetMaxUnicodeCharacters(): number {
  return 70; // Unicode character limit per SMS
}

export function marketingsmsCalculateSMSSegments(message: string): number {
  const gsmChars = message.replace(/[^A-Za-z0-9\s.,!?;:'"\-()@]/g, '').length;
  const unicodeChars = message.length - gsmChars;

  if (unicodeChars > 0) {
    // Unicode SMS: 70 chars per segment, 67 chars per segment for multi-part
    if (message.length <= 70) return 1;
    return Math.ceil(message.length / 67);
  } else {
    // GSM SMS: 160 chars per segment, 153 chars per segment for multi-part
    if (message.length <= 160) return 1;
    return Math.ceil(message.length / 153);
  }
}
