import { CreateZoneHandler } from './create-zone.handler.js';
import { UpdateZoneHandler } from './update.handler.js';
import { ActivateZoneHandler } from './activate.handler.js';
import { DeactivateZoneHandler } from './deactivate.handler.js';
import { RestrictZoneHandler } from './restrict.handler.js';
import { SuspendZoneHandler } from './suspend.handler.js';
import { ArchiveZoneHandler } from './archive.handler.js';

export const ZONE_COMMAND_HANDLERS = [
  CreateZoneHandler,
  UpdateZoneHandler,
  ActivateZoneHandler,
  DeactivateZoneHandler,
  RestrictZoneHandler,
  SuspendZoneHandler,
  ArchiveZoneHandler,
] as const;
