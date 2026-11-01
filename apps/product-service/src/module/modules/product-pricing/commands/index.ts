/**
 * ProductPricing Command Handlers Barrel
 * @module product-service/modules/product-pricing/commands
 */
import { UpdatePriceHandler } from '../../../application/commands/pricing/update-price.handler.js';

export const PRICING_COMMAND_HANDLERS = [UpdatePriceHandler] as const;

export { UpdatePriceHandler };
