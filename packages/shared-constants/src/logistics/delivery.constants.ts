export const DELIVERY_STATUS = {
  SCHEDULED: 'scheduled',
  ASSIGNED: 'assigned',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  ARRIVED: 'arrived',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RESCHEDULED: 'rescheduled',
  CANCELLED: 'cancelled',
  REFUSED: 'refused',
} as const;

export const DELIVERY_TYPE = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  SCHEDULED: 'scheduled',
  CONTACTLESS: 'contactless',
  PICKUP_POINT: 'pickup_point',
  LOCKER: 'locker',
  DOOR: 'door',
} as const;

export const DELIVERY_ATTEMPT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  RESCHEDULED: 'rescheduled',
  REFUSED: 'refused',
  NO_ONE_AVAILABLE: 'no_one_available',
  WRONG_ADDRESS: 'wrong_address',
  ACCESS_DENIED: 'access_denied',
} as const;

export const DELIVERY = {
  STATUS: DELIVERY_STATUS,
  TYPE: DELIVERY_TYPE,
  ATTEMPT_STATUS: DELIVERY_ATTEMPT_STATUS,
  MAX_ATTEMPTS: 3,
  ATTEMPT_INTERVAL_HOURS: 24,
  GRACE_PERIOD_MINUTES: 15,
  RESCHEDULE_WINDOW_HOURS: 48,
  PROOF_REQUIRED: true,
  SIGNATURE_REQUIRED: false,
  PHOTO_REQUIRED: true,
  OTP_REQUIRED: false,
  OTP_LENGTH: 6,
  CONTACTLESS_AVAILABLE: true,
} as const;

export type DeliveryStatusType = (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];
export type DeliveryTypeType = (typeof DELIVERY_TYPE)[keyof typeof DELIVERY_TYPE];
export type DeliveryAttemptStatusType =
  (typeof DELIVERY_ATTEMPT_STATUS)[keyof typeof DELIVERY_ATTEMPT_STATUS];
