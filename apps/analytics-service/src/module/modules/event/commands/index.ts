import type { Provider } from '@nestjs/common';
/**
 * Event Command Handlers Barrel
 * @module analytics-service/modules/event/commands
 */
import { TrackEventHandler } from '../../../application/commands/event/track-event.handler.js';
import { BatchTrackEventHandler } from '../../../application/commands/event/batch-track-event.handler.js';
import { ProcessEventHandler } from '../../../application/commands/event/process-event.handler.js';

export const EVENT_COMMAND_HANDLERS = [
  TrackEventHandler,
  BatchTrackEventHandler,
  ProcessEventHandler,
] as Provider[];

export {
  TrackEventHandler,
  BatchTrackEventHandler,
  ProcessEventHandler,
};
