// commands/tracking/index.ts
export * from './start-tracking.command.js'; export * from './start-tracking.handler.js';
export * from './record-tracking-event.command.js'; export * from './record-tracking-event.handler.js';
export * from './update-tracking-eta.command.js'; export * from './update-tracking-eta.handler.js';

import { StartTrackingHandler } from './start-tracking.handler.js';
import { RecordTrackingEventHandler } from './record-tracking-event.handler.js';
import { UpdateTrackingEtaHandler } from './update-tracking-eta.handler.js';

export const TRACKING_COMMAND_HANDLERS = [
  StartTrackingHandler, RecordTrackingEventHandler, UpdateTrackingEtaHandler,
] as const;
