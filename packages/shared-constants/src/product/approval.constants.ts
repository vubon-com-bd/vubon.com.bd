/**
 * Approval Constants
 * Approval workflow configuration and settings
 */

export const PRODUCTAPPROVAL = {
  // Approval Statuses
  STATUSES: {
    PENDING: 'pending',
    IN_REVIEW: 'in_review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    REVISION: 'revision',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    AUTO_APPROVED: 'auto_approved',
    CONDITIONAL: 'conditional',
  } as const,

  // Approval Types
  TYPES: {
    PRODUCT: 'product',
    VARIANT: 'variant',
    PRICE: 'price',
    INVENTORY: 'inventory',
    CATEGORY: 'category',
    BRAND: 'brand',
    ATTRIBUTE: 'attribute',
    REVIEW: 'review',
    CUSTOM: 'custom',
  } as const,

  // Approval Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Approval Actions
  ACTIONS: {
    APPROVE: 'approve',
    REJECT: 'reject',
    REVISE: 'revise',
    CANCEL: 'cancel',
    REOPEN: 'reopen',
    ESCALATE: 'escalate',
    DELEGATE: 'delegate',
    AUTO_APPROVE: 'auto_approve',
  } as const,

  // Approval Defaults
  DEFAULTS: {
    DEFAULT_STATUS: 'pending',
    DEFAULT_TYPE: 'product',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_TIMEOUT_HOURS: 48,
    MAX_APPROVERS: 5,
    MIN_APPROVERS: 1,
    DEFAULT_ESCALATION_LEVELS: 3,
    DEFAULT_ESCALATION_INTERVAL_HOURS: 24,
  } as const,

  // Approval Limits
  LIMITS: {
    MAX_APPROVERS: 5,
    MIN_APPROVERS: 1,
    MAX_ESCALATION_LEVELS: 5,
    MIN_ESCALATION_INTERVAL_HOURS: 1,
    MAX_ESCALATION_INTERVAL_HOURS: 72,
    MAX_REVISION_COUNT: 5,
    MAX_COMMENT_LENGTH: 1000,
    MAX_ATTACHMENTS: 10,
  } as const,
} as const;

// Approval Statuses
export type ProductApprovalStatus =
  (typeof PRODUCTAPPROVAL.STATUSES)[keyof typeof PRODUCTAPPROVAL.STATUSES];

// Approval Types
export type ProductApprovalType =
  (typeof PRODUCTAPPROVAL.TYPES)[keyof typeof PRODUCTAPPROVAL.TYPES];

// Approval Priorities
export type ProductApprovalPriority =
  (typeof PRODUCTAPPROVAL.PRIORITIES)[keyof typeof PRODUCTAPPROVAL.PRIORITIES];

// Approval Actions
export type ProductApprovalAction =
  (typeof PRODUCTAPPROVAL.ACTIONS)[keyof typeof PRODUCTAPPROVAL.ACTIONS];

// Approval Defaults
export type ProductApprovalDefault =
  (typeof PRODUCTAPPROVAL.DEFAULTS)[keyof typeof PRODUCTAPPROVAL.DEFAULTS];

// Approval Limits
export type ProductApprovalLimit =
  (typeof PRODUCTAPPROVAL.LIMITS)[keyof typeof PRODUCTAPPROVAL.LIMITS];

// Utility Functions
export function productapprovalGetStatusLabel(status: ProductApprovalStatus): string {
  const labels: Record<ProductApprovalStatus, string> = {
    [PRODUCTAPPROVAL.STATUSES.PENDING]: 'Pending',
    [PRODUCTAPPROVAL.STATUSES.IN_REVIEW]: 'In Review',
    [PRODUCTAPPROVAL.STATUSES.APPROVED]: 'Approved',
    [PRODUCTAPPROVAL.STATUSES.REJECTED]: 'Rejected',
    [PRODUCTAPPROVAL.STATUSES.REVISION]: 'Revision Required',
    [PRODUCTAPPROVAL.STATUSES.CANCELLED]: 'Cancelled',
    [PRODUCTAPPROVAL.STATUSES.ARCHIVED]: 'Archived',
    [PRODUCTAPPROVAL.STATUSES.AUTO_APPROVED]: 'Auto-Approved',
    [PRODUCTAPPROVAL.STATUSES.CONDITIONAL]: 'Conditional',
  };
  return labels[status] || 'Unknown Status';
}

export function productapprovalGetTypeLabel(type: ProductApprovalType): string {
  const labels: Record<ProductApprovalType, string> = {
    [PRODUCTAPPROVAL.TYPES.PRODUCT]: 'Product',
    [PRODUCTAPPROVAL.TYPES.VARIANT]: 'Variant',
    [PRODUCTAPPROVAL.TYPES.PRICE]: 'Price',
    [PRODUCTAPPROVAL.TYPES.INVENTORY]: 'Inventory',
    [PRODUCTAPPROVAL.TYPES.CATEGORY]: 'Category',
    [PRODUCTAPPROVAL.TYPES.BRAND]: 'Brand',
    [PRODUCTAPPROVAL.TYPES.ATTRIBUTE]: 'Attribute',
    [PRODUCTAPPROVAL.TYPES.REVIEW]: 'Review',
    [PRODUCTAPPROVAL.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Approval Type';
}

export function productapprovalGetPriorityLabel(priority: ProductApprovalPriority): string {
  const labels: Record<ProductApprovalPriority, string> = {
    [PRODUCTAPPROVAL.PRIORITIES.CRITICAL]: 'Critical',
    [PRODUCTAPPROVAL.PRIORITIES.HIGH]: 'High',
    [PRODUCTAPPROVAL.PRIORITIES.MEDIUM]: 'Medium',
    [PRODUCTAPPROVAL.PRIORITIES.LOW]: 'Low',
    [PRODUCTAPPROVAL.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown Priority';
}

export function productapprovalGetActionLabel(action: ProductApprovalAction): string {
  const labels: Record<ProductApprovalAction, string> = {
    [PRODUCTAPPROVAL.ACTIONS.APPROVE]: 'Approve',
    [PRODUCTAPPROVAL.ACTIONS.REJECT]: 'Reject',
    [PRODUCTAPPROVAL.ACTIONS.REVISE]: 'Revise',
    [PRODUCTAPPROVAL.ACTIONS.CANCEL]: 'Cancel',
    [PRODUCTAPPROVAL.ACTIONS.REOPEN]: 'Reopen',
    [PRODUCTAPPROVAL.ACTIONS.ESCALATE]: 'Escalate',
    [PRODUCTAPPROVAL.ACTIONS.DELEGATE]: 'Delegate',
    [PRODUCTAPPROVAL.ACTIONS.AUTO_APPROVE]: 'Auto-Approval',
  };
  return labels[action] || 'Unknown Action';
}

export function productapprovalIsPending(status: ProductApprovalStatus): boolean {
  const pendingStatuses: ProductApprovalStatus[] = [
    PRODUCTAPPROVAL.STATUSES.PENDING,
    PRODUCTAPPROVAL.STATUSES.IN_REVIEW,
  ];
  return pendingStatuses.includes(status);
}

export function productapprovalIsApproved(status: ProductApprovalStatus): boolean {
  const approvedStatuses: ProductApprovalStatus[] = [
    PRODUCTAPPROVAL.STATUSES.APPROVED,
    PRODUCTAPPROVAL.STATUSES.AUTO_APPROVED,
    PRODUCTAPPROVAL.STATUSES.CONDITIONAL,
  ];
  return approvedStatuses.includes(status);
}

export function productapprovalIsRejected(status: ProductApprovalStatus): boolean {
  const rejectedStatuses: ProductApprovalStatus[] = [
    PRODUCTAPPROVAL.STATUSES.REJECTED,
    PRODUCTAPPROVAL.STATUSES.REVISION,
  ];
  return rejectedStatuses.includes(status);
}

export function productapprovalGetDefaultTimeoutHours(): number {
  return PRODUCTAPPROVAL.DEFAULTS.DEFAULT_TIMEOUT_HOURS;
}

export function productapprovalGetMaxApprovers(): number {
  return PRODUCTAPPROVAL.DEFAULTS.MAX_APPROVERS;
}
