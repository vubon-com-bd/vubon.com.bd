import { CreateReturnReasonHandler } from './create-return-reason.handler.js';
import { UpdateReturnReasonHandler } from './update.handler.js';
import { ActivateReturnReasonHandler } from './activate.handler.js';
import { DeactivateReturnReasonHandler } from './deactivate.handler.js';

export const RETURN_REASON_COMMAND_HANDLERS = [
  CreateReturnReasonHandler,
  UpdateReturnReasonHandler,
  ActivateReturnReasonHandler,
  DeactivateReturnReasonHandler,
] as const;
