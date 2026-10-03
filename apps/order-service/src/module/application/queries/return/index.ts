import { GetReturnHandler } from './get-return.handler.js';
import { ListReturnsHandler } from './list-returns.handler.js';

export * from './get-return.query.js';
export * from './get-return.handler.js';
export * from './list-returns.query.js';
export * from './list-returns.handler.js';

export const RETURN_QUERY_HANDLERS = [
  GetReturnHandler,
  ListReturnsHandler,
] as const;
