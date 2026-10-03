/**
 * Order Regex Constants
 * @module shared-constants/business/order
 *
 * Order number, tracking number — format regex।
 */
export const ORDER_NUMBER_REGEX = /^ORD-\d{4}-\d{6}$/;
export const ORDER_NUMBER_PREFIX = 'ORD';
export const ORDER_NUMBER_SEQUENCE_LENGTH = 6;

export const TRACKING_NUMBER_REGEX = /^TRK-[A-Z0-9]{8,20}$/;
export const TRACKING_NUMBER_PREFIX = 'TRK';
export const TRACKING_NUMBER_MIN_LENGTH = 8;
export const TRACKING_NUMBER_MAX_LENGTH = 20;

export const INVOICE_NUMBER_REGEX = /^INV-\d{4}-\d{6}$/;
