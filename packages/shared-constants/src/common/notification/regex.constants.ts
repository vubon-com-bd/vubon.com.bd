/**
 * Notification Regular Expression Constants
 * Contains all regex patterns for notification management
 */

export const NotificationRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number patterns
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },

  // URL validation
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

  // UUID validation
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,

  // Date patterns
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
  },

  // Time patterns
  TIME: {
    HH_MM: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
    HH_MM_SS: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
  },

  // Password validation pattern
  // At least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Alphanumeric pattern
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  // Name patterns
  NAME: {
    FIRST: /^[a-zA-Z]{2,50}$/,
    LAST: /^[a-zA-Z]{2,50}$/,
    FULL: /^[a-zA-Z\s\-.]{2,100}$/,
  },

  // Slug pattern
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // Hex color pattern
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // IP Address patterns
  IP: {
    IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    IPV6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  },

  // HTML tag pattern
  HTML_TAG: /^<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>$/,

  // HTML attributes pattern
  HTML_ATTR: /([a-zA-Z-]+)\s*=\s*"([^"]*)"|'([^']*)'/g,

  // Notification specific patterns
  NOTIFICATION: {
    ID: /^NOTIF-[A-Z0-9]{8,12}$/,
    TEMPLATE_ID: /^TMPL-[A-Z0-9]{8,12}$/,
    CHANNEL: /^(email|sms|push|webhook|in_app|slack|telegram|whatsapp)$/,
    BROADCAST_ID: /^BRDC-[A-Z0-9]{8,12}$/,
    DIGEST_ID: /^DGST-[A-Z0-9]{8,12}$/,
    SCHEDULE_ID: /^SCHD-[A-Z0-9]{8,12}$/,
    RULE_ID: /^RUL-[A-Z0-9]{8,12}$/,
  },

  // Token patterns
  TOKEN: {
    JWT: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
    API_KEY: /^[A-Za-z0-9]{32,64}$/,
    REFRESH_TOKEN: /^[A-Za-z0-9]{32,64}$/,
  },

  // Content validation
  CONTENT: {
    TITLE: /^[a-zA-Z0-9\s\-_,.!?()]{1,200}$/,
    BODY: /^[\s\S]{1,10000}$/,
    SUBJECT: /^[a-zA-Z0-9\s\-_,.!?()]{1,200}$/,
  },

  // File patterns
  FILE: {
    IMAGE: /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i,
    DOCUMENT: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/i,
    ATTACHMENT: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|jpg|jpeg|png|gif|bmp|webp|svg)$/i,
  },
} as const;

// Helper function to test regex patterns
export const NotificationRegexTester = {
  testEmail: (value: string): boolean => NotificationRegex.EMAIL.test(value),
  testBangladeshPhone: (value: string): boolean => NotificationRegex.PHONE.BANGLADESH.test(value),
  testInternationalPhone: (value: string): boolean =>
    NotificationRegex.PHONE.INTERNATIONAL.test(value),
  testURL: (value: string): boolean => NotificationRegex.URL.test(value),
  testUUID: (value: string): boolean => NotificationRegex.UUID.test(value),
  testPassword: (value: string): boolean => NotificationRegex.PASSWORD.test(value),
  testSlug: (value: string): boolean => NotificationRegex.SLUG.test(value),
  testHexColor: (value: string): boolean => NotificationRegex.HEX_COLOR.test(value),
  testIPV4: (value: string): boolean => NotificationRegex.IP.IPV4.test(value),
  testIPV6: (value: string): boolean => NotificationRegex.IP.IPV6.test(value),
  testNotificationId: (value: string): boolean => NotificationRegex.NOTIFICATION.ID.test(value),
  testTemplateId: (value: string): boolean =>
    NotificationRegex.NOTIFICATION.TEMPLATE_ID.test(value),
  testBroadcastId: (value: string): boolean =>
    NotificationRegex.NOTIFICATION.BROADCAST_ID.test(value),
  testDigestId: (value: string): boolean => NotificationRegex.NOTIFICATION.DIGEST_ID.test(value),
  testScheduleId: (value: string): boolean =>
    NotificationRegex.NOTIFICATION.SCHEDULE_ID.test(value),
  testRuleId: (value: string): boolean => NotificationRegex.NOTIFICATION.RULE_ID.test(value),
  testJWT: (value: string): boolean => NotificationRegex.TOKEN.JWT.test(value),
  testApiKey: (value: string): boolean => NotificationRegex.TOKEN.API_KEY.test(value),
  testTitle: (value: string): boolean => NotificationRegex.CONTENT.TITLE.test(value),
  testSubject: (value: string): boolean => NotificationRegex.CONTENT.SUBJECT.test(value),
  testImageFile: (value: string): boolean => NotificationRegex.FILE.IMAGE.test(value),
  testDocumentFile: (value: string): boolean => NotificationRegex.FILE.DOCUMENT.test(value),
  testAttachmentFile: (value: string): boolean => NotificationRegex.FILE.ATTACHMENT.test(value),
  testHtmlTag: (value: string): boolean => NotificationRegex.HTML_TAG.test(value),
};
