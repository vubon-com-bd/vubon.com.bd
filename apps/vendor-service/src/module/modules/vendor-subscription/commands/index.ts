import { CreateSubscriptionHandler } from '../../../application/commands/subscription/create-subscription.handler.js';
import { UpgradeSubscriptionHandler } from '../../../application/commands/subscription/upgrade-subscription.handler.js';
import { DowngradeSubscriptionHandler } from '../../../application/commands/subscription/downgrade-subscription.handler.js';
import { CancelSubscriptionHandler } from '../../../application/commands/subscription/cancel-subscription.handler.js';

export const VENDOR_SUBSCRIPTION_COMMAND_HANDLERS = [
  CreateSubscriptionHandler,
  UpgradeSubscriptionHandler,
  DowngradeSubscriptionHandler,
  CancelSubscriptionHandler,
] as const;

export {
  CreateSubscriptionHandler,
  UpgradeSubscriptionHandler,
  DowngradeSubscriptionHandler,
  CancelSubscriptionHandler,
};
