import { GetTotalsHandler } from '../../../application/queries/totals/get-totals.handler.js';

export const CART_TAX_QUERY_HANDLERS = [GetTotalsHandler] as const;
export { GetTotalsHandler };
