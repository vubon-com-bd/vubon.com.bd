export * from './list-saved.query.js';
export * from './list-saved.handler.js';

import { ListSavedHandler } from './list-saved.handler.js';

export const SAVED_QUERY_HANDLERS = [ListSavedHandler] as const;
