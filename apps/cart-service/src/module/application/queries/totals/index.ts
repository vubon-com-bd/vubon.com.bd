export * from './get-totals.query.js';
export * from './get-totals.handler.js';

import { GetTotalsHandler } from './get-totals.handler.js';

export const TOTALS_QUERY_HANDLERS = [GetTotalsHandler] as const;
