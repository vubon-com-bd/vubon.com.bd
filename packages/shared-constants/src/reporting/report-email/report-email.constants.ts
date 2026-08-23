/**
 * Report Email Constants
 * Configuration for email delivery of reports
 */

export const REPORT_EMAIL = {
  // Email Types
  TYPES: {
    SCHEDULED: 'scheduled',
    ON_DEMAND: 'on_demand',
    TRIGGERED: 'triggered',
    ALERT: 'alert',
    DIGEST: 'digest',
    BULK: 'bulk',
    TEST: 'test',
  } as const,

  // Email Priorities
  PRIORITIES: {
    LOW: 'low',
    NORMAL: 'normal',
    HIGH: 'high',
    URGENT: 'urgent',
  } as const,

  // Email Formats
  FORMATS: {
    HTML: 'html',
    TEXT: 'text',
    BOTH: 'both',
    PDF: 'pdf',
    ATTACHMENT: 'attachment',
  } as const,

  // Email Delivery Methods
  DELIVERY_METHODS: {
    SMTP: 'smtp',
    API: 'api',
    WEBHOOK: 'webhook',
    QUEUE: 'queue',
    BATCH: 'batch',
  } as const,

  // Email Templates
  TEMPLATES: {
    STANDARD: 'standard',
    COMPACT: 'compact',
    DETAILED: 'detailed',
    EXECUTIVE: 'executive',
    CUSTOM: 'custom',
  } as const,

  // Email Headers
  HEADERS: {
    PRIORITY: 'X-Priority',
    AUTO_RESPONDER: 'X-Auto-Response-Suppress',
    MAILER: 'X-Mailer',
    REPORT_ID: 'X-Report-ID',
    REPORT_TYPE: 'X-Report-Type',
    ORGANIZATION: 'X-Organization',
    DEPARTMENT: 'X-Department',
    CUSTOM: 'X-Custom',
  } as const,

  // Email Attachments
  ATTACHMENT_TYPES: {
    PDF: 'application/pdf',
    EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    CSV: 'text/csv',
    JSON: 'application/json',
    XML: 'application/xml',
    ZIP: 'application/zip',
    IMAGE: 'image/*',
  } as const,

  // Email Recipient Types
  RECIPIENT_TYPES: {
    TO: 'to',
    CC: 'cc',
    BCC: 'bcc',
    REPLY_TO: 'reply_to',
    SENDER: 'sender',
  } as const,

  // Email Defaults
  DEFAULTS: {
    PRIORITY: 'normal',
    FORMAT: 'html',
    TEMPLATE: 'standard',
    DELIVERY_METHOD: 'smtp',
    MAX_RECIPIENTS: 50,
    MAX_ATTACHMENTS: 10,
    MAX_ATTACHMENT_SIZE: 25, // MB
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 300, // seconds
    TIMEOUT: 60, // seconds
    CHARSET: 'UTF-8',
    ENCODING: 'base64',
  } as const,

  // Email Limits
  LIMITS: {
    MAX_RECIPIENTS: 100,
    MAX_ATTACHMENTS: 20,
    MAX_ATTACHMENT_SIZE: 50, // MB
    MAX_SUBJECT_LENGTH: 200,
    MAX_BODY_LENGTH: 1000000,
    MAX_RETRY_ATTEMPTS: 5,
  } as const,

  // Email Tracking
  TRACKING: {
    OPEN: 'open',
    CLICK: 'click',
    BOUNCE: 'bounce',
    COMPLAINT: 'complaint',
    DELIVERY: 'delivery',
    UNSUBSCRIBE: 'unsubscribe',
  } as const,

  // Email Security
  SECURITY: {
    TLS: 'tls',
    SSL: 'ssl',
    STARTTLS: 'starttls',
    ENCRYPTED: 'encrypted',
    SIGNED: 'signed',
    ENCRYPTED_AND_SIGNED: 'encrypted_and_signed',
    NONE: 'none',
  } as const,
} as const;

// Email Types
export type ReportEmailType = (typeof REPORT_EMAIL.TYPES)[keyof typeof REPORT_EMAIL.TYPES];

// Email Priorities
export type ReportEmailPriority =
  (typeof REPORT_EMAIL.PRIORITIES)[keyof typeof REPORT_EMAIL.PRIORITIES];

// Email Formats
export type ReportEmailFormat = (typeof REPORT_EMAIL.FORMATS)[keyof typeof REPORT_EMAIL.FORMATS];

// Email Delivery Methods
export type ReportEmailDeliveryMethod =
  (typeof REPORT_EMAIL.DELIVERY_METHODS)[keyof typeof REPORT_EMAIL.DELIVERY_METHODS];

// Email Templates
export type ReportEmailTemplate =
  (typeof REPORT_EMAIL.TEMPLATES)[keyof typeof REPORT_EMAIL.TEMPLATES];

// Email Headers
export type ReportEmailHeader = (typeof REPORT_EMAIL.HEADERS)[keyof typeof REPORT_EMAIL.HEADERS];

// Email Attachment Types
export type ReportEmailAttachmentType =
  (typeof REPORT_EMAIL.ATTACHMENT_TYPES)[keyof typeof REPORT_EMAIL.ATTACHMENT_TYPES];

// Email Recipient Types
export type ReportEmailRecipientType =
  (typeof REPORT_EMAIL.RECIPIENT_TYPES)[keyof typeof REPORT_EMAIL.RECIPIENT_TYPES];

// Email Tracking
export type ReportEmailTracking =
  (typeof REPORT_EMAIL.TRACKING)[keyof typeof REPORT_EMAIL.TRACKING];

// Email Security
export type ReportEmailSecurity =
  (typeof REPORT_EMAIL.SECURITY)[keyof typeof REPORT_EMAIL.SECURITY];

// Utility Functions
export function reportEmailGetTypeLabel(type: ReportEmailType): string {
  const labels: Record<ReportEmailType, string> = {
    [REPORT_EMAIL.TYPES.SCHEDULED]: 'Scheduled Email',
    [REPORT_EMAIL.TYPES.ON_DEMAND]: 'On-Demand Email',
    [REPORT_EMAIL.TYPES.TRIGGERED]: 'Triggered Email',
    [REPORT_EMAIL.TYPES.ALERT]: 'Alert Email',
    [REPORT_EMAIL.TYPES.DIGEST]: 'Digest Email',
    [REPORT_EMAIL.TYPES.BULK]: 'Bulk Email',
    [REPORT_EMAIL.TYPES.TEST]: 'Test Email',
  };
  return labels[type] || 'Unknown Type';
}

export function reportEmailGetPriorityLabel(priority: ReportEmailPriority): string {
  const labels: Record<ReportEmailPriority, string> = {
    [REPORT_EMAIL.PRIORITIES.LOW]: 'Low',
    [REPORT_EMAIL.PRIORITIES.NORMAL]: 'Normal',
    [REPORT_EMAIL.PRIORITIES.HIGH]: 'High',
    [REPORT_EMAIL.PRIORITIES.URGENT]: 'Urgent',
  };
  return labels[priority] || 'Unknown Priority';
}

export function reportEmailGetFormatLabel(format: ReportEmailFormat): string {
  const labels: Record<ReportEmailFormat, string> = {
    [REPORT_EMAIL.FORMATS.HTML]: 'HTML',
    [REPORT_EMAIL.FORMATS.TEXT]: 'Plain Text',
    [REPORT_EMAIL.FORMATS.BOTH]: 'HTML + Text',
    [REPORT_EMAIL.FORMATS.PDF]: 'PDF',
    [REPORT_EMAIL.FORMATS.ATTACHMENT]: 'Attachment',
  };
  return labels[format] || 'Unknown Format';
}

export function reportEmailGetDeliveryMethodLabel(method: ReportEmailDeliveryMethod): string {
  const labels: Record<ReportEmailDeliveryMethod, string> = {
    [REPORT_EMAIL.DELIVERY_METHODS.SMTP]: 'SMTP',
    [REPORT_EMAIL.DELIVERY_METHODS.API]: 'API',
    [REPORT_EMAIL.DELIVERY_METHODS.WEBHOOK]: 'Webhook',
    [REPORT_EMAIL.DELIVERY_METHODS.QUEUE]: 'Queue',
    [REPORT_EMAIL.DELIVERY_METHODS.BATCH]: 'Batch',
  };
  return labels[method] || 'Unknown Method';
}

export function reportEmailGetTemplateLabel(template: ReportEmailTemplate): string {
  const labels: Record<ReportEmailTemplate, string> = {
    [REPORT_EMAIL.TEMPLATES.STANDARD]: 'Standard',
    [REPORT_EMAIL.TEMPLATES.COMPACT]: 'Compact',
    [REPORT_EMAIL.TEMPLATES.DETAILED]: 'Detailed',
    [REPORT_EMAIL.TEMPLATES.EXECUTIVE]: 'Executive',
    [REPORT_EMAIL.TEMPLATES.CUSTOM]: 'Custom',
  };
  return labels[template] || 'Unknown Template';
}

export function reportEmailGetRecipientTypeLabel(recipientType: ReportEmailRecipientType): string {
  const labels: Record<ReportEmailRecipientType, string> = {
    [REPORT_EMAIL.RECIPIENT_TYPES.TO]: 'To',
    [REPORT_EMAIL.RECIPIENT_TYPES.CC]: 'CC',
    [REPORT_EMAIL.RECIPIENT_TYPES.BCC]: 'BCC',
    [REPORT_EMAIL.RECIPIENT_TYPES.REPLY_TO]: 'Reply-To',
    [REPORT_EMAIL.RECIPIENT_TYPES.SENDER]: 'Sender',
  };
  return labels[recipientType] || 'Unknown Recipient Type';
}

export function reportEmailGetTrackingLabel(tracking: ReportEmailTracking): string {
  const labels: Record<ReportEmailTracking, string> = {
    [REPORT_EMAIL.TRACKING.OPEN]: 'Opened',
    [REPORT_EMAIL.TRACKING.CLICK]: 'Clicked',
    [REPORT_EMAIL.TRACKING.BOUNCE]: 'Bounced',
    [REPORT_EMAIL.TRACKING.COMPLAINT]: 'Complaint',
    [REPORT_EMAIL.TRACKING.DELIVERY]: 'Delivered',
    [REPORT_EMAIL.TRACKING.UNSUBSCRIBE]: 'Unsubscribed',
  };
  return labels[tracking] || 'Unknown Tracking';
}

export function reportEmailGetSecurityLabel(security: ReportEmailSecurity): string {
  const labels: Record<ReportEmailSecurity, string> = {
    [REPORT_EMAIL.SECURITY.TLS]: 'TLS',
    [REPORT_EMAIL.SECURITY.SSL]: 'SSL',
    [REPORT_EMAIL.SECURITY.STARTTLS]: 'STARTTLS',
    [REPORT_EMAIL.SECURITY.ENCRYPTED]: 'Encrypted',
    [REPORT_EMAIL.SECURITY.SIGNED]: 'Signed',
    [REPORT_EMAIL.SECURITY.ENCRYPTED_AND_SIGNED]: 'Encrypted & Signed',
    [REPORT_EMAIL.SECURITY.NONE]: 'None',
  };
  return labels[security] || 'Unknown Security';
}

export function reportEmailGetAttachmentTypeLabel(
  attachmentType: ReportEmailAttachmentType
): string {
  const labels: Record<ReportEmailAttachmentType, string> = {
    [REPORT_EMAIL.ATTACHMENT_TYPES.PDF]: 'PDF Document',
    [REPORT_EMAIL.ATTACHMENT_TYPES.EXCEL]: 'Excel Spreadsheet',
    [REPORT_EMAIL.ATTACHMENT_TYPES.CSV]: 'CSV File',
    [REPORT_EMAIL.ATTACHMENT_TYPES.JSON]: 'JSON File',
    [REPORT_EMAIL.ATTACHMENT_TYPES.XML]: 'XML File',
    [REPORT_EMAIL.ATTACHMENT_TYPES.ZIP]: 'ZIP Archive',
    [REPORT_EMAIL.ATTACHMENT_TYPES.IMAGE]: 'Image File',
  };
  return labels[attachmentType] || 'Unknown Attachment Type';
}

export function reportEmailGetMaxRecipients(): number {
  return REPORT_EMAIL.DEFAULTS.MAX_RECIPIENTS;
}

export function reportEmailGetMaxAttachments(): number {
  return REPORT_EMAIL.DEFAULTS.MAX_ATTACHMENTS;
}

export function reportEmailGetMaxAttachmentSize(): number {
  return REPORT_EMAIL.DEFAULTS.MAX_ATTACHMENT_SIZE;
}

export function reportEmailGetRetryAttempts(): number {
  return REPORT_EMAIL.DEFAULTS.RETRY_ATTEMPTS;
}

export function reportEmailGetRetryDelay(): number {
  return REPORT_EMAIL.DEFAULTS.RETRY_DELAY;
}

export function reportEmailGetTimeout(): number {
  return REPORT_EMAIL.DEFAULTS.TIMEOUT;
}

export function reportEmailIsValidType(type: string): type is ReportEmailType {
  return Object.values(REPORT_EMAIL.TYPES).includes(type as ReportEmailType);
}

export function reportEmailIsValidPriority(priority: string): priority is ReportEmailPriority {
  return Object.values(REPORT_EMAIL.PRIORITIES).includes(priority as ReportEmailPriority);
}

export function reportEmailIsValidFormat(format: string): format is ReportEmailFormat {
  return Object.values(REPORT_EMAIL.FORMATS).includes(format as ReportEmailFormat);
}

export function reportEmailGetDefaultPriority(): ReportEmailPriority {
  return REPORT_EMAIL.DEFAULTS.PRIORITY as ReportEmailPriority;
}

export function reportEmailGetDefaultFormat(): ReportEmailFormat {
  return REPORT_EMAIL.DEFAULTS.FORMAT as ReportEmailFormat;
}

export function reportEmailGetDefaultTemplate(): ReportEmailTemplate {
  return REPORT_EMAIL.DEFAULTS.TEMPLATE as ReportEmailTemplate;
}

export function reportEmailGenerateSubject(
  reportName: string,
  reportType: string,
  date?: Date
): string {
  let subject = `[${reportType}] ${reportName}`;
  if (date) {
    const dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    subject = `${subject} - ${dateStr}`;
  }
  return subject;
}
