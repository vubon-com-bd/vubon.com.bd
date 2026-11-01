import { GetShippingMethodHandler } from './get-shipping-method.handler.js';
import { GetShippingMethodByCodeHandler } from './get-shipping-method-by-code.handler.js';
import { ListShippingMethodsHandler } from './list-shipping-methods.handler.js';
import { ListUsableShippingMethodsHandler } from './list-usable-shipping-methods.handler.js';
import { ListShippingMethodsByZoneHandler } from './list-shipping-methods-by-zone.handler.js';
import { GetDefaultShippingMethodHandler } from './get-default-shipping-method.handler.js';
import { GetShippingMethodStatsHandler } from './get-shipping-method-stats.handler.js';

export const SHIPPING_METHOD_QUERY_HANDLERS = [
  GetShippingMethodHandler,
  GetShippingMethodByCodeHandler,
  ListShippingMethodsHandler,
  ListUsableShippingMethodsHandler,
  ListShippingMethodsByZoneHandler,
  GetDefaultShippingMethodHandler,
  GetShippingMethodStatsHandler,
] as const;
