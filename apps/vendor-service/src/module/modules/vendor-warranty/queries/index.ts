import { GetWarrantyHandler } from '../../../application/queries/warranty/get-warranty.handler.js';

export const VENDOR_WARRANTY_QUERY_HANDLERS = [GetWarrantyHandler] as const;

export { GetWarrantyHandler };
