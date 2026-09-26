export const ORDER_RETURN_STATUS = {
  REQUESTED: 'requested',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PICKUP_SCHEDULED: 'pickup_scheduled',
  PICKED_UP: 'picked_up',
  RECEIVED: 'received',
  INSPECTED: 'inspected',
  REFUNDED: 'refunded',
  REPLACED: 'replaced',
  CLOSED: 'closed',
} as const;

export const ORDER_RETURN_REASON = {
  DEFECTIVE: 'defective',
  WRONG_ITEM: 'wrong_item',
  NOT_AS_DESCRIBED: 'not_as_described',
  SIZE_ISSUE: 'size_issue',
  CHANGED_MIND: 'changed_mind',
  DAMAGED_IN_TRANSIT: 'damaged_in_transit',
  MISSING_PARTS: 'missing_parts',
  OTHER: 'other',
} as const;

export const ORDER_RETURN = {
  WINDOW_DAYS: 7,
  MAX_DAYS_AFTER_DELIVERY: 30,
  PICKUP_WINDOW_DAYS: 3,
  INSPECTION_DAYS: 2,
  REFUND_PROCESSING_DAYS: 7,
  RESTOCK_FEE_PERCENT: 0,
  FREE_RETURN: true,
  MAX_IMAGES: 5,
  MAX_REASON_LENGTH: 1000,
} as const;

export type OrderReturnStatusType = (typeof ORDER_RETURN_STATUS)[keyof typeof ORDER_RETURN_STATUS];
export type OrderReturnReasonType = (typeof ORDER_RETURN_REASON)[keyof typeof ORDER_RETURN_REASON];
