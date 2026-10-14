import { CreateSettlementHandler } from '../../../application/commands/settlement/create-settlement.handler.js';
import { CompleteSettlementHandler } from '../../../application/commands/settlement/complete-settlement.handler.js';

export const VENDOR_SETTLEMENT_COMMAND_HANDLERS = [
  CreateSettlementHandler,
  CompleteSettlementHandler,
] as const;

export { CreateSettlementHandler, CompleteSettlementHandler };
