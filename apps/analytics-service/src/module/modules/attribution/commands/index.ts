/**
 * Attribution Command Handlers Barrel
 */
import { ComputeAttributionHandler } from '../../../application/commands/attribution/compute-attribution.handler.js';

export const ATTRIBUTION_COMMAND_HANDLERS = [
  ComputeAttributionHandler,
] as const;

export { ComputeAttributionHandler };
