/**
 * Status Constants
 * @module shared-constants/common/status.constants
 */

export const STATUS = {
  // General status
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  BLOCKED: 'blocked',
  SUSPENDED: 'suspended',

  // Order status
  ORDER: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
    REFUNDED: 'refunded',
    PARTIAL_SHIPPED: 'partial_shipped',
    READY_TO_SHIP: 'ready_to_ship',
    ON_HOLD: 'on_hold',
    FAILED: 'failed',
  } as const,

  // Payment status
  PAYMENT: {
    PENDING: 'pending',
    PAID: 'paid',
    PARTIAL: 'partial',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    PARTIAL_REFUND: 'partial_refund',
    CANCELLED: 'cancelled',
    PROCESSING: 'processing',
    AUTHORIZED: 'authorized',
    CAPTURED: 'captured',
  } as const,

  // Shipment status
  SHIPMENT: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
  } as const,

  // User status
  USER: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BLOCKED: 'blocked',
    SUSPENDED: 'suspended',
    PENDING_VERIFICATION: 'pending_verification',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  } as const,

  // Product status
  PRODUCT: {
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
    COMING_SOON: 'coming_soon',
  } as const,

  // Verification status
  VERIFICATION: {
    PENDING: 'pending',
    VERIFIED: 'verified',
    FAILED: 'failed',
    EXPIRED: 'expired',
    IN_PROGRESS: 'in_progress',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  } as const,

  // Session status
  SESSION: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    INVALID: 'invalid',
  } as const,

  // Payout status
  PAYOUT: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    APPROVED: 'approved',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Ticket status
  TICKET: {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    REOPENED: 'reopened',
    ON_HOLD: 'on_hold',
    ESCALATED: 'escalated',
  } as const,
} as const;

// Only export types that are unique to status.constants
export type GeneralStatus = (typeof STATUS)[keyof typeof STATUS];
export type OrderStatus = (typeof STATUS.ORDER)[keyof typeof STATUS.ORDER];
export type PaymentStatus = (typeof STATUS.PAYMENT)[keyof typeof STATUS.PAYMENT];
export type ShipmentStatus = (typeof STATUS.SHIPMENT)[keyof typeof STATUS.SHIPMENT];
export type UserStatus = (typeof STATUS.USER)[keyof typeof STATUS.USER];
export type ProductStatus = (typeof STATUS.PRODUCT)[keyof typeof STATUS.PRODUCT];
export type VerificationStatus = (typeof STATUS.VERIFICATION)[keyof typeof STATUS.VERIFICATION];
export type SessionStatus = (typeof STATUS.SESSION)[keyof typeof STATUS.SESSION];
export type PayoutStatus = (typeof STATUS.PAYOUT)[keyof typeof STATUS.PAYOUT];
export type TicketStatus = (typeof STATUS.TICKET)[keyof typeof STATUS.TICKET];

export const STATUS_COLORS: Record<string, string> = {
  [STATUS.ACTIVE]: 'green',
  [STATUS.INACTIVE]: 'gray',
  [STATUS.PENDING]: 'yellow',
  [STATUS.DRAFT]: 'blue',
  [STATUS.ARCHIVED]: 'gray',
  [STATUS.DELETED]: 'red',
  [STATUS.BLOCKED]: 'red',
  [STATUS.SUSPENDED]: 'orange',
} as const;

export const STATUS_BADGE_VARIANTS: Record<string, string> = {
  [STATUS.ACTIVE]: 'success',
  [STATUS.INACTIVE]: 'secondary',
  [STATUS.PENDING]: 'warning',
  [STATUS.DRAFT]: 'info',
  [STATUS.ARCHIVED]: 'secondary',
  [STATUS.DELETED]: 'danger',
  [STATUS.BLOCKED]: 'danger',
  [STATUS.SUSPENDED]: 'warning',
} as const;
