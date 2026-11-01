import { CreateDispatchHandler } from './create-dispatch.handler.js';
import { AssignDispatchHandler } from './assign.handler.js';
import { DispatchDispatchHandler } from './dispatch.handler.js';
import { StartTransitDispatchHandler } from './start-transit.handler.js';
import { MarkDeliveredDispatchHandler } from './mark-delivered.handler.js';
import { MarkFailedDispatchHandler } from './mark-failed.handler.js';
import { MarkReturnedDispatchHandler } from './mark-returned.handler.js';
import { CancelDispatchHandler } from './cancel.handler.js';

export const DISPATCH_COMMAND_HANDLERS = [
  CreateDispatchHandler,
  AssignDispatchHandler,
  DispatchDispatchHandler,
  StartTransitDispatchHandler,
  MarkDeliveredDispatchHandler,
  MarkFailedDispatchHandler,
  MarkReturnedDispatchHandler,
  CancelDispatchHandler,
] as const;
