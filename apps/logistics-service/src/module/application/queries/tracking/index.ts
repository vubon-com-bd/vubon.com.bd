// queries/tracking/index.ts
export * from './get-tracking.query.js'; export * from './get-tracking.handler.js';
export * from './get-tracking-by-number.query.js'; export * from './get-tracking-by-number.handler.js';
export * from './get-public-tracking.query.js'; export * from './get-public-tracking.handler.js';
export * from './list-tracking.query.js'; export * from './list-tracking.handler.js';

import { GetTrackingHandler } from './get-tracking.handler.js';
import { GetTrackingByNumberHandler } from './get-tracking-by-number.handler.js';
import { GetPublicTrackingHandler } from './get-public-tracking.handler.js';
import { ListTrackingHandler } from './list-tracking.handler.js';

export const TRACKING_QUERY_HANDLERS = [
  GetTrackingHandler, GetTrackingByNumberHandler, GetPublicTrackingHandler, ListTrackingHandler,
] as const;
