/**
 * ProductPricingRule Command Handlers Barrel
 * @module product-service/modules/product-pricing-rule/commands
 */
import { CreatePricingRuleHandler } from '../../../application/commands/pricing/create-pricing-rule.handler.js';
import { UpdatePricingRuleHandler } from '../../../application/commands/pricing/update-pricing-rule.handler.js';
import { DeletePricingRuleHandler } from '../../../application/commands/pricing/delete-pricing-rule.handler.js';

export const PRICING_RULE_COMMAND_HANDLERS = [
  CreatePricingRuleHandler,
  UpdatePricingRuleHandler,
  DeletePricingRuleHandler,
] as const;

export { CreatePricingRuleHandler, UpdatePricingRuleHandler, DeletePricingRuleHandler };
