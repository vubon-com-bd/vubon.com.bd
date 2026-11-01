import { GetZoneHandler } from './get-zone.handler.js';
import { GetZoneByCodeHandler } from './get-zone-by-code.handler.js';
import { ListZonesHandler } from './list-zones.handler.js';
import { ListActiveZonesHandler } from './list-active-zones.handler.js';
import { ListZonesByParentHandler } from './list-zones-by-parent.handler.js';
import { ClassifyZoneHandler } from './classify-zone.handler.js';
import { GetZoneStatsHandler } from './get-zone-stats.handler.js';

export const ZONE_QUERY_HANDLERS = [
  GetZoneHandler,
  GetZoneByCodeHandler,
  ListZonesHandler,
  ListActiveZonesHandler,
  ListZonesByParentHandler,
  ClassifyZoneHandler,
  GetZoneStatsHandler,
] as const;
