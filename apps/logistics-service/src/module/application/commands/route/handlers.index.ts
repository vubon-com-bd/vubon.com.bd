import { CreateRouteHandler } from './create-route.handler.js';
import { UpdateRouteHandler } from './update.handler.js';
import { PlanRouteHandler } from './plan.handler.js';
import { OptimizeRouteHandler } from './optimize.handler.js';
import { StartRouteHandler } from './start.handler.js';
import { CompleteStopRouteHandler } from './complete-stop.handler.js';
import { CompleteRouteHandler } from './complete.handler.js';
import { CancelRouteHandler } from './cancel.handler.js';
import { ArchiveRouteHandler } from './archive.handler.js';

export const ROUTE_COMMAND_HANDLERS = [
  CreateRouteHandler,
  UpdateRouteHandler,
  PlanRouteHandler,
  OptimizeRouteHandler,
  StartRouteHandler,
  CompleteStopRouteHandler,
  CompleteRouteHandler,
  CancelRouteHandler,
  ArchiveRouteHandler,
] as const;
