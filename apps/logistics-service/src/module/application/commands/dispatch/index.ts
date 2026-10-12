// commands/dispatch/index.ts
export * from './create-dispatch.command.js'; export * from './create-dispatch.handler.js';
export * from './add-dispatch-shipment.command.js'; export * from './add-dispatch-shipment.handler.js';
export * from './remove-dispatch-shipment.command.js'; export * from './remove-dispatch-shipment.handler.js';
export * from './assign-dispatch.command.js'; export * from './assign-dispatch.handler.js';
export * from './generate-dispatch-manifest.command.js'; export * from './generate-dispatch-manifest.handler.js';
export * from './update-dispatch-eta.command.js'; export * from './update-dispatch-eta.handler.js';
export * from './start-dispatch.command.js'; export * from './start-dispatch.handler.js';
export * from './mark-dispatch-in-transit.command.js'; export * from './mark-dispatch-in-transit.handler.js';
export * from './complete-dispatch.command.js'; export * from './complete-dispatch.handler.js';
export * from './fail-dispatch.command.js'; export * from './fail-dispatch.handler.js';
export * from './return-dispatch.command.js'; export * from './return-dispatch.handler.js';
export * from './cancel-dispatch.command.js'; export * from './cancel-dispatch.handler.js';

import { CreateDispatchHandler } from './create-dispatch.handler.js';
import { AddDispatchShipmentHandler } from './add-dispatch-shipment.handler.js';
import { RemoveDispatchShipmentHandler } from './remove-dispatch-shipment.handler.js';
import { AssignDispatchHandler } from './assign-dispatch.handler.js';
import { GenerateDispatchManifestHandler } from './generate-dispatch-manifest.handler.js';
import { UpdateDispatchEtaHandler } from './update-dispatch-eta.handler.js';
import { StartDispatchHandler } from './start-dispatch.handler.js';
import { MarkDispatchInTransitHandler } from './mark-dispatch-in-transit.handler.js';
import { CompleteDispatchHandler } from './complete-dispatch.handler.js';
import { FailDispatchHandler } from './fail-dispatch.handler.js';
import { ReturnDispatchHandler } from './return-dispatch.handler.js';
import { CancelDispatchHandler } from './cancel-dispatch.handler.js';

export const DISPATCH_COMMAND_HANDLERS = [
  CreateDispatchHandler, AddDispatchShipmentHandler, RemoveDispatchShipmentHandler,
  AssignDispatchHandler, GenerateDispatchManifestHandler, UpdateDispatchEtaHandler,
  StartDispatchHandler, MarkDispatchInTransitHandler, CompleteDispatchHandler,
  FailDispatchHandler, ReturnDispatchHandler, CancelDispatchHandler,
] as const;
