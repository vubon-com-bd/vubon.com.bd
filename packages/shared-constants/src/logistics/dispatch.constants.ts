export const DISPATCH_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  DISPATCHED: 'dispatched',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
} as const;

export const DISPATCH_TYPE = {
  SINGLE: 'single',
  BATCH: 'batch',
  BULK: 'bulk',
  URGENT: 'urgent',
  SCHEDULED: 'scheduled',
} as const;

export const DISPATCH = {
  STATUS: DISPATCH_STATUS,
  TYPE: DISPATCH_TYPE,
  MAX_ITEMS_PER_DISPATCH: 500,
  MAX_BATCH_SIZE: 100,
  DISPATCH_CUTOFF_HOUR: 16,
  SAME_DAY_CUTOFF_HOUR: 12,
  AUTO_DISPATCH: false,
  REQUIRE_MANIFEST: true,
  REQUIRE_SIGNATURE: false,
  PRINT_LABELS: true,
  NOTIFY_COURIER: true,
  MAX_DISPATCHES_PER_DAY: 50,
} as const;

export type DispatchStatusType = (typeof DISPATCH_STATUS)[keyof typeof DISPATCH_STATUS];
export type DispatchTypeType = (typeof DISPATCH_TYPE)[keyof typeof DISPATCH_TYPE];
