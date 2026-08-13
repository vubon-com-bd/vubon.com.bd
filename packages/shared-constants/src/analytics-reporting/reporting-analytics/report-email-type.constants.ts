/**
 * @fileoverview Report email type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Email types enum
 */
export enum EmailType {
  /** Scheduled report email */
  SCHEDULED_REPORT_EMAIL = 'SCHEDULED_REPORT_EMAIL',
  /** On-demand report email */
  ON_DEMAND_REPORT_EMAIL = 'ON_DEMAND_REPORT_EMAIL',
  /** Daily digest email */
  DAILY_DIGEST_EMAIL = 'DAILY_DIGEST_EMAIL',
  /** Weekly digest email */
  WEEKLY_DIGEST_EMAIL = 'WEEKLY_DIGEST_EMAIL',
  /** Monthly digest email */
  MONTHLY_DIGEST_EMAIL = 'MONTHLY_DIGEST_EMAIL',
  /** Alert email */
  ALERT_EMAIL = 'ALERT_EMAIL',
  /** Notification email */
  NOTIFICATION_EMAIL = 'NOTIFICATION_EMAIL',
  /** Announcement email */
  ANNOUNCEMENT_EMAIL = 'ANNOUNCEMENT_EMAIL',
  /** Update email */
  UPDATE_EMAIL = 'UPDATE_EMAIL',
  /** Reminder email */
  REMINDER_EMAIL = 'REMINDER_EMAIL',
  /** Follow-up email */
  FOLLOW_UP_EMAIL = 'FOLLOW_UP_EMAIL',
  /** Confirmation email */
  CONFIRMATION_EMAIL = 'CONFIRMATION_EMAIL',
  /** Acknowledgment email */
  ACKNOWLEDGMENT_EMAIL = 'ACKNOWLEDGMENT_EMAIL',
  /** Feedback email */
  FEEDBACK_EMAIL = 'FEEDBACK_EMAIL',
  /** Survey email */
  SURVEY_EMAIL = 'SURVEY_EMAIL',
  /** Invitation email */
  INVITATION_EMAIL = 'INVITATION_EMAIL',
  /** Welcome email */
  WELCOME_EMAIL = 'WELCOME_EMAIL',
  /** Onboarding email */
  ONBOARDING_EMAIL = 'ONBOARDING_EMAIL',
  /** Reactivation email */
  REACTIVATION_EMAIL = 'REACTIVATION_EMAIL',
  /** Re-engagement email */
  REENGAGEMENT_EMAIL = 'REENGAGEMENT_EMAIL',
  /** Loyalty email */
  LOYALTY_EMAIL = 'LOYALTY_EMAIL',
  /** Promotional email */
  PROMOTIONAL_EMAIL = 'PROMOTIONAL_EMAIL',
  /** Transactional email */
  TRANSACTIONAL_EMAIL = 'TRANSACTIONAL_EMAIL',
  /** Operational email */
  OPERATIONAL_EMAIL = 'OPERATIONAL_EMAIL',
  /** System email */
  SYSTEM_EMAIL = 'SYSTEM_EMAIL',
  /** Admin email */
  ADMIN_EMAIL = 'ADMIN_EMAIL',
  /** Customer email */
  CUSTOMER_EMAIL = 'CUSTOMER_EMAIL',
  /** Vendor email */
  VENDOR_EMAIL = 'VENDOR_EMAIL',
  /** Partner email */
  PARTNER_EMAIL = 'PARTNER_EMAIL',
  /** Stakeholder email */
  STAKEHOLDER_EMAIL = 'STAKEHOLDER_EMAIL',
  /** Public email */
  PUBLIC_EMAIL = 'PUBLIC_EMAIL',
  /** Private email */
  PRIVATE_EMAIL = 'PRIVATE_EMAIL',
  /** Confidential email */
  CONFIDENTIAL_EMAIL = 'CONFIDENTIAL_EMAIL',
  /** Secure email */
  SECURE_EMAIL = 'SECURE_EMAIL',
  /** Unsubscribed email */
  UNSUBSCRIBED_EMAIL = 'UNSUBSCRIBED_EMAIL',
  /** Bounce email */
  BOUNCE_EMAIL = 'BOUNCE_EMAIL',
  /** Spam email */
  SPAM_EMAIL = 'SPAM_EMAIL',
  /** Phishing email */
  PHISHING_EMAIL = 'PHISHING_EMAIL',
}

/**
 * Email category for grouping
 */
export enum EmailCategory {
  /** Report emails */
  REPORT = 'REPORT',
  /** Digest emails */
  DIGEST = 'DIGEST',
  /** Alert emails */
  ALERT = 'ALERT',
  /** Notification emails */
  NOTIFICATION = 'NOTIFICATION',
  /** Marketing emails */
  MARKETING = 'MARKETING',
  /** Transactional emails */
  TRANSACTIONAL = 'TRANSACTIONAL',
  /** Operational emails */
  OPERATIONAL = 'OPERATIONAL',
  /** System emails */
  SYSTEM = 'SYSTEM',
  /** Security emails */
  SECURITY = 'SECURITY',
  /** Audience emails */
  AUDIENCE = 'AUDIENCE',
}

/**
 * Email category mapping
 */
export const EMAIL_TYPE_CATEGORY_MAP: Record<EmailType, EmailCategory> = {
  [EmailType.SCHEDULED_REPORT_EMAIL]: EmailCategory.REPORT,
  [EmailType.ON_DEMAND_REPORT_EMAIL]: EmailCategory.REPORT,
  [EmailType.DAILY_DIGEST_EMAIL]: EmailCategory.DIGEST,
  [EmailType.WEEKLY_DIGEST_EMAIL]: EmailCategory.DIGEST,
  [EmailType.MONTHLY_DIGEST_EMAIL]: EmailCategory.DIGEST,
  [EmailType.ALERT_EMAIL]: EmailCategory.ALERT,
  [EmailType.NOTIFICATION_EMAIL]: EmailCategory.NOTIFICATION,
  [EmailType.ANNOUNCEMENT_EMAIL]: EmailCategory.NOTIFICATION,
  [EmailType.UPDATE_EMAIL]: EmailCategory.NOTIFICATION,
  [EmailType.REMINDER_EMAIL]: EmailCategory.NOTIFICATION,
  [EmailType.FOLLOW_UP_EMAIL]: EmailCategory.MARKETING,
  [EmailType.CONFIRMATION_EMAIL]: EmailCategory.TRANSACTIONAL,
  [EmailType.ACKNOWLEDGMENT_EMAIL]: EmailCategory.TRANSACTIONAL,
  [EmailType.FEEDBACK_EMAIL]: EmailCategory.MARKETING,
  [EmailType.SURVEY_EMAIL]: EmailCategory.MARKETING,
  [EmailType.INVITATION_EMAIL]: EmailCategory.MARKETING,
  [EmailType.WELCOME_EMAIL]: EmailCategory.MARKETING,
  [EmailType.ONBOARDING_EMAIL]: EmailCategory.MARKETING,
  [EmailType.REACTIVATION_EMAIL]: EmailCategory.MARKETING,
  [EmailType.REENGAGEMENT_EMAIL]: EmailCategory.MARKETING,
  [EmailType.LOYALTY_EMAIL]: EmailCategory.MARKETING,
  [EmailType.PROMOTIONAL_EMAIL]: EmailCategory.MARKETING,
  [EmailType.TRANSACTIONAL_EMAIL]: EmailCategory.TRANSACTIONAL,
  [EmailType.OPERATIONAL_EMAIL]: EmailCategory.OPERATIONAL,
  [EmailType.SYSTEM_EMAIL]: EmailCategory.SYSTEM,
  [EmailType.ADMIN_EMAIL]: EmailCategory.SYSTEM,
  [EmailType.CUSTOMER_EMAIL]: EmailCategory.AUDIENCE,
  [EmailType.VENDOR_EMAIL]: EmailCategory.AUDIENCE,
  [EmailType.PARTNER_EMAIL]: EmailCategory.AUDIENCE,
  [EmailType.STAKEHOLDER_EMAIL]: EmailCategory.AUDIENCE,
  [EmailType.PUBLIC_EMAIL]: EmailCategory.AUDIENCE,
  [EmailType.PRIVATE_EMAIL]: EmailCategory.SECURITY,
  [EmailType.CONFIDENTIAL_EMAIL]: EmailCategory.SECURITY,
  [EmailType.SECURE_EMAIL]: EmailCategory.SECURITY,
  [EmailType.UNSUBSCRIBED_EMAIL]: EmailCategory.OPERATIONAL,
  [EmailType.BOUNCE_EMAIL]: EmailCategory.OPERATIONAL,
  [EmailType.SPAM_EMAIL]: EmailCategory.SECURITY,
  [EmailType.PHISHING_EMAIL]: EmailCategory.SECURITY,
};

/**
 * Email type configuration
 */
export interface EmailTypeConfig {
  label: string;
  description: string;
  category: EmailCategory;
  icon?: string;
  color?: string;
  priority: number;
  isTransactional: boolean;
  requiresAuth: boolean;
  supportsUnsubscribe: boolean;
  isAutomated: boolean;
}

export const EMAIL_TYPE_CONFIG: Record<EmailType, EmailTypeConfig> = {
  [EmailType.SCHEDULED_REPORT_EMAIL]: {
    label: 'Scheduled Report',
    description: 'Report emails sent on a schedule',
    category: EmailCategory.REPORT,
    icon: 'Calendar',
    color: '#3B82F6',
    priority: 1,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.ON_DEMAND_REPORT_EMAIL]: {
    label: 'On-Demand Report',
    description: 'Report emails sent on request',
    category: EmailCategory.REPORT,
    icon: 'FilePlus',
    color: '#6366F1',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.DAILY_DIGEST_EMAIL]: {
    label: 'Daily Digest',
    description: 'Daily summary digest email',
    category: EmailCategory.DIGEST,
    icon: 'Calendar',
    color: '#10B981',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.WEEKLY_DIGEST_EMAIL]: {
    label: 'Weekly Digest',
    description: 'Weekly summary digest email',
    category: EmailCategory.DIGEST,
    icon: 'Calendar',
    color: '#22C55E',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.MONTHLY_DIGEST_EMAIL]: {
    label: 'Monthly Digest',
    description: 'Monthly summary digest email',
    category: EmailCategory.DIGEST,
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.ALERT_EMAIL]: {
    label: 'Alert',
    description: 'Alert and warning emails',
    category: EmailCategory.ALERT,
    icon: 'Bell',
    color: '#EF4444',
    priority: 1,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.NOTIFICATION_EMAIL]: {
    label: 'Notification',
    description: 'General notification emails',
    category: EmailCategory.NOTIFICATION,
    icon: 'Bell',
    color: '#8B5CF6',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.ANNOUNCEMENT_EMAIL]: {
    label: 'Announcement',
    description: 'Important announcement emails',
    category: EmailCategory.NOTIFICATION,
    icon: 'Megaphone',
    color: '#F472B6',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.UPDATE_EMAIL]: {
    label: 'Update',
    description: 'Update notification emails',
    category: EmailCategory.NOTIFICATION,
    icon: 'Refresh',
    color: '#10B981',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.REMINDER_EMAIL]: {
    label: 'Reminder',
    description: 'Reminder notification emails',
    category: EmailCategory.NOTIFICATION,
    icon: 'Clock',
    color: '#F59E0B',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.FOLLOW_UP_EMAIL]: {
    label: 'Follow-Up',
    description: 'Follow-up email communications',
    category: EmailCategory.MARKETING,
    icon: 'MessageSquare',
    color: '#8B5CF6',
    priority: 3,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.CONFIRMATION_EMAIL]: {
    label: 'Confirmation',
    description: 'Action confirmation emails',
    category: EmailCategory.TRANSACTIONAL,
    icon: 'CheckCircle',
    color: '#22C55E',
    priority: 1,
    isTransactional: true,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.ACKNOWLEDGMENT_EMAIL]: {
    label: 'Acknowledgment',
    description: 'Acknowledgement receipt emails',
    category: EmailCategory.TRANSACTIONAL,
    icon: 'CheckCircle',
    color: '#10B981',
    priority: 2,
    isTransactional: true,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.FEEDBACK_EMAIL]: {
    label: 'Feedback',
    description: 'Feedback request emails',
    category: EmailCategory.MARKETING,
    icon: 'MessageSquare',
    color: '#F472B6',
    priority: 3,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.SURVEY_EMAIL]: {
    label: 'Survey',
    description: 'Survey invitation emails',
    category: EmailCategory.MARKETING,
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 3,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.INVITATION_EMAIL]: {
    label: 'Invitation',
    description: 'Invitation emails',
    category: EmailCategory.MARKETING,
    icon: 'Mail',
    color: '#6366F1',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.WELCOME_EMAIL]: {
    label: 'Welcome',
    description: 'Welcome email for new users',
    category: EmailCategory.MARKETING,
    icon: 'UserPlus',
    color: '#22C55E',
    priority: 1,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.ONBOARDING_EMAIL]: {
    label: 'Onboarding',
    description: 'User onboarding email sequence',
    category: EmailCategory.MARKETING,
    icon: 'Rocket',
    color: '#3B82F6',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.REACTIVATION_EMAIL]: {
    label: 'Reactivation',
    description: 'User reactivation emails',
    category: EmailCategory.MARKETING,
    icon: 'Refresh',
    color: '#F59E0B',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.REENGAGEMENT_EMAIL]: {
    label: 'Re-engagement',
    description: 'User re-engagement emails',
    category: EmailCategory.MARKETING,
    icon: 'Refresh',
    color: '#F472B6',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.LOYALTY_EMAIL]: {
    label: 'Loyalty',
    description: 'Loyalty program emails',
    category: EmailCategory.MARKETING,
    icon: 'Heart',
    color: '#EC4899',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: true,
  },
  [EmailType.PROMOTIONAL_EMAIL]: {
    label: 'Promotional',
    description: 'Promotional marketing emails',
    category: EmailCategory.MARKETING,
    icon: 'Megaphone',
    color: '#F97316',
    priority: 3,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.TRANSACTIONAL_EMAIL]: {
    label: 'Transactional',
    description: 'Transaction-related emails',
    category: EmailCategory.TRANSACTIONAL,
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 1,
    isTransactional: true,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.OPERATIONAL_EMAIL]: {
    label: 'Operational',
    description: 'Operational system emails',
    category: EmailCategory.OPERATIONAL,
    icon: 'Settings',
    color: '#6B7280',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.SYSTEM_EMAIL]: {
    label: 'System',
    description: 'System generated emails',
    category: EmailCategory.SYSTEM,
    icon: 'Monitor',
    color: '#6B7280',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.ADMIN_EMAIL]: {
    label: 'Admin',
    description: 'Administrative emails',
    category: EmailCategory.SYSTEM,
    icon: 'Shield',
    color: '#3B82F6',
    priority: 1,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.CUSTOMER_EMAIL]: {
    label: 'Customer',
    description: 'Customer-facing emails',
    category: EmailCategory.AUDIENCE,
    icon: 'User',
    color: '#22C55E',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.VENDOR_EMAIL]: {
    label: 'Vendor',
    description: 'Vendor communication emails',
    category: EmailCategory.AUDIENCE,
    icon: 'Truck',
    color: '#F59E0B',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.PARTNER_EMAIL]: {
    label: 'Partner',
    description: 'Partner communication emails',
    category: EmailCategory.AUDIENCE,
    icon: 'Handshake',
    color: '#8B5CF6',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.STAKEHOLDER_EMAIL]: {
    label: 'Stakeholder',
    description: 'Stakeholder communication emails',
    category: EmailCategory.AUDIENCE,
    icon: 'Users',
    color: '#6366F1',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.PUBLIC_EMAIL]: {
    label: 'Public',
    description: 'Public-facing emails',
    category: EmailCategory.AUDIENCE,
    icon: 'Globe',
    color: '#10B981',
    priority: 3,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: true,
    isAutomated: false,
  },
  [EmailType.PRIVATE_EMAIL]: {
    label: 'Private',
    description: 'Private and confidential emails',
    category: EmailCategory.SECURITY,
    icon: 'Lock',
    color: '#6B7280',
    priority: 2,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: false,
  },
  [EmailType.CONFIDENTIAL_EMAIL]: {
    label: 'Confidential',
    description: 'Highly confidential emails',
    category: EmailCategory.SECURITY,
    icon: 'Shield',
    color: '#EF4444',
    priority: 1,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: false,
  },
  [EmailType.SECURE_EMAIL]: {
    label: 'Secure',
    description: 'Secure encrypted emails',
    category: EmailCategory.SECURITY,
    icon: 'ShieldCheck',
    color: '#22C55E',
    priority: 1,
    isTransactional: false,
    requiresAuth: true,
    supportsUnsubscribe: false,
    isAutomated: false,
  },
  [EmailType.UNSUBSCRIBED_EMAIL]: {
    label: 'Unsubscribed',
    description: 'Unsubscribed email status',
    category: EmailCategory.OPERATIONAL,
    icon: 'XCircle',
    color: '#6B7280',
    priority: 3,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.BOUNCE_EMAIL]: {
    label: 'Bounce',
    description: 'Email bounce notifications',
    category: EmailCategory.OPERATIONAL,
    icon: 'AlertTriangle',
    color: '#EF4444',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.SPAM_EMAIL]: {
    label: 'Spam',
    description: 'Spam email detection',
    category: EmailCategory.SECURITY,
    icon: 'AlertTriangle',
    color: '#EF4444',
    priority: 2,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
  [EmailType.PHISHING_EMAIL]: {
    label: 'Phishing',
    description: 'Phishing email detection',
    category: EmailCategory.SECURITY,
    icon: 'ShieldOff',
    color: '#DC2626',
    priority: 1,
    isTransactional: false,
    requiresAuth: false,
    supportsUnsubscribe: false,
    isAutomated: true,
  },
};

/**
 * Get email type label
 */
export function getEmailTypeLabel(type: EmailType): string {
  return EMAIL_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get email type description
 */
export function getEmailTypeDescription(type: EmailType): string {
  return EMAIL_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get email type category
 */
export function getEmailTypeCategory(type: EmailType): EmailCategory {
  return EMAIL_TYPE_CATEGORY_MAP[type];
}

/**
 * Get email types by category
 */
export function getEmailTypesByCategory(category: EmailCategory): EmailType[] {
  return Object.entries(EMAIL_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as EmailType);
}

/**
 * Get report emails
 */
export function getReportEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.REPORT);
}

/**
 * Get digest emails
 */
export function getDigestEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.DIGEST);
}

/**
 * Get alert emails
 */
export function getAlertEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.ALERT);
}

/**
 * Get notification emails
 */
export function getNotificationEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.NOTIFICATION);
}

/**
 * Get marketing emails
 */
export function getMarketingEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.MARKETING);
}

/**
 * Get transactional emails
 */
export function getTransactionalEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.TRANSACTIONAL);
}

/**
 * Get operational emails
 */
export function getOperationalEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.OPERATIONAL);
}

/**
 * Get system emails
 */
export function getSystemEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.SYSTEM);
}

/**
 * Get security emails
 */
export function getSecurityEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.SECURITY);
}

/**
 * Get audience emails
 */
export function getAudienceEmails(): EmailType[] {
  return getEmailTypesByCategory(EmailCategory.AUDIENCE);
}

/**
 * Check if email type is transactional
 */
export function isEmailTypeTransactional(type: EmailType): boolean {
  return EMAIL_TYPE_CONFIG[type]?.isTransactional || false;
}

/**
 * Check if email type requires authentication
 */
export function emailTypeRequiresAuth(type: EmailType): boolean {
  return EMAIL_TYPE_CONFIG[type]?.requiresAuth || false;
}

/**
 * Check if email type supports unsubscribe
 */
export function emailTypeSupportsUnsubscribe(type: EmailType): boolean {
  return EMAIL_TYPE_CONFIG[type]?.supportsUnsubscribe || false;
}

/**
 * Check if email type is automated
 */
export function isEmailTypeAutomated(type: EmailType): boolean {
  return EMAIL_TYPE_CONFIG[type]?.isAutomated || false;
}

/**
 * Get email type priority
 */
export function getEmailTypePriority(type: EmailType): number {
  return EMAIL_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Email type status
 */
export enum EmailTypeStatus {
  /** Active and available */
  ACTIVE = 'ACTIVE',
  /** Inactive and hidden */
  INACTIVE = 'INACTIVE',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for email types
 */
export const EMAIL_TYPE_DEFAULT_STATUS: Record<EmailType, EmailTypeStatus> = {
  [EmailType.SCHEDULED_REPORT_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.ON_DEMAND_REPORT_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.DAILY_DIGEST_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.WEEKLY_DIGEST_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.MONTHLY_DIGEST_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.ALERT_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.NOTIFICATION_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.ANNOUNCEMENT_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.UPDATE_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.REMINDER_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.FOLLOW_UP_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.CONFIRMATION_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.ACKNOWLEDGMENT_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.FEEDBACK_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.SURVEY_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.INVITATION_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.WELCOME_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.ONBOARDING_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.REACTIVATION_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.REENGAGEMENT_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.LOYALTY_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.PROMOTIONAL_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.TRANSACTIONAL_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.OPERATIONAL_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.SYSTEM_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.ADMIN_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.CUSTOMER_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.VENDOR_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.PARTNER_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.STAKEHOLDER_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.PUBLIC_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.PRIVATE_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.CONFIDENTIAL_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.SECURE_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.UNSUBSCRIBED_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.BOUNCE_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.SPAM_EMAIL]: EmailTypeStatus.ACTIVE,
  [EmailType.PHISHING_EMAIL]: EmailTypeStatus.ACTIVE,
};

/**
 * Get email type status
 */
export function getEmailTypeStatus(type: EmailType): EmailTypeStatus {
  return EMAIL_TYPE_DEFAULT_STATUS[type] || EmailTypeStatus.INACTIVE;
}

/**
 * Set email type status
 */
export function setEmailTypeStatus(type: EmailType, status: EmailTypeStatus): void {
  EMAIL_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Email type priority levels
 */
export const EMAIL_TYPE_PRIORITY_LEVELS = {
  /** Critical - essential emails */
  CRITICAL: 1,
  /** High - important emails */
  HIGH: 2,
  /** Medium - useful emails */
  MEDIUM: 3,
  /** Low - nice to have */
  LOW: 4,
} as const;

/**
 * Get email types by priority
 */
export function getEmailTypesByPriority(priority: number): EmailType[] {
  return Object.entries(EMAIL_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as EmailType);
}

/**
 * Get critical email types
 */
export function getCriticalEmailTypes(): EmailType[] {
  return getEmailTypesByPriority(EMAIL_TYPE_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Email type groups
 */
export const EMAIL_TYPE_GROUPS = {
  /** Report emails */
  REPORT: [EmailType.SCHEDULED_REPORT_EMAIL, EmailType.ON_DEMAND_REPORT_EMAIL],
  /** Digest emails */
  DIGEST: [
    EmailType.DAILY_DIGEST_EMAIL,
    EmailType.WEEKLY_DIGEST_EMAIL,
    EmailType.MONTHLY_DIGEST_EMAIL,
  ],
  /** Alert and notification emails */
  ALERT_NOTIFICATION: [
    EmailType.ALERT_EMAIL,
    EmailType.NOTIFICATION_EMAIL,
    EmailType.ANNOUNCEMENT_EMAIL,
    EmailType.UPDATE_EMAIL,
    EmailType.REMINDER_EMAIL,
  ],
  /** Marketing emails */
  MARKETING: [
    EmailType.FOLLOW_UP_EMAIL,
    EmailType.FEEDBACK_EMAIL,
    EmailType.SURVEY_EMAIL,
    EmailType.INVITATION_EMAIL,
    EmailType.WELCOME_EMAIL,
    EmailType.ONBOARDING_EMAIL,
    EmailType.REACTIVATION_EMAIL,
    EmailType.REENGAGEMENT_EMAIL,
    EmailType.LOYALTY_EMAIL,
    EmailType.PROMOTIONAL_EMAIL,
  ],
  /** Transactional emails */
  TRANSACTIONAL: [
    EmailType.CONFIRMATION_EMAIL,
    EmailType.ACKNOWLEDGMENT_EMAIL,
    EmailType.TRANSACTIONAL_EMAIL,
  ],
  /** Security emails */
  SECURITY: [
    EmailType.CONFIDENTIAL_EMAIL,
    EmailType.SECURE_EMAIL,
    EmailType.PRIVATE_EMAIL,
    EmailType.SPAM_EMAIL,
    EmailType.PHISHING_EMAIL,
  ],
} as const;
