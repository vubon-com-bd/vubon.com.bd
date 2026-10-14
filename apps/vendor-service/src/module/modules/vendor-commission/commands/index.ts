import { UpdateCommissionHandler } from '../../../application/commands/commission/update-commission.handler.js';
import { CalculateCommissionHandler } from '../../../application/commands/commission/calculate-commission.handler.js';

export const VENDOR_COMMISSION_COMMAND_HANDLERS = [
  UpdateCommissionHandler,
  CalculateCommissionHandler,
] as const;

export { UpdateCommissionHandler, CalculateCommissionHandler };
