// commands/route/index.ts
export * from './create-route.command.js'; export * from './create-route.handler.js';
export * from './add-route-stop.command.js'; export * from './add-route-stop.handler.js';
export * from './remove-route-stop.command.js'; export * from './remove-route-stop.handler.js';
export * from './reorder-route-stops.command.js'; export * from './reorder-route-stops.handler.js';
export * from './complete-route-stop.command.js'; export * from './complete-route-stop.handler.js';
export * from './optimize-route.command.js'; export * from './optimize-route.handler.js';
export * from './plan-route.command.js'; export * from './plan-route.handler.js';
export * from './start-route.command.js'; export * from './start-route.handler.js';
export * from './complete-route.command.js'; export * from './complete-route.handler.js';
export * from './cancel-route.command.js'; export * from './cancel-route.handler.js';

import { CreateRouteHandler } from './create-route.handler.js';
import { AddRouteStopHandler } from './add-route-stop.handler.js';
import { RemoveRouteStopHandler } from './remove-route-stop.handler.js';
import { ReorderRouteStopsHandler } from './reorder-route-stops.handler.js';
import { CompleteRouteStopHandler } from './complete-route-stop.handler.js';
import { OptimizeRouteHandler } from './optimize-route.handler.js';
import { PlanRouteHandler } from './plan-route.handler.js';
import { StartRouteHandler } from './start-route.handler.js';
import { CompleteRouteHandler } from './complete-route.handler.js';
import { CancelRouteHandler } from './cancel-route.handler.js';

export const ROUTE_COMMAND_HANDLERS = [
  CreateRouteHandler, AddRouteStopHandler, RemoveRouteStopHandler, ReorderRouteStopsHandler,
  CompleteRouteStopHandler, OptimizeRouteHandler, PlanRouteHandler, StartRouteHandler,
  CompleteRouteHandler, CancelRouteHandler,
] as const;
