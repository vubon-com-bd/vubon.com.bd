// queries/shipping-method/index.ts
export * from './get-shipping-method.query.js'; export * from './get-shipping-method.handler.js';
export * from './list-shipping-methods.query.js'; export * from './list-shipping-methods.handler.js';

import { GetShippingMethodHandler } from './get-shipping-method.handler.js';
import { ListShippingMethodsHandler } from './list-shipping-methods.handler.js';

export const SHIPPING_METHOD_QUERY_HANDLERS = [GetShippingMethodHandler, ListShippingMethodsHandler] as const;
