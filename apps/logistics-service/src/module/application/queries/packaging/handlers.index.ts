import { GetPackagingHandler } from './get-packaging.handler.js';
import { GetPackagingByCodeHandler } from './get-packaging-by-code.handler.js';
import { ListPackagingsHandler } from './list-packagings.handler.js';
import { ListUsablePackagingsHandler } from './list-usable-packagings.handler.js';
import { ListOutOfStockPackagingsHandler } from './list-out-of-stock-packagings.handler.js';
import { GetDefaultPackagingHandler } from './get-default-packaging.handler.js';
import { GetPackagingStatsHandler } from './get-packaging-stats.handler.js';

export const PACKAGING_QUERY_HANDLERS = [
  GetPackagingHandler,
  GetPackagingByCodeHandler,
  ListPackagingsHandler,
  ListUsablePackagingsHandler,
  ListOutOfStockPackagingsHandler,
  GetDefaultPackagingHandler,
  GetPackagingStatsHandler,
] as const;
