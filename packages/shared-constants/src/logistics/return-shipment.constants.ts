export const RETURN_SHIPMENT_STATUS = {
  REQUESTED: 'requested',
  APPROVED: 'approved',
  PICKUP_SCHEDULED: 'pickup_scheduled',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  RECEIVED: 'received',
  INSPECTED: 'inspected',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  LOST: 'lost',
} as const;

export const RETURN_SHIPMENT_TYPE = {
  CUSTOMER_RETURN: 'customer_return',
  RTO: 'rto',
  EXCHANGE: 'exchange',
  WARRANTY: 'warranty',
  DAMAGED: 'damaged',
  WRONG_ITEM: 'wrong_item',
  REFUSED: 'refused',
} as const;

export const RETURN_SHIPMENT_REASON = {
  DEFECTIVE: 'defective',
  NOT_AS_DESCRIBED: 'not_as_described',
  WRONG_ITEM: 'wrong_item',
  SIZE_ISSUE: 'size_issue',
  CHANGED_MIND: 'changed_mind',
  DAMAGED_IN_TRANSIT: 'damaged_in_transit',
  LATE_DELIVERY: 'late_delivery',
  QUALITY_ISSUE: 'quality_issue',
  REFUSED: 'refused',
  OTHER: 'other',
} as const;

export const RETURN_SHIPMENT = {
  STATUS: RETURN_SHIPMENT_STATUS,
  TYPE: RETURN_SHIPMENT_TYPE,
  REASON: RETURN_SHIPMENT_REASON,
  MAX_RETURN_DAYS: 30,
  PICKUP_WINDOW_DAYS: 3,
  INSPECTION_DAYS: 2,
  REFUND_PROCESSING_DAYS: 7,
  RESTOCK_FEE_PERCENT: 0,
  FREE_RETURN: true,
  MAX_RETURN_VALUE: 1000000,
  REQUIRE_PHOTOS: true,
  MAX_PHOTOS: 5,
  REQUIRE_REASON: true,
  REQUIRE_RMA: true,
  RMA_PREFIX: 'RMA',
} as const;

export type ReturnShipmentStatusType =
  (typeof RETURN_SHIPMENT_STATUS)[keyof typeof RETURN_SHIPMENT_STATUS];
export type ReturnShipmentTypeType =
  (typeof RETURN_SHIPMENT_TYPE)[keyof typeof RETURN_SHIPMENT_TYPE];
export type ReturnShipmentReasonType =
  (typeof RETURN_SHIPMENT_REASON)[keyof typeof RETURN_SHIPMENT_REASON];
