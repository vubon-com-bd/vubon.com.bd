/**
 * @fileoverview Email status definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Email status enum
 */
export enum EmailStatus {
  /** Draft - email is in draft mode */
  DRAFT = 'DRAFT',
  /** Queued - email is queued for sending */
  QUEUED = 'QUEUED',
  /** Processing - email is being processed */
  PROCESSING = 'PROCESSING',
  /** Sending - email is being sent */
  SENDING = 'SENDING',
  /** Sent - email has been sent */
  SENT = 'SENT',
  /** Delivered - email has been delivered */
  DELIVERED = 'DELIVERED',
  /** Opened - email has been opened */
  OPENED = 'OPENED',
  /** Clicked - email link has been clicked */
  CLICKED = 'CLICKED',
  /** Replied - email has been replied to */
  REPLIED = 'REPLIED',
  /** Forwarded - email has been forwarded */
  FORWARDED = 'FORWARDED',
  /** Bounced - email bounced (hard bounce) */
  BOUNCED_HARD = 'BOUNCED_HARD',
  /** Bounced - email bounced (soft bounce) */
  BOUNCED_SOFT = 'BOUNCED_SOFT',
  /** Failed - email sending failed */
  FAILED = 'FAILED',
  /** Spam reported - email was reported as spam */
  SPAM_REPORTED = 'SPAM_REPORTED',
  /** Complained - email received complaint */
  COMPLAINED = 'COMPLAINED',
  /** Unsubscribed - recipient unsubscribed */
  UNSUBSCRIBED = 'UNSUBSCRIBED',
  /** Suppressed - email was suppressed */
  SUPPRESSED = 'SUPPRESSED',
  /** Cancelled - email was cancelled */
  CANCELLED = 'CANCELLED',
  /** Paused - email sending was paused */
  PAUSED = 'PAUSED',
  /** Resumed - email sending was resumed */
  RESUMED = 'RESUMED',
  /** Expired - email has expired */
  EXPIRED = 'EXPIRED',
  /** Retry scheduled - retry is scheduled */
  RETRY_SCHEDULED = 'RETRY_SCHEDULED',
  /** Retry limit exceeded - retry attempts exhausted */
  RETRY_LIMIT_EXCEEDED = 'RETRY_LIMIT_EXCEEDED',
  /** Permanently failed - email permanently failed */
  PERMANENTLY_FAILED = 'PERMANENTLY_FAILED',
  /** Pending approval - email is pending approval */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /** Approved - email has been approved */
  APPROVED = 'APPROVED',
  /** Rejected - email has been rejected */
  REJECTED = 'REJECTED',
  /** Reviewed - email has been reviewed */
  REVIEWED = 'REVIEWED',
  /** Tested - email has been tested */
  TESTED = 'TESTED',
  /** Ready - email is ready for sending */
  READY = 'READY',
  /** Not ready - email is not ready */
  NOT_READY = 'NOT_READY',
  /** Prepared - email has been prepared */
  PREPARED = 'PREPARED',
  /** Processed - email has been processed */
  PROCESSED = 'PROCESSED',
  /** Completed - email processing completed */
  COMPLETED = 'COMPLETED',
  /** Partial - email processed partially */
  PARTIAL = 'PARTIAL',
  /** Deleted - email has been deleted */
  DELETED = 'DELETED',
  /** Archived - email has been archived */
  ARCHIVED = 'ARCHIVED',
  /** Restored - email has been restored */
  RESTORED = 'RESTORED',
  /** Locked - email is locked */
  LOCKED = 'LOCKED',
  /** Unlocked - email is unlocked */
  UNLOCKED = 'UNLOCKED',
  /** Encrypted - email is encrypted */
  ENCRYPTED = 'ENCRYPTED',
  /** Decrypted - email has been decrypted */
  DECRYPTED = 'DECRYPTED',
  /** Authenticated - email is authenticated */
  AUTHENTICATED = 'AUTHENTICATED',
  /** Unauthenticated - email is unauthenticated */
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  /** Verified - email has been verified */
  VERIFIED = 'VERIFIED',
  /** Unverified - email is unverified */
  UNVERIFIED = 'UNVERIFIED',
  /** Valid - email is valid */
  VALID = 'VALID',
  /** Invalid - email is invalid */
  INVALID = 'INVALID',
}

/**
 * Email status category for grouping
 */
export enum EmailStatusCategory {
  /** Draft states */
  DRAFT = 'DRAFT',
  /** Processing states */
  PROCESSING = 'PROCESSING',
  /** Delivery states */
  DELIVERY = 'DELIVERY',
  /** Success states */
  SUCCESS = 'SUCCESS',
  /** Error states */
  ERROR = 'ERROR',
  /** Feedback states */
  FEEDBACK = 'FEEDBACK',
  /** Approval states */
  APPROVAL = 'APPROVAL',
  /** Readiness states */
  READINESS = 'READINESS',
  /** Lifecycle states */
  LIFECYCLE = 'LIFECYCLE',
  /** Security states */
  SECURITY = 'SECURITY',
  /** Validation states */
  VALIDATION = 'VALIDATION',
  /** Terminal states */
  TERMINAL = 'TERMINAL',
}

/**
 * Email status category mapping
 */
export const EMAIL_STATUS_CATEGORY_MAP: Record<EmailStatus, EmailStatusCategory> = {
  [EmailStatus.DRAFT]: EmailStatusCategory.DRAFT,
  [EmailStatus.QUEUED]: EmailStatusCategory.PROCESSING,
  [EmailStatus.PROCESSING]: EmailStatusCategory.PROCESSING,
  [EmailStatus.SENDING]: EmailStatusCategory.DELIVERY,
  [EmailStatus.SENT]: EmailStatusCategory.DELIVERY,
  [EmailStatus.DELIVERED]: EmailStatusCategory.SUCCESS,
  [EmailStatus.OPENED]: EmailStatusCategory.SUCCESS,
  [EmailStatus.CLICKED]: EmailStatusCategory.SUCCESS,
  [EmailStatus.REPLIED]: EmailStatusCategory.SUCCESS,
  [EmailStatus.FORWARDED]: EmailStatusCategory.SUCCESS,
  [EmailStatus.BOUNCED_HARD]: EmailStatusCategory.ERROR,
  [EmailStatus.BOUNCED_SOFT]: EmailStatusCategory.ERROR,
  [EmailStatus.FAILED]: EmailStatusCategory.ERROR,
  [EmailStatus.SPAM_REPORTED]: EmailStatusCategory.FEEDBACK,
  [EmailStatus.COMPLAINED]: EmailStatusCategory.FEEDBACK,
  [EmailStatus.UNSUBSCRIBED]: EmailStatusCategory.FEEDBACK,
  [EmailStatus.SUPPRESSED]: EmailStatusCategory.FEEDBACK,
  [EmailStatus.CANCELLED]: EmailStatusCategory.TERMINAL,
  [EmailStatus.PAUSED]: EmailStatusCategory.PROCESSING,
  [EmailStatus.RESUMED]: EmailStatusCategory.PROCESSING,
  [EmailStatus.EXPIRED]: EmailStatusCategory.TERMINAL,
  [EmailStatus.RETRY_SCHEDULED]: EmailStatusCategory.PROCESSING,
  [EmailStatus.RETRY_LIMIT_EXCEEDED]: EmailStatusCategory.ERROR,
  [EmailStatus.PERMANENTLY_FAILED]: EmailStatusCategory.TERMINAL,
  [EmailStatus.PENDING_APPROVAL]: EmailStatusCategory.APPROVAL,
  [EmailStatus.APPROVED]: EmailStatusCategory.APPROVAL,
  [EmailStatus.REJECTED]: EmailStatusCategory.APPROVAL,
  [EmailStatus.REVIEWED]: EmailStatusCategory.APPROVAL,
  [EmailStatus.TESTED]: EmailStatusCategory.READINESS,
  [EmailStatus.READY]: EmailStatusCategory.READINESS,
  [EmailStatus.NOT_READY]: EmailStatusCategory.READINESS,
  [EmailStatus.PREPARED]: EmailStatusCategory.PROCESSING,
  [EmailStatus.PROCESSED]: EmailStatusCategory.PROCESSING,
  [EmailStatus.COMPLETED]: EmailStatusCategory.SUCCESS,
  [EmailStatus.PARTIAL]: EmailStatusCategory.ERROR,
  [EmailStatus.DELETED]: EmailStatusCategory.TERMINAL,
  [EmailStatus.ARCHIVED]: EmailStatusCategory.TERMINAL,
  [EmailStatus.RESTORED]: EmailStatusCategory.LIFECYCLE,
  [EmailStatus.LOCKED]: EmailStatusCategory.SECURITY,
  [EmailStatus.UNLOCKED]: EmailStatusCategory.SECURITY,
  [EmailStatus.ENCRYPTED]: EmailStatusCategory.SECURITY,
  [EmailStatus.DECRYPTED]: EmailStatusCategory.SECURITY,
  [EmailStatus.AUTHENTICATED]: EmailStatusCategory.SECURITY,
  [EmailStatus.UNAUTHENTICATED]: EmailStatusCategory.SECURITY,
  [EmailStatus.VERIFIED]: EmailStatusCategory.VALIDATION,
  [EmailStatus.UNVERIFIED]: EmailStatusCategory.VALIDATION,
  [EmailStatus.VALID]: EmailStatusCategory.VALIDATION,
  [EmailStatus.INVALID]: EmailStatusCategory.VALIDATION,
};

/**
 * Email status configuration
 */
export interface EmailStatusConfig {
  label: string;
  description: string;
  category: EmailStatusCategory;
  color: string;
  icon?: string;
  priority: number;
  isTerminal: boolean;
  isError: boolean;
  allowsSending: boolean;
  allowsEditing: boolean;
}

export const EMAIL_STATUS_CONFIG: Record<EmailStatus, EmailStatusConfig> = {
  [EmailStatus.DRAFT]: {
    label: 'Draft',
    description: 'Email is in draft mode',
    category: EmailStatusCategory.DRAFT,
    color: '#6B7280',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: true,
  },
  [EmailStatus.QUEUED]: {
    label: 'Queued',
    description: 'Email is queued for sending',
    category: EmailStatusCategory.PROCESSING,
    color: '#8B5CF6',
    icon: 'List',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.PROCESSING]: {
    label: 'Processing',
    description: 'Email is being processed',
    category: EmailStatusCategory.PROCESSING,
    color: '#3B82F6',
    icon: 'Refresh',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.SENDING]: {
    label: 'Sending',
    description: 'Email is being sent',
    category: EmailStatusCategory.DELIVERY,
    color: '#6366F1',
    icon: 'Send',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.SENT]: {
    label: 'Sent',
    description: 'Email has been sent',
    category: EmailStatusCategory.DELIVERY,
    color: '#10B981',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.DELIVERED]: {
    label: 'Delivered',
    description: 'Email has been delivered',
    category: EmailStatusCategory.SUCCESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.OPENED]: {
    label: 'Opened',
    description: 'Email has been opened by recipient',
    category: EmailStatusCategory.SUCCESS,
    color: '#8B5CF6',
    icon: 'Eye',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.CLICKED]: {
    label: 'Clicked',
    description: 'Email link has been clicked',
    category: EmailStatusCategory.SUCCESS,
    color: '#F59E0B',
    icon: 'MousePointerClick',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.REPLIED]: {
    label: 'Replied',
    description: 'Email has been replied to',
    category: EmailStatusCategory.SUCCESS,
    color: '#10B981',
    icon: 'Reply',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.FORWARDED]: {
    label: 'Forwarded',
    description: 'Email has been forwarded',
    category: EmailStatusCategory.SUCCESS,
    color: '#8B5CF6',
    icon: 'Forward',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.BOUNCED_HARD]: {
    label: 'Hard Bounce',
    description: 'Email hard bounced (permanent failure)',
    category: EmailStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.BOUNCED_SOFT]: {
    label: 'Soft Bounce',
    description: 'Email soft bounced (temporary failure)',
    category: EmailStatusCategory.ERROR,
    color: '#F59E0B',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.FAILED]: {
    label: 'Failed',
    description: 'Email sending failed',
    category: EmailStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: true,
  },
  [EmailStatus.SPAM_REPORTED]: {
    label: 'Spam Reported',
    description: 'Email was reported as spam',
    category: EmailStatusCategory.FEEDBACK,
    color: '#EF4444',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.COMPLAINED]: {
    label: 'Complained',
    description: 'Email received a complaint',
    category: EmailStatusCategory.FEEDBACK,
    color: '#EF4444',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.UNSUBSCRIBED]: {
    label: 'Unsubscribed',
    description: 'Recipient unsubscribed',
    category: EmailStatusCategory.FEEDBACK,
    color: '#6B7280',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.SUPPRESSED]: {
    label: 'Suppressed',
    description: 'Email was suppressed',
    category: EmailStatusCategory.FEEDBACK,
    color: '#6B7280',
    icon: 'Shield',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.CANCELLED]: {
    label: 'Cancelled',
    description: 'Email was cancelled',
    category: EmailStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'XCircle',
    priority: 2,
    isTerminal: true,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.PAUSED]: {
    label: 'Paused',
    description: 'Email sending was paused',
    category: EmailStatusCategory.PROCESSING,
    color: '#F59E0B',
    icon: 'Pause',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.RESUMED]: {
    label: 'Resumed',
    description: 'Email sending was resumed',
    category: EmailStatusCategory.PROCESSING,
    color: '#22C55E',
    icon: 'Play',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.EXPIRED]: {
    label: 'Expired',
    description: 'Email has expired',
    category: EmailStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Clock',
    priority: 3,
    isTerminal: true,
    isError: true,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.RETRY_SCHEDULED]: {
    label: 'Retry Scheduled',
    description: 'Retry is scheduled',
    category: EmailStatusCategory.PROCESSING,
    color: '#F59E0B',
    icon: 'Refresh',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.RETRY_LIMIT_EXCEEDED]: {
    label: 'Retry Limit Exceeded',
    description: 'Retry attempts exhausted',
    category: EmailStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.PERMANENTLY_FAILED]: {
    label: 'Permanently Failed',
    description: 'Email permanently failed',
    category: EmailStatusCategory.TERMINAL,
    color: '#DC2626',
    icon: 'XCircle',
    priority: 1,
    isTerminal: true,
    isError: true,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.PENDING_APPROVAL]: {
    label: 'Pending Approval',
    description: 'Email is pending approval',
    category: EmailStatusCategory.APPROVAL,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: true,
  },
  [EmailStatus.APPROVED]: {
    label: 'Approved',
    description: 'Email has been approved',
    category: EmailStatusCategory.APPROVAL,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: false,
  },
  [EmailStatus.REJECTED]: {
    label: 'Rejected',
    description: 'Email has been rejected',
    category: EmailStatusCategory.APPROVAL,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: true,
  },
  [EmailStatus.REVIEWED]: {
    label: 'Reviewed',
    description: 'Email has been reviewed',
    category: EmailStatusCategory.APPROVAL,
    color: '#8B5CF6',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: false,
  },
  [EmailStatus.TESTED]: {
    label: 'Tested',
    description: 'Email has been tested',
    category: EmailStatusCategory.READINESS,
    color: '#10B981',
    icon: 'Beaker',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: true,
  },
  [EmailStatus.READY]: {
    label: 'Ready',
    description: 'Email is ready for sending',
    category: EmailStatusCategory.READINESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: false,
  },
  [EmailStatus.NOT_READY]: {
    label: 'Not Ready',
    description: 'Email is not ready for sending',
    category: EmailStatusCategory.READINESS,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: true,
  },
  [EmailStatus.PREPARED]: {
    label: 'Prepared',
    description: 'Email has been prepared',
    category: EmailStatusCategory.PROCESSING,
    color: '#8B5CF6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: false,
  },
  [EmailStatus.PROCESSED]: {
    label: 'Processed',
    description: 'Email has been processed',
    category: EmailStatusCategory.PROCESSING,
    color: '#10B981',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: false,
  },
  [EmailStatus.COMPLETED]: {
    label: 'Completed',
    description: 'Email processing completed',
    category: EmailStatusCategory.SUCCESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.PARTIAL]: {
    label: 'Partial',
    description: 'Email processed partially',
    category: EmailStatusCategory.ERROR,
    color: '#F97316',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: true,
  },
  [EmailStatus.DELETED]: {
    label: 'Deleted',
    description: 'Email has been deleted',
    category: EmailStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Trash',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.ARCHIVED]: {
    label: 'Archived',
    description: 'Email has been archived',
    category: EmailStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Archive',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.RESTORED]: {
    label: 'Restored',
    description: 'Email has been restored',
    category: EmailStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'RotateCcw',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: true,
  },
  [EmailStatus.LOCKED]: {
    label: 'Locked',
    description: 'Email is locked',
    category: EmailStatusCategory.SECURITY,
    color: '#EF4444',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.UNLOCKED]: {
    label: 'Unlocked',
    description: 'Email is unlocked',
    category: EmailStatusCategory.SECURITY,
    color: '#22C55E',
    icon: 'Unlock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: true,
  },
  [EmailStatus.ENCRYPTED]: {
    label: 'Encrypted',
    description: 'Email is encrypted',
    category: EmailStatusCategory.SECURITY,
    color: '#10B981',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: false,
  },
  [EmailStatus.DECRYPTED]: {
    label: 'Decrypted',
    description: 'Email has been decrypted',
    category: EmailStatusCategory.SECURITY,
    color: '#8B5CF6',
    icon: 'Unlock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: true,
  },
  [EmailStatus.AUTHENTICATED]: {
    label: 'Authenticated',
    description: 'Email is authenticated',
    category: EmailStatusCategory.SECURITY,
    color: '#22C55E',
    icon: 'ShieldCheck',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: false,
  },
  [EmailStatus.UNAUTHENTICATED]: {
    label: 'Unauthenticated',
    description: 'Email is unauthenticated',
    category: EmailStatusCategory.SECURITY,
    color: '#EF4444',
    icon: 'ShieldOff',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: false,
  },
  [EmailStatus.VERIFIED]: {
    label: 'Verified',
    description: 'Email has been verified',
    category: EmailStatusCategory.VALIDATION,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: false,
  },
  [EmailStatus.UNVERIFIED]: {
    label: 'Unverified',
    description: 'Email is unverified',
    category: EmailStatusCategory.VALIDATION,
    color: '#6B7280',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: false,
    allowsEditing: true,
  },
  [EmailStatus.VALID]: {
    label: 'Valid',
    description: 'Email is valid',
    category: EmailStatusCategory.VALIDATION,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsSending: true,
    allowsEditing: false,
  },
  [EmailStatus.INVALID]: {
    label: 'Invalid',
    description: 'Email is invalid',
    category: EmailStatusCategory.VALIDATION,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsSending: false,
    allowsEditing: true,
  },
};

/**
 * Get email status label
 */
export function getEmailStatusLabel(status: EmailStatus): string {
  return EMAIL_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get email status description
 */
export function getEmailStatusDescription(status: EmailStatus): string {
  return EMAIL_STATUS_CONFIG[status]?.description || '';
}

/**
 * Get email status category
 */
export function getEmailStatusCategory(status: EmailStatus): EmailStatusCategory {
  return EMAIL_STATUS_CATEGORY_MAP[status];
}

/**
 * Get email status color
 */
export function getEmailStatusColor(status: EmailStatus): string {
  return EMAIL_STATUS_CONFIG[status]?.color || '#6B7280';
}

/**
 * Get email status icon
 */
export function getEmailStatusIcon(status: EmailStatus): string {
  return EMAIL_STATUS_CONFIG[status]?.icon || 'Circle';
}

/**
 * Get email statuses by category
 */
export function getEmailStatusesByCategory(category: EmailStatusCategory): EmailStatus[] {
  return Object.entries(EMAIL_STATUS_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([status]) => status as EmailStatus);
}

/**
 * Get draft statuses
 */
export function getDraftEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.DRAFT);
}

/**
 * Get processing statuses
 */
export function getProcessingEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.PROCESSING);
}

/**
 * Get delivery statuses
 */
export function getDeliveryEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.DELIVERY);
}

/**
 * Get success statuses
 */
export function getSuccessEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.SUCCESS);
}

/**
 * Get error statuses
 */
export function getErrorEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.ERROR);
}

/**
 * Get feedback statuses
 */
export function getFeedbackEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.FEEDBACK);
}

/**
 * Get approval statuses
 */
export function getApprovalEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.APPROVAL);
}

/**
 * Get readiness statuses
 */
export function getReadinessEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.READINESS);
}

/**
 * Get lifecycle statuses
 */
export function getLifecycleEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.LIFECYCLE);
}

/**
 * Get security statuses
 */
export function getSecurityEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.SECURITY);
}

/**
 * Get validation statuses
 */
export function getValidationEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.VALIDATION);
}

/**
 * Get terminal statuses
 */
export function getTerminalEmailStatuses(): EmailStatus[] {
  return getEmailStatusesByCategory(EmailStatusCategory.TERMINAL);
}

/**
 * Check if status is terminal
 */
export function isEmailStatusTerminal(status: EmailStatus): boolean {
  return EMAIL_STATUS_CONFIG[status]?.isTerminal || false;
}

/**
 * Check if status is error
 */
export function isEmailStatusError(status: EmailStatus): boolean {
  return EMAIL_STATUS_CONFIG[status]?.isError || false;
}

/**
 * Check if status allows sending
 */
export function emailStatusAllowsSending(status: EmailStatus): boolean {
  return EMAIL_STATUS_CONFIG[status]?.allowsSending || false;
}

/**
 * Check if status allows editing
 */
export function emailStatusAllowsEditing(status: EmailStatus): boolean {
  return EMAIL_STATUS_CONFIG[status]?.allowsEditing || false;
}

/**
 * Check if status is active (not terminal)
 */
export function isEmailStatusActive(status: EmailStatus): boolean {
  return !isEmailStatusTerminal(status);
}

/**
 * Get status priority
 */
export function getEmailStatusPriority(status: EmailStatus): number {
  return EMAIL_STATUS_CONFIG[status]?.priority || 3;
}

/**
 * Check if email status can transition to new status
 */
export function canEmailTransitionTo(currentStatus: EmailStatus, newStatus: EmailStatus): boolean {
  if (currentStatus === newStatus) {
    return false;
  }

  // Cannot transition from terminal status
  if (isEmailStatusTerminal(currentStatus)) {
    return false;
  }

  // Cannot transition from error to success without fixing
  if (
    isEmailStatusError(currentStatus) &&
    getEmailStatusCategory(newStatus) === EmailStatusCategory.SUCCESS
  ) {
    return false;
  }

  return true;
}

/**
 * Get allowed next email statuses
 */
export function getAllowedNextEmailStatuses(currentStatus: EmailStatus): EmailStatus[] {
  return Object.values(EmailStatus).filter((status) => canEmailTransitionTo(currentStatus, status));
}

/**
 * Email status groups
 */
export const EMAIL_STATUS_GROUPS = {
  /** Initial statuses */
  INITIAL: [EmailStatus.DRAFT, EmailStatus.QUEUED, EmailStatus.PENDING_APPROVAL],
  /** Processing statuses */
  PROCESSING: [
    EmailStatus.PROCESSING,
    EmailStatus.SENDING,
    EmailStatus.PREPARED,
    EmailStatus.PROCESSED,
    EmailStatus.PAUSED,
    EmailStatus.RESUMED,
    EmailStatus.RETRY_SCHEDULED,
  ],
  /** Success statuses */
  SUCCESS: [
    EmailStatus.SENT,
    EmailStatus.DELIVERED,
    EmailStatus.OPENED,
    EmailStatus.CLICKED,
    EmailStatus.REPLIED,
    EmailStatus.FORWARDED,
    EmailStatus.COMPLETED,
  ],
  /** Error statuses */
  ERROR: [
    EmailStatus.BOUNCED_HARD,
    EmailStatus.BOUNCED_SOFT,
    EmailStatus.FAILED,
    EmailStatus.SPAM_REPORTED,
    EmailStatus.COMPLAINED,
    EmailStatus.RETRY_LIMIT_EXCEEDED,
    EmailStatus.PARTIAL,
  ],
  /** Terminal statuses */
  TERMINAL: [
    EmailStatus.CANCELLED,
    EmailStatus.EXPIRED,
    EmailStatus.PERMANENTLY_FAILED,
    EmailStatus.DELETED,
    EmailStatus.ARCHIVED,
  ],
} as const;
