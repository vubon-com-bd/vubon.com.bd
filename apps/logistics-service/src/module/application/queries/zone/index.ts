// queries/zone/index.ts
export * from './get-zone.query.js'; export * from './get-zone.handler.js';
export * from './list-zones.query.js'; export * from './list-zones.handler.js';

import { GetZoneHandler } from './get-zone.handler.js';
import { ListZonesHandler } from './list-zones.handler.js';

export const ZONE_QUERY_HANDLERS = [GetZoneHandler, ListZonesHandler] as const;
