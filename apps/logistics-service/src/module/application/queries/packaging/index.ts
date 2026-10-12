// queries/packaging/index.ts
export * from './get-packaging.query.js'; export * from './get-packaging.handler.js';
export * from './list-packagings.query.js'; export * from './list-packagings.handler.js';

import { GetPackagingHandler } from './get-packaging.handler.js';
import { ListPackagingsHandler } from './list-packagings.handler.js';

export const PACKAGING_QUERY_HANDLERS = [GetPackagingHandler, ListPackagingsHandler] as const;
