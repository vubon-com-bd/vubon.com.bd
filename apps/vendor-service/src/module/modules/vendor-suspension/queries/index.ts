/**
 * VendorSuspension Query Handlers Barrel
 * @module vendor-service/modules/vendor-suspension/queries
 */
import { GetSuspensionHandler } from '../../../application/queries/suspension/get-suspension.handler.js';
import { ListSuspensionsHandler } from '../../../application/queries/suspension/list-suspensions.handler.js';

export const VENDOR_SUSPENSION_QUERY_HANDLERS = [
  GetSuspensionHandler,
  ListSuspensionsHandler,
] as const;

export { GetSuspensionHandler, ListSuspensionsHandler };
