/**
 * Subscription Query Handlers — Barrel
 * @module payment-service/modules/subscription/queries
 */
import { GetSubscriptionHandler } from '@application/queries/subscription/get-subscription.handler';
import { ListSubscriptionsHandler } from '@application/queries/subscription/list-subscriptions.handler';

export const SUBSCRIPTION_QUERY_HANDLERS = [
  GetSubscriptionHandler,
  ListSubscriptionsHandler,
] as const;
