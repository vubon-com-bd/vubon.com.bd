/**
 * Session Query Handlers Barrel
 */
import { GetSessionHandler } from '../../../application/queries/session/get-session.handler.js';
import { ListSessionsHandler } from '../../../application/queries/session/list-sessions.handler.js';

export const SESSION_QUERY_HANDLERS = [
  GetSessionHandler,
  ListSessionsHandler,
] as const;

export { GetSessionHandler, ListSessionsHandler };
