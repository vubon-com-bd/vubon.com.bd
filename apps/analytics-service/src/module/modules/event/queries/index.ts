import type { Provider } from '@nestjs/common';
/**
 * Event Query Handlers Barrel
 */
import { GetEventHandler } from '../../../application/queries/event/get-event.handler.js';
import { ListEventsHandler } from '../../../application/queries/event/list-events.handler.js';
import { SearchEventsHandler } from '../../../application/queries/event/search-events.handler.js';

export const EVENT_QUERY_HANDLERS = [
  GetEventHandler,
  ListEventsHandler,
  SearchEventsHandler,
] as Provider[];

export { GetEventHandler, ListEventsHandler, SearchEventsHandler };
