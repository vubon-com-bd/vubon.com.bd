import { CreateTrackingHandler } from './create-tracking.handler.js';
import { AddTrackingEventHandler } from './add-tracking-event.handler.js';
import { ActivateTrackingHandler } from './activate-tracking.handler.js';
import { CompleteTrackingHandler } from './complete-tracking.handler.js';
import { FailTrackingHandler } from './fail-tracking.handler.js';
import { ExpireTrackingHandler } from './expire-tracking.handler.js';

export const TRACKING_COMMAND_HANDLERS = [
  CreateTrackingHandler,
  AddTrackingEventHandler,
  ActivateTrackingHandler,
  CompleteTrackingHandler,
  FailTrackingHandler,
  ExpireTrackingHandler,
] as const;
