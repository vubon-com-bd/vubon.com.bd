import { GetShippingHandler } from '../../../application/queries/shipping/get-shipping.handler.js';

export const VENDOR_SHIPPING_QUERY_HANDLERS = [GetShippingHandler] as const;

export { GetShippingHandler };
