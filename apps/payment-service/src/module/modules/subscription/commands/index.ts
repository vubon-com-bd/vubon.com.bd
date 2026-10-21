/**
 * Subscription Command Handlers — Barrel
 * @module payment-service/modules/subscription/commands
 */
import { CreateSubscriptionHandler } from '@application/commands/subscription/create-subscription.handler';
import { UpgradeSubscriptionHandler } from '@application/commands/subscription/upgrade-subscription.handler';
import { DowngradeSubscriptionHandler } from '@application/commands/subscription/downgrade-subscription.handler';
import { PauseSubscriptionHandler } from '@application/commands/subscription/pause-subscription.handler';
import { CancelSubscriptionHandler } from '@application/commands/subscription/cancel-subscription.handler';

export const SUBSCRIPTION_COMMAND_HANDLERS = [
  CreateSubscriptionHandler,
  UpgradeSubscriptionHandler,
  DowngradeSubscriptionHandler,
  PauseSubscriptionHandler,
  CancelSubscriptionHandler,
] as const;
