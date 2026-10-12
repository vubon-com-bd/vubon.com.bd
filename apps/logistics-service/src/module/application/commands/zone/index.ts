// commands/zone/index.ts
export * from './create-zone.command.js'; export * from './create-zone.handler.js';
export * from './update-zone.command.js'; export * from './update-zone.handler.js';
export * from './activate-zone.command.js'; export * from './activate-zone.handler.js';
export * from './inactivate-zone.command.js'; export * from './inactivate-zone.handler.js';
export * from './suspend-zone.command.js'; export * from './suspend-zone.handler.js';

import { CreateZoneHandler } from './create-zone.handler.js';
import { UpdateZoneHandler } from './update-zone.handler.js';
import { ActivateZoneHandler } from './activate-zone.handler.js';
import { InactivateZoneHandler } from './inactivate-zone.handler.js';
import { SuspendZoneHandler } from './suspend-zone.handler.js';

export const ZONE_COMMAND_HANDLERS = [
  CreateZoneHandler, UpdateZoneHandler, ActivateZoneHandler, InactivateZoneHandler, SuspendZoneHandler,
] as const;
