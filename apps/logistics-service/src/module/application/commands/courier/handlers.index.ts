import { CreateCourierHandler } from './create-courier.handler.js';
import { UpdateCourierHandler } from './update-courier.handler.js';
import { ActivateCourierHandler } from './activate-courier.handler.js';
import { DeactivateCourierHandler } from './deactivate-courier.handler.js';
import { SuspendCourierHandler } from './suspend-courier.handler.js';
import { TerminateCourierHandler } from './terminate-courier.handler.js';
import { AssignCourierToShipmentHandler } from './assign-courier.handler.js';

export const COURIER_COMMAND_HANDLERS = [
  CreateCourierHandler,
  UpdateCourierHandler,
  ActivateCourierHandler,
  DeactivateCourierHandler,
  SuspendCourierHandler,
  TerminateCourierHandler,
  AssignCourierToShipmentHandler,
] as const;
