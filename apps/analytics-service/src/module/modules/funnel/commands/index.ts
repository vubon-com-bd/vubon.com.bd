/**
 * Funnel Command Handlers Barrel
 */
import { CreateFunnelHandler } from '../../../application/commands/funnel/create-funnel.handler.js';
import { AnalyzeFunnelHandler } from '../../../application/commands/funnel/analyze-funnel.handler.js';

export const FUNNEL_COMMAND_HANDLERS = [
  CreateFunnelHandler,
  AnalyzeFunnelHandler,
] as const;

export { CreateFunnelHandler, AnalyzeFunnelHandler };
